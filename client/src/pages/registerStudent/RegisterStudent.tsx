import React, { useEffect, useState } from "react";
import { serverUrl } from "../../utilities/constants";
import toast from "react-hot-toast";

export default function RegisterStudent() {
  const [regNo, setRegNo] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`${serverUrl}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: regNo }),
    })
      .then((res) => res.json())
      .then((result) => toast.success(result.success.message))
      .then(() => setRegNo(""))
      .catch((err) => console.error(err.message));
  }

  return (
    <div className="p-6 grow">
      <h1 className="text-2xl font-medium mb-6">Add Registration Number</h1>
      <form
        className="border rounded p-6 flex flex-col gap-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex gap-4 flex-col">
          <p>Enter student registration number</p>
          <input
            className="border rounded w-full p-2"
            type="text"
            placeholder="e.g S13/12345/20"
            required
            value={regNo}
            minLength={10}
            maxLength={15}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </label>
        <button className="border p-2 rounded bg-primaryColor text-white font-medium text-lg">
          Submit
        </button>
      </form>
    </div>
  );
}
