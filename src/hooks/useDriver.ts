import { useQuery } from "@tanstack/react-query";
import { IDriver } from "../types";

const useDrivers = (session_key: number) => {
  return useQuery<IDriver[]>({
    queryKey: ["useDrivers", session_key],
    queryFn: () => getAllDriversInSession(session_key),
    refetchOnWindowFocus: true,
    initialData: [],
    enabled: !!session_key,
  });
};

const getAllDriversInSession = (session_key: number): Promise<IDriver[]> => {
  return fetch(`https://api.openf1.org/v1/drivers?session_key=${session_key}`)
    .then((data) => data.json())
    .then((data: IDriver[]) => data);
};

export default useDrivers;
