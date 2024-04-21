import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ElectionType, ResultType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditElection() {
  const navigate = useNavigate();
  const { eid } = useParams();

  const [election, setElection] = useState<ElectionType>();

  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${serverUrl}/elections/election/${eid}`);
        const result = await response.json();
        setElection(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }
    getData();
  }, [eid]);

  useEffect(() => {
    if (election) {
      setElectionName(election.name);
      // Format start date
      const formattedStartDate = new Date(election.start_date)
        .toISOString()
        .slice(0, 16);
      setStartDate(formattedStartDate);
      // Format end date
      const formattedEndDate = new Date(election.end_date)
        .toISOString()
        .slice(0, 16);
      setEndDate(formattedEndDate);
    }
  }, [election]);

  async function handleSaveChanges(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${serverUrl}/elections/edit-election/${election?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ electionName, startDate, endDate }),
        }
      );

      const result: ResultType<undefined> = await res.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="grow lg:max-w-[75%]">
      <div className="flex items-center mx-6 mt-6 gap-4  ">
        <button onClick={() => navigate(-1)} className="p-1 ">
          <ArrowBackIcon />
        </button>
        <h1 className=" text-2xl font-medium">Edit {election?.name}</h1>
      </div>

      <form
        className=" flex flex-col gap-4 max-w-[500px] rounded-md border  p-4 m-6 shadow"
        onSubmit={(e) => handleSaveChanges(e)}
      >
        <label className="flex flex-col gap-2">
          <p>Election name</p>
          <input
            required
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            className="border rounded p-2"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2">
          <p>Start date</p>
          <input
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
            type="datetime-local"
          />
        </label>

        <label className="flex flex-col gap-2">
          <p>End date</p>
          <input
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
            type="datetime-local"
          />
        </label>

        <div className=" flex justify-end">
          <button className="bg-primaryColor text-white font-semibold p-2 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
