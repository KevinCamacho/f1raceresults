import { FC } from "react";
import { IPosition } from "../../types";
import Stack from "react-bootstrap/Stack";
import FinishBadge from "./FinishBadge/FinishBadge";

const PodiumDisplay: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  return (
    <Stack gap={2}>
      <FinishBadge
        finishingPosition={1}
        session_key={raceResult[0].session_key}
        driver_number={raceResult[0].driver_number}
      />
      <FinishBadge
        finishingPosition={2}
        session_key={raceResult[1].session_key}
        driver_number={raceResult[1].driver_number}
      />
      <FinishBadge
        finishingPosition={3}
        session_key={raceResult[2].session_key}
        driver_number={raceResult[2].driver_number}
      />
    </Stack>
  );
};

export default PodiumDisplay;
