import { FC } from "react";
import { IMeeting } from "../../types";
import { easyPrint } from "../util";
import useSession from "../../hooks/useSession";

const RaceTile: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { data } = useSession(meeting.meeting_key);

  const printData = () => {
    console.log("HI ::: this is the meeting data", easyPrint(data));
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
