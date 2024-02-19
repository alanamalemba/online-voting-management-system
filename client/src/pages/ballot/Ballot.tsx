import { useEffect, useState } from "react";
import {
  CandidateType,
  ElectionType,
  PositionType,
} from "../../utilities/Types";
import { useNavigate, useParams } from "react-router-dom";
import { myFetch } from "../../utilities/myFetch";
import { serverUrl } from "../../utilities/Constants";

export default function Ballot() {
  const [election, setElection] = useState<ElectionType>();
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);

  const { eid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const electionData = await myFetch(`${serverUrl}/elections/${eid}`);
        console.log(electionData);
        setElection(electionData);

        const positionsData = await myFetch(`${serverUrl}/positions/${eid}`);
        console.log(positionsData);
        setPositions(positionsData);

        const candidatesData = await myFetch(`${serverUrl}/candidates/${eid}`);
        console.log(candidatesData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getData();
  }, [eid]);

  return (
    <div className="min-h-screen bg-yellow-200">
      <nav className="bg-yellow-800 p-4 text-white">
        <button className="absolute" onClick={() => navigate(-1)}>
          back
        </button>
        <h2 className="text-xl font-medium text-center">
          {election?.name} Ballot
        </h2>
      </nav>
      <section>
        {positions.map((position) => (
          <div key={position.id}>
            <p>{position.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
