import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";

export default function Login() {
  return (
    <form className=" w-[40%] lg:w-[30%] mx-auto h-full flex flex-col justify-center gap-6">
      <img className=" h-[50px] w-[200px] object-cover " src={logo} alt="" />

      <h1 className="text-3xl font-bold"> Login to your account</h1>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Email Address</span>
        <input
          className="border-2 p-2 rounded-md"
          type="text"
          placeholder="e.g. John Doe"
          required
        />
      </label>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Password</span>
        <input
          className="border-2 p-2 rounded-md"
          type="password"
          placeholder="e.g. ComplexPassword#&936"
          minLength={6}
          required
        />
      </label>

      <div className="  text-sm">
        <span className="text-primaryColor">Forgot your password?</span>
      </div>

      <button className="bg-primaryColor p-2 rounded-md text-white">
        Login
      </button>

      <div className="p-4 border-t-2  text-sm flex gap-2 justify-center">
        Don't have an account?
        <Link to={`/sign-up`} className="text-primaryColor">
          Sign up here
        </Link>
      </div>
    </form>
  );
}
