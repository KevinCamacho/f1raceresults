import { FC } from "react";
import "./App.scss";
import { IMeeting } from "../types";
import RaceTile from "./Race/RaceTile";
import useRaceList from "../hooks/useMeeting";

const App: FC = () => {
  const { data, isFetching } = useRaceList();

  if (isFetching) {
    return <div>data fetching</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data.map((meeting: IMeeting) => (
          <RaceTile key={meeting.meeting_key} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default App;
