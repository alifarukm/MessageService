import { Description, Email, Enum, Format, Required } from "@tsed/common";
import { Model, ObjectID, Ref, Unique } from "@tsed/mongoose";
import { LogTypes } from "../../types/enums/logTypes";
import { User } from "../User/user.model";

@Model()
export class Log {
  @ObjectID("id")
  _id: string;

  @Enum(LogTypes)
  type: LogTypes;

  @ObjectID("userId")
  userId?: string;

  info: string;

  error: any;

  @Format("date-time")
  @Description("Creation's date")
  createdDate: Date = new Date();
}
