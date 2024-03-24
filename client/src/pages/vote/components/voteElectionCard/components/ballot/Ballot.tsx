import { useEffect, useState } from "react";
import {
  CandidateType,
  ElectionType,
  PositionType,
  VoteType,
} from "../../../../../../utilities/Types";
import { serverUrl } from "../../../../../../utilities/constants";
import CandidateCard from "./components/candidateCard/CandidateCard";
import toast from "react-hot-toast";

type Props = {
  election: ElectionType;
  setIsShowBallot: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Ballot({ election, setIsShowBallot }: Props) {
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [positions, setPositions] = useState<PositionType[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/candidates/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setCandidates(result.success.data));

    fetch(`${serverUrl}/positions/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setPositions(result.success.data))
      .catch((err) => console.error(err.message));
  }, [election.id]);

  console.log("Votes:", votes);

  function handleCheck(candidate_id: number, position_id: number) {
    // Check if the vote already exists

    const voteExists = votes.some(
      (vote) =>
        vote.candidate_id === candidate_id && vote.position_id === position_id
    );

    // If the vote exists, remove it
    if (voteExists) {
      const updatedVotes = votes.filter(
        (vote) =>
          !(
            vote.candidate_id === candidate_id &&
            vote.position_id === position_id
          )
      );

      setVotes(updatedVotes);
      return;
    }

    // if vote does not exist, add it
    setVotes([
      ...votes,
      { candidate_id, position_id, election_id: election.id },
    ]);
  }

  function handleSubmit() {
    if (votes.length < 1) {
      toast.error("Please Vote for at least 1 candidate!");
      return;
    }

    fetch(`${serverUrl}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(votes),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.success.message);
        setIsShowBallot(false);
      })
      .catch((err) => console.error(err.message));
  }

  return (
    <div className=" p-6 bg-black fixed inset-0 z-10 bg-opacity-60 flex gap-6 justify-center items-center">
      <div className=" flex flex-col gap-6 overflow-y-auto relative p-4 border-2 border-slate-300  bg-white w-full max-w-[1000px] rounded-md max-h-screen">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => setIsShowBallot(false)}
        >
          close
        </button>

        <h1 className="text-2xl font-semibold text-center ">
          {election.name} Ballot
        </h1>

        <div className="flex flex-col gap-4">
          {positions.map((position) => (
            <div
              key={position.id}
              className=" shadow-md border-2 border-slate-400 p-2 rounded-md "
            >
              <div className="  bg-opacity-80 p-2 rounded-t-md">
                <p className="text-2xl text-indigo-500  font-semibold">
                  {position.name}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {candidates.some(
                  (candidate) => candidate.position_id === position.id
                )
                  ? candidates.map(
                      (candidate) =>
                        candidate.position_id === position.id && (
                          <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            handleCheck={handleCheck}
                          />
                        )
                    )
                  : "No candidates available for this position"}
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-indigo-700 p-2 w-full rounded text-white text-xl font-semibold shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
