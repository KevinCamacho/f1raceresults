import { FC } from "react";
import { IDriver } from "../../types/IDriver";
import Badge from "react-bootstrap/Badge";
import { easyPrint } from "../util";

const FinishBadge: FC<{ finishingPosition: number; driver: IDriver }> = ({
  finishingPosition,
  driver,
}) => {
  const printData = () => console.log(easyPrint(driver));
  return (
    <Badge
      style={{ backgroundColor: "green" }}
      pill
      onClick={printData}
    >{`P${finishingPosition}: ${driver.broadcast_name}`}</Badge>
  );
};

export default FinishBadge;
