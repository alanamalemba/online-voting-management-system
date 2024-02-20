import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myFetch } from "../../utilities/myFetch";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../context/UserContext";
import { ElectionType } from "../../utilities/Types";

export default function ElectionResults() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [elections, setElections] = useState<ElectionType[]>([]);

  useEffect(() => {
    async function getData() {
      if (!user) return;
      try {
        const electionsData = await myFetch(
          `${serverUrl}/elections/results/${user.id}`
        );
        setElections(electionsData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getData();
  }, [user]);
  return (
    <div className="bg-yellow-200 min-h-screen">
      <nav className="bg-yellow-800 p-4 relative text-white">
        <button className="absolute" onClick={() => navigate(-1)}>
          back
        </button>
        <h2 className="text-center text-xl font-medium">Election Results</h2>
      </nav>

      <section className="flex flex-col gap-2 p-2 max-w-[1000px] mx-auto">
        {elections.map((election) => (
          <div
            className="border relative shadow rounded bg-yellow-50 h-[350px]"
            key={election.id}
          >
            <img
              className="h-full w-full object-cover"
              src={`${serverUrl}/uploads/${election.photo_url}`}
              alt=""
            />
            <p className="absolute top-1/2 -translate-y-1/2 bg-white p-2 w-full  h-1/3 flex items-center justify-center font-medium text-xl text-yellow-800 bg-opacity-80">
              {election.name}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
