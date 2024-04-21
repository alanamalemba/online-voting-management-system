import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../utilities/constants";
import SignUpPopUp from "./components/SignUpPopUp";

export type NewUserType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables to track errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [newUser, setNewUser] = useState<NewUserType>();
  const [isShowPopup, setIsShowPopup] = useState(false);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);

      setNewUser({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });

      const response = await fetch(`${serverUrl}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
      setIsShowPopup(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    } finally {
      setIsLoading(true);
    }
  }

  function validateEmail(email: string): boolean {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password: string): boolean {
    // Regular expression for password complexity
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(password);
  }

  return (
    <>
      <form
        className="  sm:w-[40%] lg:w-[30%] mx-auto my-auto h-full flex flex-col justify-center gap-6 "
        onSubmit={(e) => handleSignUp(e)}
      >
        <img className=" h-[50px] w-[200px] object-cover " src={logo} alt="" />

        <h1 className="text-3xl font-bold">Welcome! Create your account</h1>

        <label className=" flex flex-col gap-1">
          <span className="font-medium">Enter First Name</span>
          <input
            className="border-2 p-2 rounded-md"
            type="text"
            placeholder="e.g. John"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setFirstNameError(""); // Reset error on change
            }}
            onBlur={() => {
              if (!firstName) {
                setFirstNameError("First name is required");
              }
            }}
          />
          {firstNameError && (
            <span className="text-red-500">{firstNameError}</span>
          )}
        </label>

        <label className=" flex flex-col gap-1">
          <span className="font-medium">Enter Last Name</span>
          <input
            className="border-2 p-2 rounded-md"
            type="text"
            placeholder="e.g. Doe"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setLastNameError(""); // Reset error on change
            }}
            onBlur={() => {
              if (!lastName) {
                setLastNameError("Last name is required");
              }
            }}
          />
          {lastNameError && (
            <span className="text-red-500">{lastNameError}</span>
          )}
        </label>

        <label className=" flex flex-col gap-1">
          <span className="font-medium">Email Address</span>
          <input
            className="border-2 p-2 rounded-md"
            type="email"
            placeholder="e.g. johndoe@mail.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(""); // Reset error on change
            }}
            onBlur={() => {
              if (!email) {
                setEmailError("Email is required");
              } else if (!validateEmail(email)) {
                setEmailError("Invalid email format");
              }
            }}
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </label>

        <label className=" flex flex-col gap-1">
          <span className="font-medium">Password</span>
          <input
            className="border-2 p-2 rounded-md"
            type="password"
            placeholder="e.g. ComplexPassword#&936"
            minLength={6} // Changed minLength to 6
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(""); // Reset error on change
            }}
            onBlur={() => {
              if (!password) {
                setPasswordError("Password is required");
              } else if (!validatePassword(password)) {
                setPasswordError(
                  "Password must have at least one uppercase letter, one symbol, one number, and be at least 6 characters long"
                );
              }
            }}
          />
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </label>

        <label className=" flex flex-col gap-1">
          <span className="font-medium">Confirm Password</span>
          <input
            className="border-2 p-2 rounded-md"
            type="password"
            placeholder="e.g. ComplexPassword#&936"
            minLength={6} // Changed minLength to 6
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError(""); // Reset error on change
            }}
            onBlur={() => {
              if (!confirmPassword) {
                setConfirmPasswordError("Confirm Password is required");
              } else if (confirmPassword !== password) {
                setConfirmPasswordError("Passwords do not match");
              }
            }}
          />
          {confirmPasswordError && (
            <span className="text-red-500">{confirmPasswordError}</span>
          )}
        </label>

        <button
          className="bg-primaryColor p-2 rounded-md text-white"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>

        <div className="p-4 border-t-2 flex justify-center gap-2 text-sm">
          Already have an account?{" "}
          <Link to={`/`} className="text-primaryColor">
            Login here
          </Link>
        </div>
      </form>

      {isShowPopup && (
        <SignUpPopUp
          user={newUser as NewUserType}
          setIsShowPopup={setIsShowPopup}
        />
      )}
    </>
  );
}
