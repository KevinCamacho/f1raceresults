import { FC } from "react";
import { IMeeting } from "../../types";
import { easyPrint } from "../util";
import useRaceSession from "../../hooks/useSession";
import useRaceResult from "../../hooks/usePosition";
import { printLocalTime } from "../../constants";
import useDrivers from "../../hooks/useDriver";

const RaceTile: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { data: sessionData, isFetching: isRaceSessionFetching } =
    useRaceSession(meeting.meeting_key);
  const { data: raceResult, isFetching: isRaceResultFetching } = useRaceResult(
    sessionData.session_key,
  );
  const { data: driverData } = useDrivers(sessionData.session_key);

  const printData = () => {
    console.log("HI ::: driver data", easyPrint(driverData));
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
      {!isRaceSessionFetching && (
        <div>{printLocalTime(sessionData.parsed_date_start)}</div>
      )}
    </div>
  );
};

export default RaceTile;
