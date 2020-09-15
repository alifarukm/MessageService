import { Description, Email, Property, Required } from "@tsed/common";

export class UserRegisterRequest {
  @Email()
  @Required()
  @Description("User email.")
  @Property()
  email: string;

  @Required()
  @Description("User username.")
  @Property()
  username: string;

  @Required()
  @Property()
  @Description("User email.")
  password: string;
}

export class UserLoginRequest {
  @Email()
  @Required()
  @Description("User email.")
  @Property()
  email: string;

  @Required()
  @Property()
  @Description("User password.")
  password: string;
}
