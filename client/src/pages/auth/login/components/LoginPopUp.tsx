import React, { useContext, useState } from "react";
import { serverUrl } from "../../../../utilities/constants";
import { UserContext } from "../../../../context/UserContextProvider";
import toast from "react-hot-toast";

type Props = {
  email: string;
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginPopUp({ email, setIsShowPopup }: Props) {
  const [code, setCode] = useState("");
  const { setUser } = useContext(UserContext);

  function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`${serverUrl}/auth/verify/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.error.message);
        }

        console.log(result);

        setUser(result.success.data);
        localStorage.setItem("user", JSON.stringify(result.success.data));
        toast.success("Logged in successfully!");
      })
      .catch((err) => {
        console.error(err.message);
        toast.error(err.message);
      });
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center items-center">
      <form
        className="bg-white p-6 rounded-md flex flex-col gap-4"
        onSubmit={(e) => handleVerify(e)}
      >
        <h1 className="text-xl font-medium">
          Check your email for an OTP code
        </h1>

        <label className=" flex flex-col gap-2">
          <p>Enter OTP code: </p>
          <input
            type="text"
            maxLength={6}
            minLength={6}
            required
            className="p-2 border rounded-md "
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <div className=" flex gap-2">
          <button
            onClick={() => setIsShowPopup(false)}
            type="button"
            className="p-2 rounded-md font-medium border-2 border-black grow"
          >
            Cancel
          </button>

          <button className="p-2 grow bg-primaryColor rounded-md font-medium text-white">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}
