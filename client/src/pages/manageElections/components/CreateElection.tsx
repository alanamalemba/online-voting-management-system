import { useContext, useRef, useState } from "react";
import { myFetch } from "../../../utilities/myFetch";
import { serverUrl } from "../../../utilities/Constants";
import { ElectionType, UserType } from "../../../utilities/Types";
import { UserContext } from "../../../context/UserContext";
import toast from "react-hot-toast";

export default function CreateElection() {
  const [name, setName] = useState("");
  const [candidateRegEmail, setCandidateRegEmail] = useState("");
  const [voterRegEmail, setVoterRegEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [position, setPosition] = useState("");
  const [positions, setPositions] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (positions.length <= 0) {
        toast.error("Pleas add at least 1 position");
        return;
      }
      // Get the candidate and voter registrar data
      const candidateReg: UserType = await myFetch(
        `${serverUrl}/users/${candidateRegEmail}`
      );

      const voterReg: UserType = await myFetch(
        `${serverUrl}/users/${voterRegEmail}`
      );

      //Upload image and get image name that shall be used as image URL
      const formData = new FormData();
      formData.append("file", photo as File);
      const imageUrlRes = await fetch(`${serverUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      const imageUrl = await imageUrlRes.json();

      const data: ElectionType = {
        name,
        admin_id: user?.id as number,
        candidate_reg_id: candidateReg?.id as number,
        voter_reg_id: voterReg?.id as number,
        start_date: new Date(`${startDate} ${startTime}`),
        end_date: new Date(`${endDate} ${endTime}`),
        photo_url: imageUrl,
      };

      const res = await myFetch.post(`${serverUrl}/elections`, {
        data,
        positions,
      });

      toast.success(res.success);

      setName("");
      setCandidateRegEmail("");
      setVoterRegEmail("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setPhoto(null);
      setPositions([]);

      fileInputRef.current && (fileInputRef.current.value = "");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <form
      className={` grow flex flex-col gap-2 bg-yellow-50 max-w-[500px] md:max-w-[700px] mx-auto p-2 rounded shadow-md h-fit `}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h3 className="text-lg text-center font-medium">Create Election</h3>
      <label className="flex flex-col gap-1">
        <p className="text-sm font-medium">Enter Election Name</p>
        <input
          className="border shadow rounded p-1"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 ">
        <p className="text-sm font-medium">Enter Candidate Registrar Email</p>
        <input
          className="border shadow rounded p-1"
          type="email"
          required
          value={candidateRegEmail}
          onChange={(e) => setCandidateRegEmail(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <p className="text-sm font-medium">Enter Voter Registrar Email</p>
        <input
          className="border shadow rounded p-1"
          type="email"
          required
          value={voterRegEmail}
          onChange={(e) => setVoterRegEmail(e.target.value)}
        />
      </label>

      <div className=" flex justify-between gap-1">
        <label className="flex flex-col gap-1 grow">
          <p className="text-sm font-medium">Enter Start Date</p>
          <input
            className="border shadow rounded p-1"
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 grow">
          <p className="text-sm font-medium">Enter Start Time</p>
          <input
            className="border shadow rounded p-1"
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>

      <div className=" flex justify-between gap-1">
        <label className="flex flex-col gap-1 grow">
          <p className="text-sm font-medium">Enter End Date</p>
          <input
            className="border shadow rounded p-1"
            type="date"
            required
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 grow">
          <p className="text-sm font-medium">Enter End Time</p>
          <input
            className="border shadow rounded p-1"
            type="time"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <p className="text-sm font-medium">Choose Election Cover Photo</p>
        <input
          className="border shadow rounded p-1 bg-white"
          type="file"
          accept="image/*"
          required
          ref={fileInputRef}
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <p className="text-sm font-medium">Add Election Position(s)</p>
        <div className="flex gap-1">
          <input
            className="border grow shadow rounded p-1 bg-white"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required={positions.length <= 0}
          />
          <button
            className="bg-yellow-400  leading-none font-bold text-3xl text-white p-1 w-[40px] h-[40px] rounded border shadow"
            type="button"
            onClick={() => {
              setPositions([...positions, position]);
              setPosition("");
            }}
          >
            +
          </button>
        </div>

        <div className={`p-1 shadow border rounded bg-gray-200 mt-1 `}>
          <p className="font-bold">Positions</p>
          {positions.length <= 0 && (
            <p className="italic text-sm font-thin text-slate-500">
              Please add at least 1 position or more
            </p>
          )}
          {positions.map((position, index) => (
            <p className="font-semibold italic text-sm" key={index}>
              {position}
            </p>
          ))}
        </div>
      </label>

      <div className="flex justify-center  ">
        {photo && (
          <img
            className="w-[170px] h-[170px] object-contain border-2 shadow-md rounded bg-white"
            src={URL.createObjectURL(photo)}
            alt=""
          />
        )}
      </div>

      <button className="bg-yellow-700 p-1 rounded font-medium text-white">
        Submit
      </button>
    </form>
  );
}
