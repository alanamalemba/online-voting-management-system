import React, { useContext, useState } from "react";
import { ElectionType } from "../../../../../utilities/Types";
import { serverUrl } from "../../../../../utilities/constants";
import toast from "react-hot-toast";
import { UserContext } from "../../../../../context/UserContextProvider";

type Props = {
  setIsShowVoterForm: React.Dispatch<React.SetStateAction<boolean>>;
  election: ElectionType;
};

export default function VoterRegForm({ election, setIsShowVoterForm }: Props) {
  const { user } = useContext(UserContext);

  const [regNumber, setRegNumber] = useState("");
  const [passPhoto, setPassPhoto] = useState<File | null>(null);
  const [idPhoto, setIdPhoto] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userId", user?.id.toString() as string);
      formData.append("passPhoto", passPhoto as File);
      formData.append("idPhoto", idPhoto as File);
      formData.append("studentId", regNumber);
      formData.append("electionId", election.id.toString());

      const response = await fetch(
        `${serverUrl}/voter_applications/submit-application`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);
      toast.success(result.success.message);
      setIsShowVoterForm(false);
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
          {election.name} Voter Registration
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

        <div className="flex mt-4 gap-2 justify-between font-medium">
          <button
            className="border border-black p-2 rounded w-1/2"
            onClick={() => setIsShowVoterForm(false)}
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
