import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

const useRaceSession = (meetingKey: number) => {
  return useQuery<ISession>({
    queryKey: ["useRaceSession", meetingKey],
    queryFn: () => getRaceSession(meetingKey),
    refetchOnWindowFocus: false,
    initialData: {
      circuit_key: 0,
      circuit_short_name: "",
      country_code: "",
      country_key: 0,
      country_name: "",
      date_end: "",
      parsed_date_start: 0,
      date_start: "",
      gmt_offset: "",
      location: "",
      meeting_key: 0,
      session_key: 0,
      session_name: "",
      session_type: "",
      year: "",
    },
  });
};

const getRaceSession = (meetingKey: number): Promise<ISession> => {
  return fetch(
    `https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}&session_name=Race`,
  )
    .then((data) => data.json())
    .then((data: ISession[]) => data[0])
    .then((data: ISession) => {
      return {
        ...data,
        parsed_date_start: moment
          .utc(data.date_start, timeParseFormat)
          .valueOf(),
      };
    });
};

export default useRaceSession;
