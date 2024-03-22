import { FC } from "react";
import { IMeeting } from "../../types";
import { easyPrint } from "../util";
import useRaceSession from "../../hooks/useSession";
import useRaceResult from "../../hooks/usePosition";

const RaceTile: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { data: sessionData } = useRaceSession(meeting.meeting_key);
  const { data: raceResult } = useRaceResult(sessionData.session_key);

  const printData = () => {
    console.log("HI ::: this is the session data", easyPrint(sessionData));
    console.log("HI ::: this is the race result data", easyPrint(raceResult));
  };

  return (
    <div
      style={{
        border: "1px black solid",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={printData}
    >
      <div>{meeting.meeting_name}</div>
      <div>{meeting.circuit_short_name}</div>
    </div>
  );
};

export default RaceTile;
