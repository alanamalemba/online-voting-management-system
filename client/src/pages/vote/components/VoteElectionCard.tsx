import { ElectionType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/constants";
import { useState, useEffect } from "react";
import Ballot from "./Ballot";

type Props = {
  election: ElectionType;
};

export default function VoteElectionCard({ election }: Props) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isShowBallot, setIsShowBallot] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const startDate = new Date(election.start_date).getTime();
      const timeDiff = startDate - now;
      setTimeRemaining(timeDiff);
    };

    calculateTimeRemaining();

    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, [election.start_date]);

  function formatTime(time: number): string {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const startDate = new Date(election.start_date).toString();
  const endDate = new Date(election.end_date).toString();

  function handleClick() {
    setIsShowBallot(true);
  }

  return (
    <>
      <button
        className="border-2 text-left border-slate-200 rounded-lg overflow-hidden border-t-green-500 relative "
        onClick={handleClick}
      >
        <div className=" text-center p-2 bg-blue-500 absolute right-0 w-4/5 rounded-bl-md font-semibold text-sm shadow-md bg-opacity-80 text-white">
          Election starts in:{" "}
          {timeRemaining !== null
            ? formatTime(timeRemaining)
            : "Calculating..."}
        </div>

        <img
          className="h-[200px] w-full object-cover border-b-2"
          src={`${serverUrl}/${election.photo_url}`}
          alt=""
        />

        <div className="p-2 flex flex-col gap-1 ">
          <p className="text-lg font-medium">{election.name}</p>
          <p className="text-xs font-medium text-slate-800 ">
            Starting on {startDate}
          </p>
          <p className="text-xs font-medium text-slate-800 ">
            Ending on {endDate}
          </p>
        </div>
      </button>

      {isShowBallot && <Ballot election={election} />}
    </>
  );
}
