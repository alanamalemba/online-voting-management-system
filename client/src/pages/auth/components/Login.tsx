import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../utilities/constants";
import { UserContext } from "../../../context/UserContextProvider";

export default function Login() {
  const { setIsLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }

      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));

      toast.success(`Successfully logged in as ${email}!`);
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
      className=" w-[40%] lg:w-[30%] mx-auto h-full flex flex-col justify-center gap-6"
      onSubmit={(e) => handleLogin(e)}
    >
      <img className=" h-[50px] w-[200px] object-cover " src={logo} alt="" />

      <h1 className="text-3xl font-bold"> Login to your account</h1>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Email Address</span>
        <input
          className="border-2 p-2 rounded-md"
          type="email"
          placeholder="e.g. johndoe@mail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
