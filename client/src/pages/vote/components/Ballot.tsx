import { ElectionType } from "../../../utilities/Types";

type Props = {
  election: ElectionType;
  setIsShowBallot: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Ballot({ election, setIsShowBallot }: Props) {
  return (
    <div className=" p-6 bg-indigo-800 fixed inset-0 z-10 bg-opacity-60 flex justify-center items-center">
      <div className=" relative p-4 border-2 border-slate-300  bg-white w-full max-w-[800px] rounded-md max-h-screen">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => setIsShowBallot(false)}
        >
          close
        </button>
        <h1 className="text-2xl font-semibold text-center">
          {election.name} Ballot
        </h1>

        <div></div>

        <div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
