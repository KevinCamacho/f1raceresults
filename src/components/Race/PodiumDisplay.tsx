import { FC } from "react";
import { useDriver } from "../../hooks/useDriver";
import { IPosition } from "../../types";
import Placeholder from "react-bootstrap/Placeholder";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import FinishBadge from "./FinishBadge";

const PodiumDisplay: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  const { data: p1Driver, isFetching: isP1DriverFetching } = useDriver(
    raceResult[0].driver_number,
    raceResult[0].session_key,
  );
  const { data: p2Driver, isFetching: isP2DriverFetching } = useDriver(
    raceResult[1].driver_number,
    raceResult[0].session_key,
  );
  const { data: p3Driver, isFetching: isP3DriverFetching } = useDriver(
    raceResult[2].driver_number,
    raceResult[0].session_key,
  );

  if (isP1DriverFetching || isP2DriverFetching || isP3DriverFetching) {
    return (
      <Placeholder animation="glow">
        <Placeholder xs={8} />
        <Placeholder xs={8} />
        <Placeholder xs={8} />
      </Placeholder>
    );
  }

  return (
    <Stack gap={2}>
      <FinishBadge finishingPosition={1} driver={p1Driver} />
      <FinishBadge finishingPosition={2} driver={p2Driver} />
      <FinishBadge finishingPosition={3} driver={p3Driver} />
    </Stack>
  );
};

export default PodiumDisplay;
