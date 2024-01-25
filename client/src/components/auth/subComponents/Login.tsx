import { Link } from "react-router-dom";

export default function Login() {
  return (
    <form className="flex flex-col gap-2 w-full max-w-[500px] bg-white p-2 rounded border shadow-md">
      <h2 className="text-xl  font-bold text-center">Login</h2>
      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Enter email</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="email"
        />
      </label>

      <label className=" flex flex-col gap-1">
        <p className="text-sm font-semibold">Enter password</p>
        <input
          className="w-full p-1 rounded border shadow"
          required
          type="password"
          minLength={6}
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
