import { FC } from "react";
import { IDriver } from "../../../types/IDriver";
import Badge from "react-bootstrap/Badge";
import "./FinishBadge.scss";

const FinishBadge: FC<{ finishingPosition: number; driver: IDriver }> = ({
  finishingPosition,
  driver,
}) => {
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

  return (
    <div className="finish-badge" style={{ background: getColor() }}>
      {`P${finishingPosition}: ${driver.broadcast_name}`}
    </div>
  );
};

export default FinishBadge;
