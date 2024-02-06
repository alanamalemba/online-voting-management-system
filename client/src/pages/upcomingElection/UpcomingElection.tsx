import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../utilities/Constants";
import { ElectionType } from "../../utilities/Types";
import CandidateRegistrationForm from "./components/CandidateRegistrationForm";
import VoterRegistrationForm from "./components/VoterRegistrationForm";

export default function UpcomingElection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [election, setElection] = useState<ElectionType>();
  const [isShowCandidateForm, setIsShowCandidateForm] = useState(false);
  const [isShowVoterForm, setIsShowVoterForm] = useState(false);

  const startDate = new Date(election?.start_date as Date).toString();
  const endDate = new Date(election?.end_date as Date).toString();

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${serverUrl}/elections/${id}`);
      const electionData = await res.json();
      setElection(electionData);
    }
    getData();
  }, [id]);

  return (
    <div className="bg-yellow-200 min-h-screen">
      <section className="bg-yellow-700 p-4">
        <div className="max-w-[1000px] m-auto flex items-center gap-6 text-white">
          <button onClick={() => navigate(-1)} title="Go Back">
            Back
          </button>
          <h2 className="text-xl font-medium text-center grow">
            {election?.name}
          </h2>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto mt-2 border shadow-md rounded">
        <div className=" h-[300px] w-full relative">
          <img
            className="w-full h-full object-cover rounded"
            src={`${serverUrl}/uploads/${election?.photo_url}`}
            alt=""
          />
          <p className="absolute top-1/2 -translate-y-1/2 font-bold text-4xl text-yellow-800 bg-white w-full h-1/3 flex justify-center items-center bg-opacity-60">
            {election?.name}
          </p>
        </div>
      </section>

      <section className="p-2 bg-yellow-50 mt-2 rounded max-w-[1000px] mx-auto   flex flex-col gap-2 border shadow-md">
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </section>

      <section className="p-2 text-yellow-800 bg-yellow-50 mt-2 rounded max-w-[1000px] mx-auto text-xl font-bold flex  gap-4 border shadow-md">
        <button
          className=" bg-yellow-600 text-white p-2 rounded grow"
          onClick={() => setIsShowVoterForm(true)}
        >
          Register as Voter
        </button>
        <button
          className=" bg-yellow-600 text-white p-2 rounded grow"
          onClick={() => setIsShowCandidateForm(true)}
        >
          Register as Candidate
        </button>
      </section>

      {isShowCandidateForm && (
        <CandidateRegistrationForm
          setIsShowCandidateForm={setIsShowCandidateForm}
        />
      )}
      {isShowVoterForm && (
        <VoterRegistrationForm setIsShowVoterForm={setIsShowVoterForm} />
      )}
    </div>
  );
}
