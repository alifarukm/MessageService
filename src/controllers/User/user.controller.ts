import { BodyParams, Controller, Description, PathParams, Post, Put, Req, Required } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { Summary } from "@tsed/swagger";
import { IAuthRequest } from "../../protocols/request";
import { UserService } from "../../services/User/user.service";
import { BlockUserRequest } from "./user.model";

@Controller("/user")
export class UserController {
  constructor(private user: UserService) {}

  @Summary("Block another user for not get any message any more.")
  @Post("/block")
  @Authorize("jwt")
  async block(@Req() req: IAuthRequest, @Description("User email to be blocked.") @Required() @BodyParams("user") user: BlockUserRequest) {
    await this.user.block(await req.user?._id, user.email);
  }
}
