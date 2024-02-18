import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { ElectionType } from "../../../../../utilities/Types";
import { myFetch } from "../../../../../utilities/myFetch";
import { serverUrl } from "../../../../../utilities/Constants";
import { Link } from "react-router-dom";

export default function ElectionsList() {
  const { user } = useContext(UserContext);
  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getData() {
      if (!user) return;
      const resData = await myFetch(
        `${serverUrl}/elections/manage-elections/${user?.id}`
      );
      setElections(resData);
    }
    getData();
  }, [user]);

  return (
    <div className="flex flex-col gap-4 ">
      {elections.map((election) => (
        <div
          className=" relative w-[700px] h-[350px] rounded shadow border overflow-hidden mx-auto"
          key={election.id}
        >
          <img
            className="w-full h-full object-cover"
            src={`${serverUrl}/uploads/${election.photo_url}`}
            alt=""
          />

          <div className="absolute p-1 bottom-0 flex flex-col justify-evenly w-full items-center bg-white h-1/2 rounded-t bg-opacity-80">
            <p className=" font-semibold">{election.name}</p>
            <Link
              className="border-2 border-black p-1 rounded w-full text-center bg-yellow-400"
              to={`edit-election/${election.id}`}
            >
              Edit Election
            </Link>
            <Link
              className="border-2 border-black p-1 rounded w-full text-center bg-yellow-400"
              to={`candidate-applications/${election.id}`}
            >
              Candidate Applications
            </Link>
            <Link
              className="border-2 border-black p-1 rounded w-full text-center bg-yellow-400"
              to={`voter-applications/${election.id}`}
            >
              Voter Applications
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
