import { useRef, useState } from "react";
import { serverUrl } from "../../utilities/constants";
import toast from "react-hot-toast";

export default function CreateElection() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (positions.length < 1) {
        toast.error("Please add at least one position to be vied for!");
        return;
      }

      const formData = new FormData();

      formData.append("file", photo as File);
      formData.append("name", name);
      formData.append("startDate", new Date(startDate).toISOString());
      formData.append("endDate", new Date(endDate).toISOString());
      formData.append("positionsList", JSON.stringify(positions));

      const response = await fetch(`${serverUrl}/elections`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
      setName("");
      setStartDate("");
      setEndDate("");
      setPositions([]);
      setName("");
      setPhoto(null);
      // Reset file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  const currentDate = new Date();

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
            min={currentDate.toISOString().slice(0, 16)}
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
            min={
              startDate
                ? new Date(startDate).toISOString().slice(0, 16)
                : currentDate.toISOString().slice(0, 16)
            }
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <div className="border rounded p-1">
          <label className=" flex flex-col gap-1">
            <p className="font-medium">Enter a position to be vied for</p>

            <div className=" flex gap-1 ">
              <input
                className="p-2 border rounded-md grow"
                type="text"
                placeholder="e.g. President"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />

              <button
                className="p-2 font-bold border rounded shadow w-[40px] h-[40px] active:scale-90"
                type="button"
                onClick={() => {
                  if (!currentPosition) return;
                  setPositions([...positions, currentPosition]);
                  setCurrentPosition("");
                }}
              >
                +
              </button>
            </div>
          </label>

          <div className="p-1">
            <p className="font-light text-lg">Positions</p>
            {positions.length === 0 && (
              <p className="italic text-sm font-thin">
                Positions you add will appear here
              </p>
            )}
            {positions.map((position, index) => (
              <p key={index} className="italic">
                {position}
              </p>
            ))}
          </div>
        </div>

        <label className=" flex flex-col gap-1">
          <p className="font-medium">
            Select election photo (recommended aspect ratio: 4:3)
          </p>
          <input
            ref={fileInputRef}
            className="p-2 border rounded-md"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setPhoto(e.target.files?.[0] as File)}
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
