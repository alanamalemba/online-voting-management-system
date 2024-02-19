import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myFetch } from "../../../../../utilities/myFetch";
import { serverUrl } from "../../../../../utilities/Constants";
import { VoterApplicationType } from "../../../../../utilities/Types";
import toast from "react-hot-toast";

export default function VoterApplications() {
  const { eid } = useParams();
  const [applications, setApplications] = useState<VoterApplicationType[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const resData = await myFetch(`${serverUrl}/voter_applications/${eid}`);

        setApplications(resData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getData();
  }, [eid]);

  async function updateStatus(id: number, status: string, userId: number) {
    try {
      const resData = await myFetch.post(
        `${serverUrl}/voter_applications/update/status/${id}`,
        { status: status }
      );

      const voterRes = await myFetch.post(`${serverUrl}/voters`, {
        election_id: eid,
        user_id: userId,
        voted: false,
      });

      console.log(resData);
      console.log(voterRes);
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
          Voter Applications
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
                </div>

                <div className="shadow border p-2 rounded flex gap-1 ">
                  <button
                    className=" border  p-2 rounded grow border-red-600 text-red-600"
                    onClick={() =>
                      updateStatus(
                        application.id as number,
                        "rejected",
                        application.user_id as number
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
                        application.user_id as number
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
