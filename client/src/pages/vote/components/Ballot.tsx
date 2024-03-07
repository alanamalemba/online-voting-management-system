import { ElectionType } from "../../../utilities/Types";

type Props = {
  election: ElectionType;
};

export default function Ballot({ election }: Props) {
  return (
    <div className=" p-6 bg-indigo-800 fixed inset-0 z-10 bg-opacity-60 flex justify-center items-center">
      <div className="p-4 border-2 border-slate-300  bg-white w-full max-w-[800px] rounded-md max-h-screen">
        <h1 className="text-2xl font-semibold text-center">
          {election.name} Ballot
        </h1>
      </div>
    </div>
  );
}
