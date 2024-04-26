import { FC, useState } from "react";
import { IMeeting } from "../../types";
import useRaceSession from "../../hooks/useSession";
import PodiumDisplay from "./PodiumDisplay";
import useRaceResult from "../../hooks/usePosition";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Offcanvas from "react-bootstrap/Offcanvas";
import RaceResultStack from "./RaceResultStack";
import { printLocalTime } from "../../constants";

const RaceCard: FC<{ meeting: IMeeting }> = ({ meeting }) => {
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
            <Placeholder xs={12} />
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

  const renderWeekendInProgress = () => {
    return (
      <>
        <Card.Subtitle className="mb-2 text-muted">
          <div>{meeting.circuit_short_name}</div>
          <div>{printLocalTime(meeting.parsed_date_start)}</div>
        </Card.Subtitle>
        <Card.Text>
          <div>Weekend in progress</div>
        </Card.Text>
      </>
    );
  };

  const renderWeekendFinished = () => {
    return (
      <>
        <Card.Subtitle className="mb-2 text-muted">
          <div>{meeting.circuit_short_name}</div>
          <div>{printLocalTime(sessionData.parsed_date_start)}</div>
        </Card.Subtitle>
        <Card.Text>
          {!!raceResult.length && <PodiumDisplay raceResult={raceResult} />}
        </Card.Text>
      </>
    );
  };

  return (
    <>
      <Card
        className="h-100"
        onClick={() => sessionData.session_key && openResultOffcanvas()}
        style={sessionData.session_key ? { cursor: "pointer" } : {}}
      >
        <Card.Header as="h5">{meeting.meeting_name}</Card.Header>
        <Card.Body>
          {sessionData.session_key
            ? renderWeekendFinished()
            : renderWeekendInProgress()}
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

export default RaceCard;
