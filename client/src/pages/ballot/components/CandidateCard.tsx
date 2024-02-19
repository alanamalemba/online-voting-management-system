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
    setVotes([
      ...votes,
      {
        election_id: candidate.election_id as number,
        candidate_id: candidate.id as number,
        position_id: candidate.position_id as number,
      },
    ]);
  }
  console.log(votes);

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
        <input className="h-full w-full" type="checkbox" />
      </div>
    </div>
  );
}
