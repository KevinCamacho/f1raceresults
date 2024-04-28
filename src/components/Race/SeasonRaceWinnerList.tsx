import { FC } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IMeeting } from "../../types";
import RaceCard from "./RaceCard";
import useRaceList from "../../hooks/useMeeting";

const SeasonRaceWinnerList: FC<{ year: string }> = ({ year }) => {
  const { data, isFetching } = useRaceList(year);

  if (isFetching) {
    return <div>data fetching</div>;
  }

  return (
    <Row style={{ rowGap: "1rem" }}>
      {data?.map((meeting: IMeeting) => (
        <Col xs={12} sm={6} /* md={4} */ /* lg={3} */ key={meeting.meeting_key}>
          <RaceCard meeting={meeting} />
        </Col>
      ))}
    </Row>
  );
};

export default SeasonRaceWinnerList;
