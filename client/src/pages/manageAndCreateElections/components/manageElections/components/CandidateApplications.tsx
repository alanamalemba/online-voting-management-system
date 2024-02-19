import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myFetch } from "../../../../../utilities/myFetch";
import { serverUrl } from "../../../../../utilities/Constants";
import { CandidateApplicationType } from "../../../../../utilities/Types";
import toast from "react-hot-toast";

export default function CandidateApplications() {
  const { eid } = useParams();
  const [applications, setApplications] = useState<CandidateApplicationType[]>(
    []
  );

  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const resData = await myFetch(
          `${serverUrl}/candidate_applications/${eid}`
        );

        setApplications(resData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getData();
  }, [eid]);

  async function updateStatus(
    id: number,
    status: string,
    positionId: number,
    userId: number,
    photoUrl: string,
    manifesto: string
  ) {
    try {
      const resData = await myFetch.post(
        `${serverUrl}/candidate_applications/update/status/${id}`,
        { status: status }
      );

      const candRes = await myFetch.post(`${serverUrl}/candidates`, {
        election_id: eid,
        user_id: userId,
        position_id: positionId,
        photo_url: photoUrl,
        manifesto: manifesto,
      });

      console.log(resData);
      console.log(candRes);
      toast.success(resData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className=" p-4 bg-black bg-opacity-20 rounded">
      <div>
        <button onClick={() => navigate(-1)}> X </button>
        <p className="font-semibold text-center text-sm mb-1">
          Candidate Applications
        </p>
      </div>

      <div className=" flex flex-col gap-2">
        {applications.map(
          (application) =>
            application.status === "pending" && (
              <div
                className="bg-white p-2 flex flex-col gap-2 rounded border"
                key={application.id}
              >
                <div className="flex gap-1 h-[310px] overflow-hidden">
                  <div className="grow ">
                    <p className="text-center font-medium mb-1">
                      Passport photo
                    </p>
                    <img
                      className=" h-[280px] w-full  object-contain border-2 rounded shadow "
                      src={`${serverUrl}/uploads/${application.user_photo_url}`}
                      alt=""
                    />
                  </div>

                  <div className="grow ">
                    <p className="text-center font-medium mb-1">
                      National/Student ID photo
                    </p>
                    <img
                      className=" h-[280px] w-full  object-contain border-2 rounded shadow "
                      src={`${serverUrl}/uploads/${application.id_photo_url}`}
                      alt=""
                    />
                  </div>
                </div>

                <div className="shadow text-sm border rounded p-2 flex flex-col gap-1">
                  <p>Name: {application.name}</p>
                  <p>National/Student ID number: {application.id_number}</p>
                  <p>Position vying for: {application.position}</p>
                  <p>Manifesto: {application.manifesto}</p>
                </div>

                <div className="shadow border p-2 rounded flex gap-1 ">
                  <button
                    className=" border  p-2 rounded grow border-red-600 text-red-600"
                    onClick={() =>
                      updateStatus(
                        application.id as number,
                        "rejected",
                        application.position_id as number,
                        application.user_id as number,
                        application.user_photo_url as string,
                        application.manifesto as string
                      )
                    }
                  >
                    Reject
                  </button>
                  <button
                    className=" border  p-2 rounded grow border-green-600 text-green-600"
                    onClick={() =>
                      updateStatus(
                        application.id as number,
                        "accepted",
                        application.position_id as number,
                        application.user_id as number,
                        application.user_photo_url as string,
                        application.manifesto as string
                      )
                    }
                  >
                    Approve
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
