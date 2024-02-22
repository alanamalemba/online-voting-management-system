import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className=" w-[40%] lg:w-[30%] mx-auto h-full flex flex-col justify-center gap-6">
      <img className=" h-[50px] w-[200px] object-cover " src={logo} alt="" />

      <h1 className="text-3xl font-bold">Welcome! Create your account</h1>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Enter First Name</span>
        <input
          className="border-2 p-2 rounded-md"
          type="text"
          placeholder="e.g. John"
          required
        />
      </label>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Enter Last Name</span>
        <input
          className="border-2 p-2 rounded-md"
          type="text"
          placeholder="e.g. Doe"
          required
        />
      </label>

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Email Address</span>
        <input
          className="border-2 p-2 rounded-md"
          type="email"
          placeholder="e.g. johndoe@mail.com"
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

      <label className=" flex flex-col gap-1">
        <span className="font-medium">Confirm Password</span>
        <input
          className="border-2 p-2 rounded-md"
          type="password"
          placeholder="e.g. ComplexPassword#&936"
          minLength={6}
          required
        />
      </label>

      <button className="bg-primaryColor p-2 rounded-md text-white">
        Sign Up
      </button>

      <div className="p-4 border-t-2 flex justify-center gap-2 text-sm">
        Already have an account?{" "}
        <Link to={`/`} className="text-primaryColor">
          Sign up here
        </Link>
      </div>
    </form>
  );
}
