import { UserInfo } from "@tsed/passport";

export class Auth extends UserInfo {
  token: string;
  constructor(props: any) {
    super();

    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.token = props.token;
  }
}

export interface IUser {
  _id: string;
  email: string;
  userName: string;
  dateCreate: Date;
  dateUpdate: Date;
}

export interface IUserRegisterDTO {
  email: string;
  password: string;
}
