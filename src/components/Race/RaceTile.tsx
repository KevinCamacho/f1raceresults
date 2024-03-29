import { FC } from "react";
import { IMeeting } from "../../types";
import useRaceSession from "../../hooks/useSession";
import { printLocalTime } from "../../constants";
import PodiumDisplay from "./PodiumDisplay";
import useRaceResult from "../../hooks/usePosition";
import { easyPrint } from "../util";

const RaceTile: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { data: sessionData, isFetching: isRaceSessionFetching } =
    useRaceSession(meeting.meeting_key);
  const { data: raceResult, isFetching: isRaceResultFetching } = useRaceResult(
    sessionData.session_key,
  );

  if (isRaceSessionFetching || isRaceResultFetching) {
    return <div>race session loading</div>;
  }

  return (
    <div
      style={{
        border: "1px black solid",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>{meeting.meeting_name}</div>
      <div>{meeting.circuit_short_name}</div>
      {!!sessionData.parsed_date_start && (
        <div>{printLocalTime(sessionData.parsed_date_start)}</div>
      )}
      {!!raceResult.length && <PodiumDisplay raceResult={raceResult} />}
    </div>
  );
};

export default RaceTile;
