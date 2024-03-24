import React, { useEffect, useState } from "react";
import { getFormattedTime } from "../../../../../../../../../utilities/getFormatedTime";
import { ElectionType } from "../../../../../../../../../utilities/Types";

type Props = {
  isElectionEnded: boolean;
  isElectionStarted: boolean;
  election: ElectionType;
  setIsElectionStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsElectionEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Counter({
  setIsElectionStarted,
  setIsElectionEnded,
  isElectionStarted,
  election,

  isElectionEnded,
}: Props) {
  const [timeToStart, setTimeToStart] = useState<number | null>(null);
  const [timeToEnd, setTimeToEnd] = useState<number | null>(null);

  useEffect(() => {
    function getTimeToStart() {
      const now = new Date().getTime();
      const start = new Date(election.start_date).getTime();

      if (now > start) {
        setIsElectionStarted(true);
        return;
      }

      setTimeToStart(start - now);
    }

    function getTimeToEnd() {
      const now = new Date().getTime();
      const start = new Date(election.end_date).getTime();

      if (now > start) {
        setIsElectionEnded(true);
        return;
      }

      setTimeToEnd(start - now);
    }

    // if election has not started, show the
    // upcoming election countdown
    if (!isElectionStarted) {
      getTimeToStart();
      const interval = setInterval(() => {
        getTimeToStart();
      }, 1000);
      return () => clearInterval(interval);
    }

    //if election is ongoing, show the election count down
    // and do some stuff
    if (isElectionStarted && !isElectionEnded) {
      getTimeToEnd();
      const interval = setInterval(() => {
        getTimeToEnd();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    election.end_date,
    election.start_date,
    isElectionEnded,
    isElectionStarted,
    setIsElectionEnded,
    setIsElectionStarted,
  ]);

  return (
    <>
      {!isElectionStarted && (
        <div className=" text-center p-2 bg-blue-500 absolute right-0 w-4/5 rounded-bl-md font-semibold text-sm shadow-md bg-opacity-80 text-white">
          <p> Election starts in: {getFormattedTime(timeToStart)}</p>
        </div>
      )}

      {isElectionStarted && (
        <div className=" text-center p-2 bg-green-500 absolute right-0 w-4/5 rounded-bl-md font-semibold text-sm shadow-md bg-opacity-80 text-white">
          <p> Election ends in: {getFormattedTime(timeToEnd)}</p>
        </div>
      )}
    </>
  );
}
