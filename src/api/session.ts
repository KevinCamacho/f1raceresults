import axios from "axios";
import { ISession } from "../types";
import { timeParseFormat } from "../constants";
import * as moment from "moment";

export const getRaceSessionsForYear = (year: number): Promise<ISession[]> => {
  return axios
    .get(`https://api.openf1.org/v1/sessions?year=${year}&session_name=Race`)
    .then((response) => {
      const { data }: { data: ISession[] } = response;
      return data.map((race: ISession) => ({
        ...race,
        parsed_date_start: moment
          .utc(race.date_start, timeParseFormat)
          .valueOf(),
      }));
    });
};
