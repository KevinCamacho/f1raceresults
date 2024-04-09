import { FC, useState } from "react";
import { IMeeting } from "../../types";
import useRaceSession from "../../hooks/useSession";
import PodiumDisplay from "./PodiumDisplay";
import useRaceResult from "../../hooks/usePosition";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Offcanvas from "react-bootstrap/Offcanvas";
import RaceResultStack from "./RaceResultStack";

const RaceTile: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { data: sessionData, isFetching: isRaceSessionFetching } =
    useRaceSession(meeting.meeting_key);
  const { data: raceResult, isFetching: isRaceResultFetching } = useRaceResult(
    sessionData.session_key,
  );

  const [showResultOffCanvas, setShowResultOffCanvas] =
    useState<Boolean>(false);

  if (isRaceSessionFetching || isRaceResultFetching) {
    return (
      <Card className="h-100">
        <Card.Header>
          <Placeholder animation="glow">
            <Placeholder xs={10} />
          </Placeholder>
        </Card.Header>
        <Card.Body>
          <Placeholder as={Card.Subtitle} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} />
            <Placeholder xs={12} />
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  const openResultOffcanvas = () => {
    setShowResultOffCanvas(true);
  };

  const closeResultOffcanvas = () => {
    setShowResultOffCanvas(false);
  };

  return (
    <>
      <Card
        className="h-100"
        onClick={openResultOffcanvas}
        style={{ cursor: "pointer" }}
      >
        <Card.Header as="h5">{meeting.meeting_name}</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {meeting.circuit_short_name}
          </Card.Subtitle>
          <Card.Text>
            {!!raceResult.length && <PodiumDisplay raceResult={raceResult} />}
          </Card.Text>
        </Card.Body>
      </Card>
      <Offcanvas show={showResultOffCanvas} onHide={closeResultOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{meeting.meeting_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RaceResultStack raceResult={raceResult} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default RaceTile;
