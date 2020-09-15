import { BodyParams, Controller, Description, Get, PathParams, Post, Put, Req, Required } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { Summary } from "@tsed/swagger";
import { CustomAuth } from "../../middlewares/CustomAuth";
import { IAuthRequest } from "../../protocols/request";
import { MessageService } from "../../services/Message/message.service";
import { sendMessageRequest } from "./message.model";

@Controller("/message")
export class MessageController {
  constructor(private message: MessageService) {}

  @Summary("Send message to another user.")
  @Post("/send")
  @CustomAuth()
  async send(
    @Req() req: IAuthRequest,
    @Description("User email to be blocked.") @Required() @BodyParams("message") message: sendMessageRequest
  ) {
    return await this.message.send({
      from: await req.user?._id.toString(),
      message: message.message,
      participants: message.participants,
      roomId: message.roomId,
    });
  }

  @Summary("Get rooms list and last message from rooms.")
  @Get("/list")
  @CustomAuth()
  async list(@Req() req: IAuthRequest) {
    return await this.message.getAllMessages(await req.user?._id);
  }

  @Summary("Get all messages from room.")
  @Get("/detail/:id")
  @CustomAuth()
  async detail(@Req() req: IAuthRequest, @Description("Room id.") @Required() @PathParams("id") id: string) {
    return await this.message.getConversation(id);
  }
}
