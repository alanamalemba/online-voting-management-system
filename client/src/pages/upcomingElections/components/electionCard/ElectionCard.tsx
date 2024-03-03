import { useState } from "react";
import { ElectionType } from "../../../../utilities/Types";
import { serverUrl } from "../../../../utilities/constants";
import CandidateRegForm from "./components/CandidateRegForm";
import VoterRegForm from "./components/VoterRegForm";

type Props = {
  election: ElectionType;
};

export default function ElectionCard({ election }: Props) {
  const [isShowActions, setIsShowActions] = useState(false);
  const [isShowCandidateForm, setIsShowCandidateForm] = useState(false);
  const [isShowVoterForm, setIsShowVoterForm] = useState(false);

  const startDate = new Date(election.start_date).toString();
  const endDate = new Date(election.end_date).toString();

  return (
    <>
      <div
        className="border-2 border-slate-200 rounded-lg overflow-hidden border-t-green-500 relative"
        onMouseOver={() => setIsShowActions(true)}
        onMouseLeave={() => setIsShowActions(false)}
      >
        <img
          className="h-[200px] w-full object-cover border-b-2"
          src={`${serverUrl}/${election.photo_url}`}
          alt=""
        />

        <div className="p-2 flex flex-col gap-1 ">
          <p className="text-lg font-medium">{election.name}</p>
          <p className="text-xs font-medium text-slate-800 ">
            Starting on {startDate}
          </p>
          <p className="text-xs font-medium text-slate-800 ">
            Ending on {endDate}
          </p>
        </div>

        <div
          className={` ${
            isShowActions ? "opacity-100" : "opacity-0"
          } flex flex-col justify-evenly absolute bg-indigo-500 top-0 bottom-0 overflow-hidden left-0 right-0 bg-opacity-50 duration-300`}
        >
          <button
            className="bg-white w-3/4 mx-auto p-2 rounded  shadow-md font-medium border-2 border-indigo-800 text-indigo-800 hover:scale-105 duration-300 "
            onClick={() => setIsShowVoterForm(true)}
          >
            Register as Voter
          </button>

          <button
            className="bg-white w-3/4 mx-auto p-2 rounded  shadow-md font-medium border-2 border-indigo-800 text-indigo-800 hover:scale-105 duration-300 "
            onClick={() => setIsShowCandidateForm(true)}
          >
            Register as Candidate
          </button>
        </div>
      </div>
      {isShowCandidateForm && (
        <CandidateRegForm
          election={election}
          setIsShowCandidateForm={setIsShowCandidateForm}
        />
      )}

      {isShowVoterForm && (
        <VoterRegForm
          election={election}
          setIsShowVoterForm={setIsShowVoterForm}
        />
      )}
    </>
  );
}
