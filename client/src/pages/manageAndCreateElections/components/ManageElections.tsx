import { useContext, useEffect, useState } from "react";
import { myFetch } from "../../../utilities/myFetch";
import { serverUrl } from "../../../utilities/Constants";
import { UserContext } from "../../../context/UserContext";
import { ElectionType } from "../../../utilities/Types";

export default function ManageElections() {
  const { user } = useContext(UserContext);
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getData() {
      if (!user) return;
      const resData = await myFetch(
        `${serverUrl}/elections/manage-elections/${user?.id}`
      );
      console.log(resData);
      setElections(resData);
    }
    getData();
  }, [user]);
  return (
    <div className="max-w-[1000px] mx-auto">
      <h2 className="font-semibold text-lg text-center">Manage Elections</h2>

      <div>
        {elections.map((election) => (
          <div key={election.id}>class</div>
        ))}
      </div>
    </div>
  );
}
