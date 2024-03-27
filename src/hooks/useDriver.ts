import { useQuery } from "@tanstack/react-query";
import { IDriver } from "../types";

export const useDrivers = (session_key: number) => {
  return useQuery<IDriver[]>({
    queryKey: ["useDrivers", session_key],
    queryFn: () => getAllDriversInSession(session_key),
    refetchOnWindowFocus: true,
    initialData: [],
    enabled: !!session_key,
  });
};

export const useDriver = (driver_number: number, session_key: number) => {
  return useQuery<IDriver>({
    queryKey: ["useDriver", driver_number, session_key],
    queryFn: () => getSingleDriverInSession(driver_number, session_key),
    refetchOnWindowFocus: true,
    initialData: {
      broadcast_name: "",
      country_code: "",
      driver_number: 0,
      first_name: "",
      full_name: "",
      headshot_url: "",
      last_name: "",
      meeting_key: 0,
      name_acronym: "",
      session_key: 0,
      team_colour: "",
      team_name: "",
    },
    enabled: !!driver_number && !!session_key,
  });
};

const getAllDriversInSession = (session_key: number): Promise<IDriver[]> => {
  return fetch(`https://api.openf1.org/v1/drivers?session_key=${session_key}`)
    .then((data) => data.json())
    .then((data: IDriver[]) => data);
};

const getSingleDriverInSession = (
  driver_number: number,
  session_key: number,
): Promise<IDriver> => {
  return fetch(
    `https://api.openf1.org/v1/drivers?driver_number=${driver_number}&session_key=${session_key}`,
  )
    .then((data) => data.json())
    .then((data: IDriver[]) => data[0]);
};
