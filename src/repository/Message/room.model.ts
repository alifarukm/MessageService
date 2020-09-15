import { CollectionOf, Description, Format, Property } from "@tsed/common";
import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { User } from "../User/user.model";
import { Message } from "./message.model";

@Model()
export class Room {
  @ObjectID("id")
  _id: string;

  @Ref(User)
  participants: Ref<User>[];

  @Property()
  @Description("Room messages")
  @CollectionOf(Message)
  messages?: Message[];

  @Format("date-time")
  @Description("Creation's date")
  dateCreate: Date = new Date();

  @Format("date-time")
  @Description("Last modification date")
  dateUpdate: Date = new Date();
}
