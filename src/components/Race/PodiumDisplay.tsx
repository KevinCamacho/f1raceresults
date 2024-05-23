import { FC } from "react";
import { IPosition } from "../../types";
import Stack from "react-bootstrap/Stack";
import FinishBadge, {
  getFinishBadgeLoadingState,
} from "./FinishBadge/FinishBadge";
import { useDrivers } from "../../hooks/useDriver";

const PodiumDisplay: FC<{ raceResult: IPosition[] }> = ({ raceResult }) => {
  const { data: drivers, isFetching } = useDrivers(raceResult[0].session_key);

  if (isFetching) {
    return getPodiumDisplayLoadingState();
  }

  return (
    <Stack gap={2}>
      <FinishBadge
        finishingPosition={1}
        driver={
          drivers?.find((x) => x.driver_number === raceResult[0].driver_number)!
        }
      />
      <FinishBadge
        finishingPosition={2}
        driver={
          drivers?.find((x) => x.driver_number === raceResult[1].driver_number)!
        }
      />
      <FinishBadge
        finishingPosition={3}
        driver={
          drivers?.find((x) => x.driver_number === raceResult[2].driver_number)!
        }
      />
    </Stack>
  );
};

export default PodiumDisplay;

export const getPodiumDisplayLoadingState = () => {
  return (
    <Stack gap={2}>
      {getFinishBadgeLoadingState()}
      {getFinishBadgeLoadingState()}
      {getFinishBadgeLoadingState()}
    </Stack>
  );
};
