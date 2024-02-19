import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { myFetch } from "../../utilities/myFetch";
import { serverUrl } from "../../utilities/Constants";
import { ElectionType } from "../../utilities/Types";
import { Link, useNavigate } from "react-router-dom";

export default function Vote() {
  const { user } = useContext(UserContext);

  const [elections, setElections] = useState<ElectionType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        if (!user) return;

        //get all elections where this user is registered in
        const resData = await myFetch(`${serverUrl}/elections/vote/${user.id}`);

        setElections(resData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getData();
  }, [user]);

  return (
    <div className="bg-yellow-200 min-h-screen">
      <nav className="bg-yellow-800 p-4 text-white relative">
        <button
          className="absolute h-full left-0 top-0 bottom-0 p-2"
          onClick={() => navigate(-1)}
        >
          back
        </button>
        <h2 className="text-xl font-medium  text-center">Vote</h2>
      </nav>

      <section className="max-w-[1000px] mx-auto flex flex-col gap-2 p-4">
        {elections.map((election) => (
          <Link
            className="hover:scale-105 duration-300 bg-yellow-50 overflow-hidden rounded shadow border h-[300px] max-w-[700px] mx-auto w-full relative"
            to={`/vote/ballot/${election.id}`}
            key={election.id}
          >
            <img
              className="w-full h-full object-cover"
              src={`${serverUrl}/uploads/${election.photo_url}`}
              alt=""
            />
            <p className="absolute top-1/2 text-yellow-800 bg-white bg-opacity-70 shadow border flex justify-center items-center text-2xl font-semibold  p-2 h-1/2 -translate-y-1/2 w-full">
              {election.name}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
