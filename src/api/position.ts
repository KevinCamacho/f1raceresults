import axios from "axios";
import { IPosition } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

export const getFinishingPositions = (
  sessionKey: number,
): Promise<IPosition[]> => {
  return (
    axios
      .get(`https://api.openf1.org/v1/position?session_key=${sessionKey}`)
      .then((response) => {
        const { data }: { data: IPosition[] } = response;
        return data.map((position: IPosition) => {
          return {
            ...position,
            parsed_date: moment.utc(position.date, timeParseFormat).valueOf(),
          };
        });
      })
      //this sorts the finishing positions in descending order by timestamp
      .then((data: IPosition[]) =>
        data.sort((a, b) => b.parsed_date - a.parsed_date),
      )
      //dedupes by position, taking the first of each P1-P20 we see
      .then((data: IPosition[]) => {
        const positionsSeen: number[] = [];
        return data.filter((position: IPosition) => {
          if (positionsSeen.includes(position.position)) {
            return false;
          } else {
            positionsSeen.push(position.position);
            return true;
          }
        });
      })
      //this sorts the deduped finishing positions in P1-P20 order
      .then((data: IPosition[]) => data.sort((a, b) => a.position - b.position))
  );
};
