import { Description, Format, Property } from "@tsed/common";
import { Ref, Schema } from "@tsed/mongoose";
import { User } from "../User/user.model";

@Schema()
export class Message {
  @Description("Who send message.")
  @Ref(User)
  from: Ref<User>;

  @Property()
  @Description("Message body.")
  message: String;

  @Property()
  @Description("Sended date.")
  @Format("date-time")
  date: Date = new Date();
}
