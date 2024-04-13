import { useEffect, useState } from "react";
import { ElectionType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/constants";
import ElectionCard from "./electionCard/ElectionCard";

export default function ViewElectionReport() {
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/elections`)
      .then((res) => res.json())
      .then((result) => setElections(result.success.data));
  }, []);

  return (
    <div className="grow lg:max-w-[75%]">
      <h1 className="mt-6 mx-6 text-2xl font-medium"> Election Reports</h1>

      <div className="p-6 grid grid-cols-2 gap-6 lg:grid-cols-3">
        {elections.map((election) => (
          <ElectionCard key={election.id} election={election} />
        ))}
      </div>
    </div>
  );
}
