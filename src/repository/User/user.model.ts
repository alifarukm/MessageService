import { Description, Email, Format, Required } from "@tsed/common";
import { Model, ObjectID, Unique } from "@tsed/mongoose";

@Model()
export class User {
  @ObjectID("id")
  _id: string;

  @Email()
  @Required()
  @Unique()
  @Description("User's email")
  email: string;

  @Description("User's password")
  password: string;

  @Description("Users id blocked by the user.")
  blocks: string[];

  @Format("date-time")
  @Description("Creation's date")
  dateCreate: Date = new Date();

  @Format("date-time")
  @Description("Last modification date")
  dateUpdate: Date = new Date();
}
