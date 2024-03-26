import { useQuery } from "@tanstack/react-query";
import { IPosition } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

const useRaceResult = (sessionKey: number) => {
  return useQuery<IPosition[]>({
    queryKey: ["useRaceResult", sessionKey],
    queryFn: () => getFinishingPositions(sessionKey),
    refetchOnWindowFocus: true,
    initialData: [],
    enabled: !!sessionKey,
  });
};

const getFinishingPositions = (sessionKey: number): Promise<IPosition[]> => {
  return (
    fetch(`https://api.openf1.org/v1/position?session_key=${sessionKey}`)
      .then((data) => data.json())
      .then((data: IPosition[]) =>
        data.map((position: IPosition) => {
          return {
            ...position,
            parsed_date: moment.utc(position.date, timeParseFormat).valueOf(),
          };
        }),
      )
      //this sorts the finishing positions in descending order
      .then((data: IPosition[]) =>
        data.sort((a, b) => b.parsed_date - a.parsed_date),
      )
  );
};

export default useRaceResult;
