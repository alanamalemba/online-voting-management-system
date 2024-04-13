import React, { useState } from "react";
import { ElectionType } from "../../../utilities/Types";
import Report from "./report/Report";

type Props = {
  election: ElectionType;
};

export default function ElectionCard({ election }: Props) {
  const [isShowReport, setIsShowReport] = useState(false);
  return (
    <>
      <button
        className="border-2 border-black font-semibold shadow-md rounded-md p-6  w-full  "
        onClick={() => setIsShowReport(true)}
      >
        {election.name}
      </button>

      {isShowReport && (
        <Report election={election} setIsShowReport={setIsShowReport} />
      )}
    </>
  );
}
