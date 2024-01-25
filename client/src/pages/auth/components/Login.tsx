import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { myFetch } from "../../../utilities/myFetch";
import { serverUrl } from "../../../utilities/Constants";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await myFetch.post(`${serverUrl}/auth/login`, {
        email,
        password,
      });
      console.log(res);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-[500px] bg-white p-2 rounded border shadow-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-xl  font-bold text-center">Login</h2>
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
      <button className="bg-yellow-800 p-2 rounded shadow text-white font-semibold">
        Submit
      </button>

      <div className="text-sm">
        <p>
          Don't have an account?{" "}
          <Link to={`/create-account`} className="text-blue-500">
            Create account here
          </Link>
        </p>
      </div>
    </form>
  );
}
