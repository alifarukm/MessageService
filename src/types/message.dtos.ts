export interface sendMessageDTO {
  participants: string[];
  message: string;
  from: string;
  roomId?: string;
}
