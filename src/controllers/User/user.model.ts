import { Description, Email, Property, Required } from "@tsed/common";

export class BlockUserRequest {
  @Email()
  @Required()
  @Description("User email to be blocked.")
  @Property()
  email: string;
}
