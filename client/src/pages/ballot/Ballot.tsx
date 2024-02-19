import { createContext, useEffect, useState } from "react";
import {
  CandidateType,
  ElectionType,
  PositionType,
  VoteType,
} from "../../utilities/Types";
import { useNavigate, useParams } from "react-router-dom";
import { myFetch } from "../../utilities/myFetch";
import { serverUrl } from "../../utilities/Constants";
import CandidateCard from "./components/CandidateCard";
import toast from "react-hot-toast";

type BallotContextType = {
  votes: VoteType[];
  setVotes: React.Dispatch<React.SetStateAction<VoteType[]>>;
};

export const BallotContext = createContext<BallotContextType>({
  votes: [],
  setVotes: () => {},
});

export default function Ballot() {
  const [election, setElection] = useState<ElectionType>();
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [votes, setVotes] = useState<VoteType[]>([]);

  const { eid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const electionData = await myFetch(`${serverUrl}/elections/${eid}`);
        const positionsData = await myFetch(`${serverUrl}/positions/${eid}`);
        const candidatesData = await myFetch(`${serverUrl}/candidates/${eid}`);
        setElection(electionData);
        setPositions(positionsData);
        setCandidates(candidatesData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getData();
  }, [eid]);

  async function handleSubmitBallot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (votes.length < 1) {
        toast.error(
          "Please vote for at least one candidate before submitting ballot"
        );

        return;
      }

      const res = await myFetch.post(`${serverUrl}/votes`, votes);
      toast.success(res);

      navigate(`/vote`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <BallotContext.Provider value={{ votes, setVotes }}>
      <form
        className="min-h-screen bg-yellow-200"
        onSubmit={(e) => handleSubmitBallot(e)}
      >
        <nav className="bg-yellow-800 p-4 text-white">
          <button
            className="absolute"
            onClick={() => navigate(-1)}
            type="button"
          >
            back
          </button>
          <h2 className="text-xl font-medium text-center">
            {election?.name} Ballot
          </h2>
        </nav>

        <section className="p-2 max-w-[1000px] mx-auto flex flex-col gap-2">
          {positions.map((position) => (
            <div
              className="bg-yellow-50 rounded shadow border p-2"
              key={position.id}
            >
              <p className="text-xl font-medium text-center">{position.name}</p>
              <div className="flex flex-col gap-2">
                {candidates.map(
                  (candidate) =>
                    candidate.position_id === position.id && (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    )
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="max-w-[1000px] mx-auto p-2">
          <button className="bg-yellow-600 p-2 rounded  w-full text-lg font-semibold text-white ">
            Submit Ballot
          </button>
        </section>
      </form>
    </BallotContext.Provider>
  );
}
