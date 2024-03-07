import React, { useEffect, useState } from "react";
import { ElectionType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";
import ElectionCard from "./components/ElectionCard";

export default function ManageElections() {
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
    <div>
      <h1 className="mt-6 mx-6 text-2xl font-medium">Manage Elections</h1>
      <div className="grid grid-cols-2 gap-4 m-6">
        {elections.map((election) => (
          <ElectionCard key={election.id} election={election} />
        ))}
      </div>
    </div>
  );
}
