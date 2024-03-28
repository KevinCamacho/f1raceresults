import { FC } from "react";
import { useDriver } from "../../hooks/useDriver";
import { IPosition } from "../../types";

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
    return <div>race result loading</div>;
  }

  return (
    <div>
      <div>
        P1: {p1Driver.last_name?.toUpperCase() || p1Driver.broadcast_name}
      </div>
      <div>
        P2: {p2Driver.last_name?.toUpperCase() || p2Driver.broadcast_name}
      </div>
      <div>
        P3: {p3Driver.last_name?.toUpperCase() || p3Driver.broadcast_name}
      </div>
    </div>
  );
};

export default PodiumDisplay;
