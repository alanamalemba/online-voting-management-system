import { useEffect, useState } from "react";
import { ElectionType } from "../../utilities/Types";
import ElectionCard from "../../components/ElectionCard";
import { Link } from "react-router-dom";
import { myFetch } from "../../utilities/myFetch";
import { serverUrl } from "../../utilities/Constants";

export default function UpcomingElections() {
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getUpcomingElection() {
      try {
        const data: ElectionType[] = await myFetch(`${serverUrl}/elections`);
        setElections(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getUpcomingElection();
  }, []);
  return (
    <div className="bg-yellow-200 min-h-[100vh]">
      <section className="bg-yellow-700 p-4">
        <div className="max-w-[1000px] m-auto flex items-center gap-6 text-white">
          <Link title="Go Back" to={`/`}>
            Back
          </Link>
          <h2 className="text-xl font-medium text-center grow">
            Upcoming Elections
          </h2>
        </div>
      </section>

      <section className="  max-w-[1000px] mx-auto grid grid-cols-2 gap-4 p-4 ">
        {elections.map((election) => (
          <ElectionCard key={election.id} election={election} />
        ))}
      </section>
    </div>
  );
}
