import { useEffect, useState } from "react";
import {
  CandidateType,
  ElectionType,
  PositionType,
  VoteType,
} from "../../../../utilities/Types";
import { serverUrl } from "../../../../utilities/constants";
import ResultsChart from "./resultsChart/ResultsChart";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  election: ElectionType;
  setIsShowResults: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserCandidateType = CandidateType & { name: string };

export default function Results({ election, setIsShowResults }: Props) {
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [userCandidates, setUserCandidates] = useState<UserCandidateType[]>([]);
  const [votes, setVotes] = useState<VoteType[]>([]);

  useEffect(() => {
    //get election positions
    fetch(`${serverUrl}/positions/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setPositions(result.success.data))
      .catch((err) => console.error(err.message));

    //get election candidates
    fetch(`${serverUrl}/candidates/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setCandidates(result.success.data))
      .catch((err) => console.error(err.message));

    //get all votes for this election
    fetch(`${serverUrl}/votes/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setVotes(result.success.data))
      .catch((err) => console.error(err.message));
  }, [election.id]);

  useEffect(() => {
    async function fetchUserCandidates() {
      try {
        const userCandidatePromises = candidates.map(async (candidate) => {
          const userRes = await fetch(
            `${serverUrl}/users/user/${candidate.user_id}`
          );
          const userResult = await userRes.json();
          return {
            ...candidate,
            name: `${userResult.success.data.first_name} ${userResult.success.data.last_name}`,
          };
        });

        const userCandidateData = await Promise.all(userCandidatePromises);
        setUserCandidates(userCandidateData);
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    }

    fetchUserCandidates();
  }, [candidates]);

  return (
    <div className="fixed inset-0 z-10 bg-opacity-50 bg-black">
      <div className="overflow-y-auto h-[90%] bg-white w-full lg:max-w-[85%] mx-auto my-6 rounded-md p-4 flex flex-col gap-2">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl   font-semibold">{election.name} Results</h2>
          <button onClick={() => setIsShowResults(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col md:grid lg:grid-cols-2 gap-2 ">
          {positions.map((position) => (
            <div key={position.id} className="p-2 border shadow rounded-md">
              <p className="text-xl font-semibold">{position.name}</p>
              <ResultsChart
                position={position}
                userCandidates={userCandidates}
                votes={votes}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
