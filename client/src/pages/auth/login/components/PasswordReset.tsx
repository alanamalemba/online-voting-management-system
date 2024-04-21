import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { serverUrl } from "../../../../utilities/constants";
import toast from "react-hot-toast";

type Props = {
  email: string;
  setIsShowPasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordReset({
  email,
  setIsShowPasswordReset,
}: Props) {
  const [userEmail, setUserEmail] = useState(email);
  const [isLoading, setIsLoading] = useState(false);

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userEmail) return;
    setIsLoading(true);

    fetch(`${serverUrl}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.error.message);
        }

        toast.success(result.success.message);
        setIsShowPasswordReset(false);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg bg-opacity-50 flex justify-center items-center">
      <form
        className="bg-white max-w-[500px] relative rounded-md p-4 pt-10"
        onSubmit={(e) => handleSend(e)}
      >
        <button
          onClick={() => setIsShowPasswordReset(false)}
          className="absolute top-2 right-3"
          type="button"
        >
          <CloseIcon />
        </button>
        <p className="text-slate-600 text-sm">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </p>

        <label className="flex flex-col gap-2 mt-4">
          <p className="font-medium">Email</p>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="border rounded w-full p-2 "
            type="email"
            required
          />
        </label>

        <div className="flex gap-2 mt-4">
          <button
            className=" font-medium border  text-white  bg-primaryColor  p-2 rounded-md grow"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : " Send Password Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
}
