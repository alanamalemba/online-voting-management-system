import { useEffect, useState } from "react";
import {
  CandidateType,
  UserType,
} from "../../../../../../../../utilities/Types";
import { serverUrl } from "../../../../../../../../utilities/constants";

type Props = {
  candidate: CandidateType;
  handleCheck(candidate_id: number, position_id: number): void;
};

export default function CandidateCard({ candidate, handleCheck }: Props) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    fetch(`${serverUrl}/users/user/${candidate.user_id}`)
      .then((res) => res.json())
      .then((result) => setUser(result.success.data));
  }, [candidate.user_id]);

  return (
    <label
      key={candidate.id}
      className="border-2 border-indigo-200 p-2 rounded-md flex gap-2 justify-between items-center text-3xl font-medium"
    >
      <img
        className="w-[120px] h-[120px] rounded-full object-center object-cover "
        src={`${serverUrl}/${candidate.passport_photo_url}`}
        alt=""
      />

      <p>
        {user?.first_name} {user?.last_name}
      </p>

      <input
        onClick={() => handleCheck(candidate.id, candidate.position_id)}
        type="checkbox"
        className="scale-[3] m-4"
      />
    </label>
  );
}
