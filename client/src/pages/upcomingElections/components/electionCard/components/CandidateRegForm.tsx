import React, { useContext, useEffect, useState } from "react";
import {
  CandidateApplicationType,
  ElectionType,
  PositionType,
} from "../../../../../utilities/Types";
import { serverUrl } from "../../../../../utilities/constants";
import toast from "react-hot-toast";
import { UserContext } from "../../../../../context/UserContextProvider";

type Props = {
  setIsShowCandidateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCandidateApplication: React.Dispatch<
    React.SetStateAction<CandidateApplicationType | undefined>
  >;
  election: ElectionType;
};

export default function CandidateRegForm({
  election,
  setIsShowCandidateForm,
  setCandidateApplication,
}: Props) {
  const { user } = useContext(UserContext);

  const [positions, setPositions] = useState<PositionType[]>([]);
  const [pickedPosition, setPickedPosition] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [passPhoto, setPassPhoto] = useState<File | null>(null);
  const [idPhoto, setIdPhoto] = useState<File | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${serverUrl}/positions/election/${election.id}`
        );
        const result = await response.json();
        setPositions(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getData();
  }, [election.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userId", user?.id.toString() as string);
      formData.append("passPhoto", passPhoto as File);
      formData.append("idPhoto", idPhoto as File);
      formData.append("studentId", regNumber);
      formData.append("electionId", election.id.toString());
      formData.append("positionId", pickedPosition);

      const response = await fetch(
        `${serverUrl}/candidate_applications/submit-application`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);
      toast.success(result.success.message);
      setCandidateApplication(result.success.data);
      setIsShowCandidateForm(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }
  return (
    <div className="fixed z-20 top-0 bottom-0 left-0 right-0 bg-indigo-800 bg-opacity-60 flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-md  w-full m-6 max-w-[800px] flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p className="text-3xl text-center font-semibold">
          {election.name} Candidate Registration
        </p>

        <hr className="border-slate-300" />

        <label className="font-medium">
          <p>Select Passport Photo</p>

          <input
            className="border p-2 w-full rounded border-black"
            type="file"
            accept="image/*"
            onChange={(e) => setPassPhoto(e.target.files?.[0] as File)}
          />
        </label>

        <label className="font-medium">
          <p>Select Photo of ID</p>

          <input
            className="border p-2 w-full rounded border-black"
            type="file"
            accept="image/*"
            onChange={(e) => setIdPhoto(e.target.files?.[0] as File)}
          />
        </label>

        <label className="font-medium">
          <p>Enter Student Registration number</p>

          <input
            className="border p-2 w-full rounded border-black"
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            maxLength={15}
            minLength={10}
            placeholder="e.g S13/03416/20"
          />
        </label>

        <label className="font-medium">
          <p>Select position you want to vie for</p>

          <select
            className="border p-3 w-full rounded border-black"
            value={pickedPosition}
            onChange={(e) => setPickedPosition(e.target.value)}
            required
          >
            <option value="" disabled defaultValue={``}>
              pick a position
            </option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex mt-4 gap-2 justify-between font-medium">
          <button
            className="border border-black p-2 rounded w-1/2"
            onClick={() => setIsShowCandidateForm(false)}
            type="button"
          >
            Cancel
          </button>

          <button className="border border-slate-300 p-2 rounded w-1/2 bg-indigo-600 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
