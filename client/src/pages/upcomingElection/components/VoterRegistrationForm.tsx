import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { serverUrl } from "../../../utilities/Constants";
import { myFetch } from "../../../utilities/myFetch";
import { VoterApplicationType } from "../../../utilities/Types";

type Props = {
  setIsShowVoterForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VoterRegistrationForm({ setIsShowVoterForm }: Props) {
  const [Id, setId] = useState("");

  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [IdPhoto, setIdPhoto] = useState<File | null>(null);

  const { user } = useContext(UserContext);
  const { id } = useParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("file", passportPhoto as File);
      const userPhotoUrlRes = await fetch(`${serverUrl}/upload`, {
        method: "POST",
        body: formData1,
      });

      const formData2 = new FormData();
      formData2.append("file", IdPhoto as File);
      const IdPhotoUrlRes = await fetch(`${serverUrl}/upload`, {
        method: "POST",
        body: formData2,
      });

      const userPhotoUrl = await userPhotoUrlRes.json();
      const IdPhotoUrl = await IdPhotoUrlRes.json();

      const data: VoterApplicationType = {
        user_id: user?.id,
        id_number: Id,
        user_photo_url: userPhotoUrl,
        id_photo_url: IdPhotoUrl,
        election_id: parseInt(id as string),
        status: "pending",
      };

      const res = await myFetch.post(` ${serverUrl}/voter_applications`, data);

      console.log(res);
      toast.success(res.success);
      setIsShowVoterForm(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-black z-50 bg-opacity-80 flex justify-center items-center ">
      <form
        className="bg-yellow-50 p-2 rounded shadow border w-full max-w-[500px] flex flex-col"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-lg font-bold text-center">
          Voter Registration Form
        </h1>

        <label className=" p-1">
          <p className="font-semibold text-sm">National/Student ID</p>
          <input
            className="w-full bg-white p-1 rounded shadow border"
            type="text"
            required
            value={Id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        <label className=" p-1">
          <p className="font-semibold text-sm">Your Passport Photo</p>
          <input
            className="w-full bg-white p-1 rounded shadow border"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setPassportPhoto(e.target.files?.[0] || null)}
          />
        </label>

        <label className=" p-1">
          <p className="font-semibold text-sm">
            Photo of your National/Student ID
          </p>
          <input
            className="w-full bg-white p-1 rounded shadow border"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setIdPhoto(e.target.files?.[0] || null)}
          />
        </label>

        <div className="flex gap-2 font-bold p-1 mt-2">
          <button
            className=" border-black border shadow p-2 rounded grow bg-white"
            onClick={() => setIsShowVoterForm(false)}
            type="button"
          >
            Cancel
          </button>
          <button className=" border border-black shadow p-2 rounded grow bg-yellow-400">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
