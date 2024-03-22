import { useContext, useEffect, useState } from "react";
import VoteElectionCard from "./components/VoteElectionCard";
import { ElectionType, ResultType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/constants";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContextProvider";

export default function Vote() {
  const { user } = useContext(UserContext);
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${serverUrl}/elections/user-registered/${user?.id}`
        );
        const result: ResultType = await response.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        setElections(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    getData();
  }, [user?.id]);

  console.log(elections);

  return (
    <div className="grow  max-w-[75%]">
      <h1 className="mt-6 mx-6 text-2xl font-medium">Vote</h1>

      <div className="grid gap-2 grid-cols-2 m-6">
        {elections.map((election) => (
          <VoteElectionCard key={election.id} election={election} />
        ))}
      </div>
    </div>
  );
}
