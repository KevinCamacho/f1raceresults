import { FC } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import "./FinishBadge.scss";
import { IDriver } from "../../../types";

const FinishBadge: FC<{
  finishingPosition: number;
  displayTeamColor?: boolean;
  driver: IDriver;
}> = ({ finishingPosition, displayTeamColor, driver }) => {
  const getColor = () => {
    if (displayTeamColor) {
      return `#${driver.team_colour?.length === 6 ? driver.team_colour : "000000"}`;
    }
    switch (finishingPosition) {
      case 1:
        return "#c9b037";
      case 2:
        return "#d7d7d7";
      case 3:
        return "#ad8a56";
      default:
        return "#000000";
    }
  };

  return (
    <div className="finish-badge" style={{ background: getColor() }}>
      {`P${finishingPosition}: ${driver.broadcast_name}`}
    </div>
  );
};

export const getFinishBadgeLoadingState = () => {
  return (
    <Placeholder animation="glow">
      <Placeholder xs={12} />
    </Placeholder>
  );
};

export default FinishBadge;
