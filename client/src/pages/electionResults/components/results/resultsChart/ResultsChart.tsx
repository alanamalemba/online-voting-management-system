import { UserCandidateType } from "../Results";
import {
  ChartJsDataType,
  PositionType,
  VoteType,
} from "../../../../../utilities/Types";
import { Bar } from "react-chartjs-2";

import "chart.js/auto";

type Props = {
  userCandidates: UserCandidateType[];
  votes: VoteType[];
  position: PositionType;
};

export default function ResultsChart({
  position,
  userCandidates,
  votes,
}: Props) {
  const candidates = userCandidates.filter(
    (candidate) => candidate.position_id === position.id
  );
  const data: ChartJsDataType = {
    labels: candidates.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Candidate Votes",
        data: candidates.map((candidate) => {
          const candidateVotes = votes.filter(
            (vote) => vote.candidate_id === candidate.id
          );

          return candidateVotes.length;
        }),
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="max-h-[400px] ">
      <Bar data={data} />
    </div>
  );
}
