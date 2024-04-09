import { FC } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import "./FinishBadge.scss";
import { useDriver } from "../../../hooks/useDriver";

const FinishBadge: FC<{
  finishingPosition: number;
  session_key: number;
  driver_number: number;
}> = ({ finishingPosition, session_key, driver_number }) => {
  const { data: driver, isFetching: isDriverFetching } = useDriver(
    driver_number,
    session_key,
  );

  const getColor = () => {
    switch (finishingPosition) {
      case 1:
        return "#c9b037";
      case 2:
        return "#d7d7d7";
      case 3:
        return "#ad8a56";
      default:
        return "black";
    }
  };

  if (isDriverFetching) {
    return (
      <Placeholder animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
    );
  }

  return (
    <div className="finish-badge" style={{ background: getColor() }}>
      {`P${finishingPosition}: ${driver!.broadcast_name}`}
    </div>
  );
};

export default FinishBadge;
