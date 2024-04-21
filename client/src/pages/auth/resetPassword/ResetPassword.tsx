import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../../utilities/constants";
import { useState } from "react";
import { ResultType } from "../../../utilities/Types";

export default function ResetPassword() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not mach");
      }

      const res = await fetch(`${serverUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result: ResultType<undefined> = await res.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
      navigate(`/`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className=" flex flex-col gap-2 bg-white w-full max-w-[500px] rounded-md p-4"
        onSubmit={(e) => handleReset(e)}
      >
        <h1 className="text-xl font-medium"> Reset Password</h1>

        <p className="font-medium text-lg ">Email: {email}</p>

        <label>
          <p className="font-medium">Password</p>
          <input
            className=" w-full border rounded p-2"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          <p className="font-medium">Confirm password</p>
          <input
            className=" w-full border rounded p-2"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="flex justify-end p-2 ">
          <button className="p-2 rounded bg-primaryColor text-white font-medium">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
