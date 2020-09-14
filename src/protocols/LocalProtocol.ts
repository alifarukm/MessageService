import { BodyParams, Constant, Inject } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { AuthService } from "../services/Auth/auth.service";
import { Auth } from "../types/user.dtos";

@Protocol<IStrategyOptions>({
  name: "local",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class LocalProtocol implements OnVerify {
  @Inject()
  authService: AuthService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: never;

  async $onVerify(@BodyParams() credentials: never) {
    const { email, password } = credentials;

    const user = await this.authService.findByCredential(email, password);
    if (!user) {
      throw new Unauthorized("Wrong credentials");
    }
    if (!this.authService.verifyPassword(user, password)) {
      throw new Unauthorized("Wrong credentials");
    }

    const token = this.createJwt(user);

    return token;
  }

  createJwt(user: Auth): any {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.id,
        exp: now + maxAge * 1000,
        iat: now,
      },
      secretOrKey
    );
  }
}
