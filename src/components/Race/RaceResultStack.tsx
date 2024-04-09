import { FC } from "react";
import { IPosition } from "../../types";
import Stack from "react-bootstrap/Stack";
import FinishBadge from "./FinishBadge/FinishBadge";

const RaceResultStack: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  return (
    <Stack gap={2}>
      {raceResult.map((position: IPosition, index: number) => (
        <FinishBadge
          key={`raceResultStack${position.session_key}${position.driver_number}`}
          finishingPosition={++index}
          session_key={position.session_key}
          driver_number={position.driver_number}
        />
      ))}
    </Stack>
  );
};

export default RaceResultStack;
