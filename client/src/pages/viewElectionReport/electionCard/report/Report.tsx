import React from "react";
import { ElectionType } from "../../../../utilities/Types";
import Table from "./table/Table";
import html2pdf from "html2pdf.js";

type Props = {
  election: ElectionType;
  setIsShowReport: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Report({ election, setIsShowReport }: Props) {
  function handleExport() {
    const element = document.getElementById("table");
    console.log(element);

    html2pdf().from(element).save();
  }

  return (
    <div className="fixed  inset-0 bg-black z-10 bg-opacity-50">
      <div className="bg-white flex justify-between lg:max-w-[60%] mx-auto p-4 rounded-md  my-4">
        <button
          className="border-2 border-black font-semibold rounded-md shadow-md p-2"
          onClick={handleExport}
        >
          Download
        </button>
        <button
          className="border-2 border-black font-semibold rounded-md shadow-md p-2"
          onClick={() => setIsShowReport(false)}
        >
          Cancel
        </button>
      </div>

      <Table election={election} />
    </div>
  );
}
