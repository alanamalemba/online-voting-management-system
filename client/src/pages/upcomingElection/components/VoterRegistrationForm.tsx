type Props = {
  setIsShowVoterForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VoterRegistrationForm({ setIsShowVoterForm }: Props) {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-black z-50 bg-opacity-80 flex justify-center items-center ">
      <form className="bg-yellow-50 p-2 rounded shadow border w-full max-w-[500px] flex flex-col">
        <h1 className="text-lg font-bold text-center">
          Voter Registration Form
        </h1>

        <label className=" p-1">
          <p className="font-semibold text-sm">National/Student ID</p>
          <input
            className="w-full bg-white p-1 rounded shadow border"
            type="text"
            required
          />
        </label>

        <label className=" p-1">
          <p className="font-semibold text-sm">Your Passport Photo</p>
          <input
            className="w-full bg-white p-1 rounded shadow border"
            type="file"
            accept="image/*"
            required
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
