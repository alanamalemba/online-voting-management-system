import { useContext, useEffect, useState } from "react";
import { myFetch } from "../../../utilities/myFetch";
import { serverUrl } from "../../../utilities/Constants";
import { CandidateType, UserType } from "../../../utilities/Types";
import { BallotContext } from "../Ballot";

type Props = {
  candidate: CandidateType;
};

export default function CandidateCard({ candidate }: Props) {
  const { votes, setVotes } = useContext(BallotContext);

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function getData() {
      try {
        const userData = await myFetch(
          `${serverUrl}/users/byId/${candidate.user_id}`
        );

        setUser(userData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getData();
  }, [candidate]);

  function handleClicked() {
    // Check if the vote already exists for the candidate
    const existingVoteIndex = votes.findIndex(
      (vote) => vote.candidate_id === candidate.id
    );

    if (existingVoteIndex !== -1) {
      // If the vote exists, remove it from the votes array
      const updatedVotes = [...votes];
      updatedVotes.splice(existingVoteIndex, 1);
      setVotes(updatedVotes);
    } else {
      // If the vote does not exist, add it to the votes array
      setVotes([
        ...votes,
        {
          election_id: candidate.election_id as number,
          candidate_id: candidate.id as number,
          position_id: candidate.position_id as number,
        },
      ]);
    }
  }

  return (
    <div className="p-4 border-2 border-black rounded flex gap-[80px] items-center ">
      <div className="w-[200px] h-[200px]">
        <img
          className="h-full w-full object-cover rounded-md"
          src={`${serverUrl}/uploads/${candidate.photo_url}`}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-2 font-medium ">
        <p className="text-lg">Name: {user?.name}</p>
        <p>
          Manifesto: <span className="italic">{candidate.manifesto}</span>
        </p>
      </div>

      <div className="border-2 h-[70px] w-[70px] ml-auto">
        <input
          onClick={handleClicked}
          className="h-full w-full"
          type="checkbox"
        />
      </div>
    </div>
  );
}
