import { FC } from "react";
import { IDriver, IPosition } from "../../types";
import Stack from "react-bootstrap/Stack";
import FinishBadge from "./FinishBadge/FinishBadge";
import { useDrivers } from "../../hooks/useDriver";
import { getFinishBadgeLoadingState } from "./FinishBadge/FinishBadge";

const RaceResultStack: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  const { data: drivers, isFetching } = useDrivers(raceResult[0].session_key);
  const driversInOrder: IDriver[] | undefined =
    drivers &&
    raceResult.map(
      (x) => drivers.find((y) => y.driver_number === x.driver_number)!,
    );

  if (isFetching) {
    <Stack gap={2}>
      {raceResult.map((x) => getFinishBadgeLoadingState())}
    </Stack>;
  }

  return (
    <Stack gap={2}>
      {driversInOrder?.map((driver: IDriver, index: number) => (
        <FinishBadge
          key={`raceResultStack${driver.session_key}${driver.driver_number}`}
          finishingPosition={++index}
          displayTeamColor
          driver={driver}
        />
      ))}
    </Stack>
  );
};

export default RaceResultStack;
