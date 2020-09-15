import { Allow, CollectionOf, Required } from "@tsed/common";

export class sendMessageRequest {
  @CollectionOf(String)
  @Required()
  participants: string[];
  @Required()
  message: string;

  @Allow(null)
  roomId?: string;
}
