import { useEffect, useState } from "react";
import ElectionCard from "./components/electionCard/ElectionCard";
import { ElectionType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";

export default function UpcomingElections() {
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${serverUrl}/elections`);
        const result = await response.json();
        setElections(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    getData();
  }, []);

  return (
    <div className="grow max-w-[75%]">
      <h1 className="mt-6 mx-6 text-2xl font-medium">Upcoming Elections</h1>
      <div className="px-6 py-4 lg:grid grid-cols-2 gap-6 ">
        {elections.map((election) => (
          <ElectionCard key={election.id} election={election} />
        ))}
      </div>
    </div>
  );
}
