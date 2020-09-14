import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../services/User/user.service";
import { IUser } from "../types/user.dtos";
import { IAuthRequest } from "./request";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "afkSecretKeyBrom@1",
    issuer: "localhost",
    audience: "localhost",
  },
})
export class JwtProtocol implements OnVerify {
  @Inject()
  userService: UserService;

  async $onVerify(@Req() req: IAuthRequest, @Arg(0) jwtPayload: any): Promise<IUser> {
    const user = await this.userService.findById(jwtPayload.sub);

    if (!user) {
      throw new Unauthorized("Wrong token");
    }
    req.user = user;

    return user;
  }
}
