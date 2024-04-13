import { useEffect, useState } from "react";
import { VoteType } from "../../../../../../utilities/Types";
import { serverUrl } from "../../../../../../utilities/constants";

type Props = {
  vote: VoteType;
};

export default function VoteData({ vote }: Props) {
  const [candidateNames, setCandidateNames] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    //get candidate name
    fetch(`${serverUrl}/candidates/candidate-names/${vote.candidate_id}`)
      .then((res) => res.json())
      .then((result) => {
        const names = result.success.data;
        const fullName = names.first_name + names.last_name;
        setCandidateNames(fullName);
      })
      .catch((err) => console.error(err.message));

    //get position name
    fetch(`${serverUrl}/positions/position/${vote.position_id}`)
      .then((res) => res.json())
      .then((result) => {
        setPosition(result.success.data.name);
      })
      .catch((err) => console.error(err.message));
  }, [vote.candidate_id, vote.position_id]);

  return (
    <tr className="border-t-2  border-black">
      <td className="p-2">{candidateNames}</td>
      <td className="p-2">{position}</td>
      <td className="p-2">{vote.id}</td>
      <td className="p-2">{new Date(vote.createdAt).toLocaleDateString()}</td>
    </tr>
  );
}
