import { useContext, useEffect, useState } from "react";
import {
  CandidateApplicationType,
  ElectionType,
  VoterApplicationType,
} from "../../../../utilities/Types";
import { serverUrl } from "../../../../utilities/constants";
import CandidateRegForm from "./components/CandidateRegForm";
import VoterRegForm from "./components/VoterRegForm";
import toast from "react-hot-toast";
import { UserContext } from "../../../../context/UserContextProvider";
import { getFormattedTime } from "../../../../utilities/getFormatedTime";

type Props = {
  election: ElectionType;
};

export default function ElectionCard({ election }: Props) {
  const { user } = useContext(UserContext);

  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [timeToStart, setTimeToStart] = useState<number | null>(null);

  const [isShowActions, setIsShowActions] = useState(false);

  const [voterApplication, setVoterApplication] =
    useState<VoterApplicationType>();
  const [candidateApplication, setCandidateApplication] =
    useState<CandidateApplicationType>();

  const [isShowCandidateForm, setIsShowCandidateForm] = useState(false);
  const [isShowVoterForm, setIsShowVoterForm] = useState(false);

  const startDate = new Date(election.start_date).toString();
  const endDate = new Date(election.end_date).toString();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${serverUrl}/candidate_applications/application/${user?.id}/${election.id}`
        );
        const result = await response.json();
        setCandidateApplication(result.success.data);

        const response2 = await fetch(
          `${serverUrl}/voter_applications/application/${user?.id}/${election.id}`
        );
        const result2 = await response2.json();
        setVoterApplication(result2.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    getData();
  }, [user?.id, election.id]);

  useEffect(() => {
    function getTimeToStart() {
      const now = new Date().getTime();
      const start = new Date(election.start_date).getTime();

      if (now > start) {
        setIsElectionStarted(true);
        return;
      }

      setTimeToStart(start - now);
    }

    getTimeToStart();
    const interval = setInterval(() => {
      getTimeToStart();
    }, 1000);
    return () => clearInterval(interval);
  }, [election.start_date]);

  if (isElectionStarted) return;

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

        {/* application status display */}
        <div className="absolute top-1 right-1 flex flex-col gap-1 w-2/3 text-sm ">
          {candidateApplication && (
            <p
              className={`${
                candidateApplication.status === "accepted"
                  ? "bg-green-500"
                  : candidateApplication.status === "rejected"
                  ? "bg-red-500"
                  : "bg-blue-500"
              } bg-opacity-70 text-white font-medium p-1 rounded`}
            >
              Candidate application: {candidateApplication?.status}
            </p>
          )}

          {voterApplication && (
            <p
              className={`${
                voterApplication.status === "accepted"
                  ? "bg-green-500"
                  : voterApplication.status === "rejected"
                  ? "bg-red-500"
                  : "bg-blue-500"
              } bg-opacity-70 text-white font-medium p-1 rounded`}
            >
              {" "}
              Voter application: {voterApplication?.status}
            </p>
          )}

          <div className="bg-indigo-500 p-2 italic text-xs  rounded bg-opacity-70 text-white font-medium">
            <p>Application deadline in:</p>
            <p>{getFormattedTime(timeToStart)}</p>
          </div>
        </div>

        {!(voterApplication && candidateApplication) && (
          <div
            className={` ${
              isShowActions ? "opacity-100" : "opacity-0"
            } flex flex-col justify-evenly absolute bg-indigo-500 top-0 bottom-0 overflow-hidden left-0 right-0 bg-opacity-50 duration-300`}
          >
            {!voterApplication && (
              <button
                className="bg-white w-3/4 mx-auto p-2 rounded  shadow-md font-medium border-2 border-indigo-800 text-indigo-800 hover:scale-105 duration-300 "
                onClick={() => setIsShowVoterForm(true)}
              >
                Register as Voter
              </button>
            )}

            {!candidateApplication && (
              <button
                className="bg-white w-3/4 mx-auto p-2 rounded  shadow-md font-medium border-2 border-indigo-800 text-indigo-800 hover:scale-105 duration-300 "
                onClick={() => setIsShowCandidateForm(true)}
              >
                Register as Candidate
              </button>
            )}
          </div>
        )}
      </div>

      {isShowCandidateForm && (
        <CandidateRegForm
          election={election}
          setIsShowCandidateForm={setIsShowCandidateForm}
          setCandidateApplication={setCandidateApplication}
        />
      )}

      {isShowVoterForm && (
        <VoterRegForm
          election={election}
          setIsShowVoterForm={setIsShowVoterForm}
          setVoterApplication={setVoterApplication}
        />
      )}
    </>
  );
}
