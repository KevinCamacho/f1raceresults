import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

const useRaceSession = (meetingKey: number, enabled: boolean) => {
  return useQuery<ISession>({
    queryKey: ["useRaceSession", meetingKey],
    queryFn: () => getRaceSession(meetingKey),
    refetchOnWindowFocus: false,
    enabled: enabled,
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
