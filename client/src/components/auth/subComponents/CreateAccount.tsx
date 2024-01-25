import { useState } from "react";
import { Link } from "react-router-dom";
import { myFetch } from "../../../utilities/myFetch";
import { serverUrl } from "../../../utilities/Constants";
import toast from "react-hot-toast";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const res = await myFetch.post(`${serverUrl}/auth/create-account`, {
        name,
        email,
        password,
      });

      console.log(res);
      toast.success(res.success);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-[500px] bg-white p-2 rounded border  shadow-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-xl  font-bold text-center">Create Account</h2>
      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Enter name</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Enter email</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Enter password</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Confirm password</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="password"
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <button className="bg-yellow-800 p-2 rounded shadow text-white font-semibold">
        Submit
      </button>

      <div className="text-sm">
        <p>
          Already have an account?{" "}
          <Link to={`/`} className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
