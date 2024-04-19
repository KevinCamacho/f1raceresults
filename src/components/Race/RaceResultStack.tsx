import { FC } from "react";
import { IPosition } from "../../types";
import Stack from "react-bootstrap/Stack";
import FinishBadge from "./FinishBadge/FinishBadge";
import { useDrivers } from "../../hooks/useDriver";
import { getFinishBadgeLoadingState } from "./FinishBadge/FinishBadge";

const RaceResultStack: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  const { data: drivers, isFetching } = useDrivers(raceResult[0].session_key);

  if (isFetching) {
    <Stack gap={2}>
      {raceResult.map((x) => getFinishBadgeLoadingState())}
    </Stack>;
  }

  return (
    <Stack gap={2}>
      {raceResult.map((position: IPosition, index: number) => (
        <FinishBadge
          key={`raceResultStack${position.session_key}${position.driver_number}`}
          finishingPosition={++index}
          displayTeamColor
          driver={
            drivers.find((x) => x.driver_number === position.driver_number)!
          }
        />
      ))}
    </Stack>
  );
};

export default RaceResultStack;
