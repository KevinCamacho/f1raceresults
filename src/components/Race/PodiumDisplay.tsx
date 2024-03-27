import { FC } from "react";
import { easyPrint } from "../util";
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

  const printData = () => {
    console.log(
      "HI ::: the race result",
      easyPrint(p1Driver),
      easyPrint(p2Driver),
      easyPrint(p3Driver),
    );
  };

  if (isP1DriverFetching || isP2DriverFetching || isP3DriverFetching) {
    return <div>race result loading</div>;
  }

  return (
    <div onClick={printData}>
      <div>P1: {p1Driver.full_name}</div>
      <div>P2: {p2Driver.full_name}</div>
      <div>P3: {p3Driver.full_name}</div>
    </div>
  );
};

export default PodiumDisplay;
