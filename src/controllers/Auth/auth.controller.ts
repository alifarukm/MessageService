import { BodyParams, Controller, Description, Post, ProviderScope, Req, Required, Scope } from "@tsed/common";
import { BadRequest } from "@tsed/exceptions";
import { Authenticate } from "@tsed/passport";
import { Summary } from "@tsed/swagger";
import { AuthService } from "../../services/Auth/auth.service";
import { UserService } from "../../services/User/user.service";
import { UserLoginRequest, UserRegisterRequest } from "./auth.model";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  constructor(private authService: AuthService, private user: UserService) {}

  @Summary("This endpoint developed for login.")
  @Post("/login")
  @Authenticate("local")
  login(@Req() req: Req, @Description("User's login variables.") @Required() @BodyParams("user") user: UserLoginRequest) {
    return req.user;
  }

  @Summary("This endpoint developed for create new user.")
  @Post("/register")
  async register(@Description("User's register variables.") @Required() @BodyParams("user") user: UserRegisterRequest) {
    await this.user.create(user.email, user.password, user.username);
  }
}
