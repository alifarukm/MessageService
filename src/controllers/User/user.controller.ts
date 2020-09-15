import { BodyParams, Controller, Description, PathParams, Post, Put, Req, Required } from "@tsed/common";
import { Summary } from "@tsed/swagger";
import { CustomAuth } from "../../middlewares/CustomAuth";
import { IAuthRequest } from "../../protocols/request";
import { UserService } from "../../services/User/user.service";
import { BlockUserRequest } from "./user.model";

@Controller("/user")
export class UserController {
  constructor(private user: UserService) {}

  @Summary("Block another user for not get any message any more.")
  @Post("/block")
  @CustomAuth()
  async block(@Req() req: IAuthRequest, @Description("User email to be blocked.") @Required() @BodyParams("user") user: BlockUserRequest) {
    await this.user.block(await req.user?._id, user.email);
  }

  @Summary("Get all users.")
  @Post("/")
  async getAll() {
    return await this.user.find({});
  }
}
