import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";

const useSession = (meetingKey: number) => {
  return useQuery<ISession[]>({
    queryKey: ["useSession", meetingKey],
    queryFn: () => getSessionsByMeeting(meetingKey),
    refetchOnWindowFocus: false,
    initialData: [],
  });
};

const getSessionsByMeeting = (meetingKey: number): Promise<ISession[]> => {
  return fetch(
    `https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}&session_name=Race`,
  )
    .then((data) => data.json())
    .then((data: ISession[]) => data);
};

export default useSession;
