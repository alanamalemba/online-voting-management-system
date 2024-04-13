import { useEffect, useState } from "react";
import { ElectionType, VoteType } from "../../../../../utilities/Types";
import { serverUrl } from "../../../../../utilities/constants";
import VoteData from "./voteData/VoteData";

type Props = {
  election: ElectionType;
};

export default function Table({ election }: Props) {
  const [votes, setVotes] = useState<VoteType[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/votes/election/${election.id}`)
      .then((res) => res.json())
      .then((result) => setVotes(result.success.data))
      .catch((err) => console.error(err.message));
  }, [election.id]);

  return (
    <table
      id="table"
      className="bg-white border-x-2 border-b-2 border-black  mx-auto m-2 min-w-full  rounded-b-md "
    >
      <caption className="p-4 bg-white font-semibold text-xl bg-opacity-80 rounded-t-md">
        {election.name} Report
      </caption>

      <thead className="font-semibold  ">
        <tr className="border-t-2 border-black">
          <td className="p-2">Candidate name</td>
          <td className="p-2">Position</td>
          <td className="p-2">Vote ID</td>
          <td className="p-2">Time</td>
        </tr>
      </thead>

      <tbody>
        {votes.map((vote) => (
          <VoteData key={vote.id} vote={vote} />
        ))}
      </tbody>
    </table>
  );
}
