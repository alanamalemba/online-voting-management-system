import { useEffect, useState } from "react";
import { serverUrl } from "../../utilities/constants";
import { ElectionType } from "../../utilities/Types";
import ElectionResultCard from "./components/ElectionResultCard";

export default function ElectionResults() {
  const [elections, setElections] = useState<ElectionType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${serverUrl}/elections`)
      .then((res) => res.json())
      .then((result) => setElections(result.success.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6 flex flex-col  gap-4 grow lg:max-w-[75%] ">
      <h1 className="text-2xl font-medium">Election Results</h1>

      <input
        type="text"
        className="border-2 rounded-md p-2"
        placeholder="Search for election by election name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className=" flex flex-col lg:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {elections.map(
          (election) =>
            election.name
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase()) && (
              <ElectionResultCard key={election.id} election={election} />
            )
        )}
      </div>
    </div>
  );
}
