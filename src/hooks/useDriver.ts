import { useQuery } from "@tanstack/react-query";
import { IDriver } from "../types";
import axios from "axios";

export const useDrivers = (session_key: number) => {
  return useQuery<IDriver[]>({
    queryKey: ["useDrivers", session_key],
    queryFn: () => getAllDriversInSession(session_key),
    refetchOnWindowFocus: false,
    enabled: !!session_key,
  });
};

export const useDriver = (driver_number: number, session_key: number) => {
  return useQuery<IDriver>({
    queryKey: ["useDriver", driver_number, session_key],
    queryFn: () => getSingleDriverInSession(driver_number, session_key),
    refetchOnWindowFocus: false,
    enabled: !!driver_number && !!session_key,
  });
};

const getAllDriversInSession = (session_key: number): Promise<IDriver[]> => {
  return axios
    .get(`https://api.openf1.org/v1/drivers?session_key=${session_key}`)
    .then((response) => {
      const { data }: { data: IDriver[] } = response;
      return data;
    });
};

const getSingleDriverInSession = (
  driver_number: number,
  session_key: number,
): Promise<IDriver> => {
  return axios
    .get(
      `https://api.openf1.org/v1/drivers?driver_number=${driver_number}&session_key=${session_key}`,
    )
    .then((response) => {
      const { data }: { data: IDriver[] } = response;
      return data[0];
    });
};
