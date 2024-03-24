import { ElectionType } from "../../../../utilities/Types";
import { serverUrl } from "../../../../utilities/constants";
import { useState } from "react";
import Ballot from "./components/ballot/Ballot";
import toast from "react-hot-toast";
import Counter from "./components/ballot/components/candidateCard/counter/Counter";

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
        <Counter
          election={election}
          isElectionEnded={isElectionEnded}
          isElectionStarted={isElectionStarted}
          setIsElectionEnded={setIsElectionEnded}
          setIsElectionStarted={setIsElectionStarted}
        />

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
