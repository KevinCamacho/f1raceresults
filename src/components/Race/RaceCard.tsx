import { FC, useState } from "react";
import { IMeeting } from "../../types";
import useRaceSession from "../../hooks/useSession";
import PodiumDisplay from "./PodiumDisplay";
import useRacePositions from "../../hooks/usePosition";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Offcanvas from "react-bootstrap/Offcanvas";
import RaceResultStack from "./RaceResultStack";
import { printLocalTime } from "../../constants";
import { useInView } from "react-intersection-observer";
import { getPodiumDisplayLoadingState } from "./PodiumDisplay";

const RaceCard: FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const { ref, inView } = useInView();

  const { data: sessionData, isFetching: isRaceSessionFetching } =
    useRaceSession(meeting.year, meeting.meeting_key);
  const { data: raceResult, isFetching: isRaceResultFetching } =
    useRacePositions(
      sessionData?.length ? sessionData?.[0].session_key : 0,
      inView,
    );

  const [showResultOffCanvas, setShowResultOffCanvas] =
    useState<Boolean>(false);

  if (isRaceSessionFetching) {
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
            {getPodiumDisplayLoadingState()}
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  if (!sessionData?.length) {
    return <></>;
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
          {sessionData ? (
            <div>{printLocalTime(sessionData?.[0].parsed_date_start)}</div>
          ) : (
            <></>
          )}
        </Card.Subtitle>
        <Card.Text>
          {isRaceResultFetching
            ? getPodiumDisplayLoadingState()
            : raceResult?.length && (
                <div className="pt-3">
                  <PodiumDisplay raceResult={raceResult} />
                </div>
              )}
        </Card.Text>
      </>
    );
  };

  return (
    <>
      <Card
        ref={ref}
        className="h-100"
        onClick={() => sessionData?.[0].session_key && openResultOffcanvas()}
        style={sessionData?.[0].session_key ? { cursor: "pointer" } : {}}
      >
        <Card.Header as="h5">{meeting.meeting_name}</Card.Header>
        <Card.Body>
          {sessionData?.[0].session_key
            ? renderWeekendFinished()
            : renderWeekendInProgress()}
        </Card.Body>
      </Card>
      <Offcanvas show={showResultOffCanvas} onHide={closeResultOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{meeting.meeting_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RaceResultStack raceResult={raceResult || []} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default RaceCard;
