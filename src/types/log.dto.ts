import { LogTypes } from "./enums/logTypes";

export interface ILog {
  type: LogTypes;
  from?: string;
  info: string;
  error?: any;
}
