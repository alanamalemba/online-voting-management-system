import React, { useState } from "react";
import { serverUrl } from "../../../utilities/constants";
import { ElectionType } from "../../../utilities/Types";
import Results from "./results/Results";

type Props = {
  election: ElectionType;
};

export default function ElectionResultCard({ election }: Props) {
  const [isShowResults, setIsShowResults] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsShowResults(true)}
        className="border-2  text-left border-slate-200 rounded-lg overflow-hidden border-t-green-500 relative  "
      >
        <img
          className="h-[200px] w-full object-cover border-b-2"
          src={`${serverUrl}/${election.photo_url}`}
          alt=""
        />

        <div className="p-2 flex flex-col gap-1 ">
          <p className="text-lg font-medium">{election.name}</p>
          <p className="text-xs font-medium text-slate-800 ">
            Starting on {new Date(election.start_date).toString()}
          </p>
          <p className="text-xs font-medium text-slate-800 ">
            Ending on {new Date(election.end_date).toString()}
          </p>
        </div>
      </button>

      {isShowResults && (
        <Results setIsShowResults={setIsShowResults} election={election} />
      )}
    </>
  );
}
