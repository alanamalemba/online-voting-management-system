import { useState } from "react";
import { serverUrl } from "../../utilities/constants";
import toast from "react-hot-toast";

export default function CreateElection() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photo, setPhoto] = useState<File>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("file", photo as File);
      formData.append("name", name);
      formData.append("startDate", new Date(startDate).toISOString());
      formData.append("endDate", new Date(endDate).toISOString());

      const response = await fetch(`${serverUrl}/elections`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  // console.log("2024-02-10T01:01", "user date");
  // console.log(new Date("2024-02-10T01:01"), "new Date");
  // console.log(new Date("2024-02-10T01:01").toISOString(), "iso string");
  // const iso = new Date("2024-02-10T01:01").toISOString();
  // console.log(new Date(iso), "iso to new date");

  return (
    <div className=" grow">
      <h1 className="font-medium text-2xl p-6">Create Election</h1>
      <form
        className="border mb-6 shadow mx-auto p-2 rounded-md flex flex-col gap-3 w-[95%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className=" flex flex-col gap-1">
          <p className="font-medium">Enter election name</p>
          <input
            className="p-2 border rounded-md"
            type="text"
            required
            placeholder="e.g. 2024-2025 Student Elections"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className=" flex flex-col gap-1">
          <p className="font-medium">Enter start date</p>
          <input
            className="p-2 border rounded-md"
            type="datetime-local"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className=" flex flex-col gap-1">
          <p className="font-medium">Enter end date</p>
          <input
            className="p-2 border rounded-md"
            type="datetime-local"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <label className=" flex flex-col gap-1">
          <p className="font-medium">
            Select election photo (recommended aspect ratio: 4:3)
          </p>
          <input
            className="p-2 border rounded-md"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setPhoto(e.target.files?.[0])}
          />
        </label>

        {photo && (
          <img
            className="w-[400px] h-[300px]  border-2 shadow-md rounded-md object-cover"
            src={URL.createObjectURL(photo)}
            alt=""
          />
        )}

        <button className="p-2 bg-primaryColor rounded-md font-medium text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
