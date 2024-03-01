import { useState } from "react";
import { UserType } from "../../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../../utilities/constants";

type Props = {
  user: UserType;
};

export default function UserCard({ user }: Props) {
  const [role, setRole] = useState(user.role);

  async function updateRole(newRole: string) {
    try {
      const response = await fetch(`${serverUrl}/users/update-role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, newRole: newRole }),
      });

      const result = await response.json();
      toast.success(result.success.message);
      setRole(newRole);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="border-2 rounded">
      <div className="p-2 bg-indigo-50 font-semibold ">
        <p>
          Name: {user.first_name} {user.last_name}
        </p>
        <p>Email: {user.email}</p>
      </div>

      <hr />

      <div className="flex flex-col gap-1 p-2">
        <button
          onClick={() => updateRole("admin")}
          className={`${
            role === "admin" &&
            "border-indigo-500 border-2 text-indigo-500 font-medium"
          } border p-2 rounded`}
        >
          Admin
        </button>

        <button
          onClick={() => updateRole("candidate_registrar")}
          className={`${
            role === "candidate_registrar" &&
            "border-indigo-500 border-2 text-indigo-500 font-medium"
          } border p-2 rounded`}
        >
          Candidate Registrar
        </button>

        <button
          onClick={() => updateRole("voter_registrar")}
          className={`${
            role === "voter_registrar" &&
            "border-indigo-500 border-2 text-indigo-500 font-medium"
          } border p-2 rounded`}
        >
          Voter Registrar
        </button>

        <button
          onClick={() => updateRole("voter")}
          className={`${
            role === "voter" &&
            "border-indigo-500 border-2 text-indigo-500 font-medium"
          } border p-2 rounded`}
        >
          Voter
        </button>
      </div>
    </div>
  );
}
