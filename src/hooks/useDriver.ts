import { useQuery } from "@tanstack/react-query";
import { IDriver } from "../types";
import {
  getAllDriversInSession,
  getSingleDriverInSession,
} from "../api/driver";

export const useDrivers = (session_key: number) => {
  return useQuery<IDriver[]>({
    queryKey: ["useDrivers", session_key],
    queryFn: () => getAllDriversInSession(session_key),
    enabled: !!session_key,
  });
};

export const useDriver = (driver_number: number, session_key: number) => {
  return useQuery<IDriver>({
    queryKey: ["useDriver", driver_number, session_key],
    queryFn: () => getSingleDriverInSession(driver_number, session_key),
    enabled: !!driver_number && !!session_key,
  });
};
