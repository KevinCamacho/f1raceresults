import { FC, useEffect } from "react";
import "./App.scss";
import useRaceList from "../hooks/useRaceList";
import { IMeeting } from "../types";

const App: FC = () => {
  const { data, isFetching } = useRaceList();

  console.log("hello world!");

  if (isFetching) {
    return <div>data fetching</div>;
  }

  return (
    <div>
      {data.map((meeting: IMeeting) => (
        <div>
          <div>{meeting.meeting_official_name}</div>
          <div>{meeting.date_start}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
