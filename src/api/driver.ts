import axios from "axios";
import { IDriver } from "../types";

export const getAllDriversInSession = (
  session_key: number,
): Promise<IDriver[]> => {
  return axios
    .get(`https://api.openf1.org/v1/drivers?session_key=${session_key}`)
    .then((response) => {
      const { data }: { data: IDriver[] } = response;
      return data;
    });
};

export const getSingleDriverInSession = (
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
