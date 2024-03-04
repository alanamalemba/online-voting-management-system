import { ElectionType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/constants";

type Props = {
  election: ElectionType;
};

export default function ElectionCard({ election }: Props) {
  const startDate = new Date(election.start_date).toString();
  const endDate = new Date(election.end_date).toString();

  return (
    <>
      <div className="border-2 border-slate-200 rounded-lg overflow-hidden border-t-green-500 relative">
        <img
          className="h-[200px] w-full object-cover border-b-2"
          src={`${serverUrl}/${election.photo_url}`}
          alt=""
        />

        <div className="p-2 flex flex-col gap-1 ">
          <p className="text-lg font-medium">{election.name}</p>
          <p className="text-xs font-medium text-slate-800 ">
            Starting on {startDate}
          </p>
          <p className="text-xs font-medium text-slate-800 ">
            Ending on {endDate}
          </p>
        </div>

        <div></div>
      </div>
    </>
  );
}
