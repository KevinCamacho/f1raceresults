import { IDriver } from "./IDriver";

export interface IDriverPosition extends IDriver {
  starting_position: number;
  finishing_position: number;
}
