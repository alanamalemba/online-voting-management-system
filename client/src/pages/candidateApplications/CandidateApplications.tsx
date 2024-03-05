import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CandidateApplicationType, ElectionType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";
import CandidateApplicationCard from "./components/CandidateApplicationCard";

export default function CandidateApplications() {
  const navigate = useNavigate();
  const { eid } = useParams();

  const [election, setElection] = useState<ElectionType>();
  const [candidateApplications, setCandidateApplications] = useState<
    CandidateApplicationType[]
  >([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${serverUrl}/elections/election/${eid}`);
        const result = await response.json();
        setElection(result.success.data);

        const response2 = await fetch(
          `${serverUrl}/candidate_applications/status-pending/${eid}`
        );
        const result2 = await response2.json();
        setCandidateApplications(result2.success.data);
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
          back
        </button>
        <h1 className=" text-2xl font-medium">
          {election?.name} Candidate Applications
        </h1>
      </div>

      <div className="m-6 flex flex-col gap-4">
        {candidateApplications.map((application) => (
          <CandidateApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </div>
  );
}
