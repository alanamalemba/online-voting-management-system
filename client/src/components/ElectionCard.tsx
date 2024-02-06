import { Link } from "react-router-dom";
import { serverUrl } from "../utilities/Constants";
import { ElectionType } from "../utilities/Types";

type Props = {
  election: ElectionType;
};

export default function ElectionCard({ election }: Props) {
  return (
    <Link
      to={`/upcoming-election/${election.id}`}
      className="relative shadow border rounded-md overflow-hidden h-[240px] hover:scale-105  duration-300"
    >
      <img
        className="   w-full h-full object-cover"
        src={`${serverUrl}/uploads/${election.photo_url}`}
        alt=""
      />

      <div className="  absolute bottom-0 top-0 left-0 right-0  flex flex-col items-center justify-center   ">
        <p className=" text-yellow-900 p-1 h-1/4 hover:h-full duration-300 flex items-center justify-center font-bold text-lg bg-opacity-50 w-full bg-white ">
          {election.name}
        </p>
      </div>
    </Link>
  );
}
