import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ElectionType, VoterApplicationType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";
import VoterApplicationCard from "./components/VoterApplicationCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function VoterApplications() {
  const navigate = useNavigate();
  const { eid } = useParams();

  const [election, setElection] = useState<ElectionType>();
  const [voterApplications, setVoterApplications] = useState<
    VoterApplicationType[]
  >([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${serverUrl}/elections/election/${eid}`);
        const result = await response.json();
        setElection(result.success.data);

        const response2 = await fetch(
          `${serverUrl}/voter_applications/status-pending/${eid}`
        );
        const result2 = await response2.json();
        setVoterApplications(result2.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }
    getData();
  }, [eid]);

  return (
    <div className="grow max-w-[75%]">
      <div className="flex items-center mx-6 mt-6 gap-4  ">
        <button onClick={() => navigate(-1)} className="p-1 ">
          <ArrowBackIcon />
        </button>
        <h1 className=" text-2xl font-medium">
          {election?.name} Voter Applications
        </h1>
      </div>

      <div className="m-6 flex flex-col gap-4">
        {voterApplications.map((application) => (
          <VoterApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </div>
  );
}
