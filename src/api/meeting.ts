import axios from "axios";
import { IMeeting } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

export const getAllMeetingsForYear = (year: string): Promise<IMeeting[]> => {
  return axios
    .get(`https://api.openf1.org/v1/meetings?year=${year}`)
    .then(({ data }: { data: IMeeting[] }) => data)
    .then((data: IMeeting[]) =>
      data.map((meeting: IMeeting) => {
        return {
          ...meeting,
          parsed_date_start: moment
            .utc(meeting.date_start, timeParseFormat)
            .valueOf(),
        };
      }),
    );
};
