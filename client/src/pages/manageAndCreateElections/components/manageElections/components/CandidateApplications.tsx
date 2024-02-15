import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myFetch } from "../../../../../utilities/myFetch";
import { serverUrl } from "../../../../../utilities/Constants";
import { CandidateApplicationType } from "../../../../../utilities/Types";

export default function CandidateApplications() {
  const { eid } = useParams();
  const [applications, setApplications] = useState<CandidateApplicationType[]>(
    []
  );

  useEffect(() => {
    async function getData() {
      try {
        const resData = await myFetch(
          `${serverUrl}/candidate_applications/${eid}`
        );

        console.log(resData);
        setApplications(resData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getData();
  }, [eid]);

  return (
    <div className=" ">
      {applications.map((application) => (
        <div key={application.id}>hello</div>
      ))}
    </div>
  );
}
