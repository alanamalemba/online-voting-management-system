import { ElectionType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/constants";
import { useEffect, useState } from "react";
import Ballot from "./Ballot";
import toast from "react-hot-toast";
import { getFormattedTime } from "../../../utilities/getFormatedTime";

type Props = {
  election: ElectionType;
};

export default function VoteElectionCard({ election }: Props) {
  const [isShowBallot, setIsShowBallot] = useState(false);

  const currentDate = new Date();
  const startDate = new Date(election.start_date);
  const endDate = new Date(election.end_date);

  const [isElectionStarted, setIsElectionStarted] = useState(
    currentDate > startDate
  );

  const [isElectionEnded, setIsElectionEnded] = useState(currentDate > endDate);

  const [timeToStart, setTimeToStart] = useState<number | null>(null);
  const [timeToEnd, setTimeToEnd] = useState<number | null>(null);

  useEffect(() => {
    function getTimeToStart() {
      const now = new Date().getTime();
      const start = new Date(election.start_date).getTime();

      if (now > start) {
        setIsElectionStarted(true);
        return;
      }

      setTimeToStart(start - now);
    }

    function getTimeToEnd() {
      const now = new Date().getTime();
      const start = new Date(election.end_date).getTime();

      if (now > start) {
        setIsElectionEnded(true);
        return;
      }

      setTimeToEnd(start - now);
    }

    // if election has not started, show the
    // upcoming election countdown
    if (!isElectionStarted) {
      getTimeToStart();
      const interval = setInterval(() => {
        getTimeToStart();
      }, 1000);
      return () => clearInterval(interval);
    }

    //if election is ongoing, show the election count down
    // and do some stuff
    if (isElectionStarted && !isElectionEnded) {
      getTimeToEnd();
      const interval = setInterval(() => {
        getTimeToEnd();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    election.start_date,
    isElectionStarted,
    isElectionEnded,
    election.end_date,
  ]);

  if (isElectionEnded) return;

  function handleClick() {
    if (!isElectionStarted) {
      toast.error("Election has not started yet!");
      return;
    }
    setIsShowBallot(true);
  }

  return (
    <>
      <button
        className="border-2 text-left border-slate-200 rounded-lg overflow-hidden border-t-green-500 relative "
        onClick={handleClick}
      >
        {!isElectionStarted && (
          <div className=" text-center p-2 bg-blue-500 absolute right-0 w-4/5 rounded-bl-md font-semibold text-sm shadow-md bg-opacity-80 text-white">
            <p> Election starts in: {getFormattedTime(timeToStart)}</p>
          </div>
        )}

        {isElectionStarted && (
          <div className=" text-center p-2 bg-green-500 absolute right-0 w-4/5 rounded-bl-md font-semibold text-sm shadow-md bg-opacity-80 text-white">
            <p> Election ends in: {getFormattedTime(timeToEnd)}</p>
          </div>
        )}

        <img
          className="h-[200px] w-full object-cover border-b-2"
          src={`${serverUrl}/${election.photo_url}`}
          alt=""
        />

        <div className="p-2 flex flex-col gap-1 ">
          <p className="text-lg font-medium">{election.name}</p>
          <p className="text-xs font-medium text-slate-800 ">
            Starting on {new Date(election.start_date).toString()}
          </p>
          <p className="text-xs font-medium text-slate-800 ">
            Ending on {new Date(election.end_date).toString()}
          </p>
        </div>
      </button>

      {isShowBallot && (
        <Ballot election={election} setIsShowBallot={setIsShowBallot} />
      )}
    </>
  );
}
