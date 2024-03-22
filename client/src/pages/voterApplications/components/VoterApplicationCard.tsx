import { useEffect, useState } from "react";
import {
  ResultType,
  UserType,
  VoterApplicationType,
} from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/constants";
import toast from "react-hot-toast";

type Props = {
  application: VoterApplicationType;
};

export default function VoterApplicationCard({ application }: Props) {
  const [user, setUser] = useState<UserType>();
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${serverUrl}/users/user/${application.user_id}`
        );

        const result = await response.json();
        setUser(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    getData();
  }, [application.user_id]);

  async function handleUpdateStatus(status: string) {
    try {
      type UpdateStatusData = {
        status: string;
        aid: number;
        eid?: number;
        uid?: number;
      };

      const data: UpdateStatusData = {
        status: status,
        aid: application.id,
      };

      if (status === "accepted") {
        data.uid = user?.id;
        data.eid = application.election_id;
      }

      const response = await fetch(
        `${serverUrl}/voter_applications/update-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: ResultType = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success?.message as string);
      setIsReviewed(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  if (isReviewed) return;

  return (
    <div className="border-2 border-slate-300 mx-2 p-2 rounded flex flex-col gap-2">
      <div className="flex gap-2 font-medium ">
        <div className=" w-1/2 h-full flex flex-col">
          <p>Passport photo</p>
          <img
            className="rounded  w-full object-cover object-center h-[300px] "
            src={`${serverUrl}/${application.passport_photo_url}`}
            alt=""
          />
        </div>

        <div className="w-1/2 h-full flex flex-col">
          <p>Student ID Photo</p>
          <img
            className="rounded  w-full object-cover object-center h-[300px] "
            src={`${serverUrl}/${application.id_photo_url}`}
            alt=""
          />
        </div>
      </div>

      <hr />

      <div className="font-medium">
        <p>
          Name: {user?.first_name} {user?.last_name}
        </p>
        <p>Student ID: {application.student_id}</p>
      </div>

      <hr />

      <div className=" flex gap-4">
        <button
          className="p-2 border rounded grow border-red-500 text-red-500"
          onClick={() => handleUpdateStatus("rejected")}
        >
          Reject
        </button>
        <button
          className="p-2 border rounded grow border-green-600 text-green-600"
          onClick={() => handleUpdateStatus("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
