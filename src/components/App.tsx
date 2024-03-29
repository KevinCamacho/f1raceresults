import { FC } from "react";
import "./App.scss";
import { IMeeting } from "../types";
import RaceTile from "./Race/RaceTile";
import useRaceList from "../hooks/useMeeting";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App: FC = () => {
  const { data, isFetching } = useRaceList();

  if (isFetching) {
    return <div>data fetching</div>;
  }

  return (
    <Container fluid="md">
      <Row style={{ rowGap: "1rem" }}>
        {data.map((meeting: IMeeting) => (
          <Col xs={12} sm={6} md={4} lg={3}>
            <RaceTile key={meeting.meeting_key} meeting={meeting} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
