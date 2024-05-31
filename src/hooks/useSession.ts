import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";
import { getRaceSessionsForYear } from "../api/session";

const useRaceSession = (year: number, meetingKey: number) => {
  return useQuery<ISession[]>({
    queryKey: ["useRaceSession", year],
    queryFn: () => getRaceSessionsForYear(year),
    select: (data) => getRaceSessionByMeetingKey(data, meetingKey),
  });
};

const getRaceSessionByMeetingKey = (races: ISession[], meetingKey: number) =>
  races.filter((race: ISession) => race.meeting_key === meetingKey);

export default useRaceSession;
