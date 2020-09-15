import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { startSession } from "mongoose";
import { Room } from "../../repository/Message/room.model";
import { User } from "../../repository/User/user.model";
import { sendMessageDTO } from "../../types/message.dtos";
import { BCryptService } from "../Bcrypt/bcrypt.service";

@Service()
export class MessageService {
  constructor(
    @Inject(Room)
    private Room: MongooseModel<Room>,
    @Inject(User)
    private User: MongooseModel<User>
  ) {}

  // TODO Will implementing socket.

  /**
   * Send message to room.
   * @param id
   * @returns {undefined|IUser}
   */
  async send(message: sendMessageDTO): Promise<any> {
    const session = await startSession();
    try {
      session.startTransaction();
      let room;
      let result;
      /*Check room is available*/
      if (message.roomId) {
        room = await this.Room.findById(message.roomId).session(session);
        if (room) {
          result = await this.Room.findByIdAndUpdate(
            message.roomId,
            {
              $push: {
                messages: {
                  date: new Date(),
                  from: message.from,
                  message: message.message,
                },
              },
            },
            { new: true }
          ).session(session);
        }
      } else {
        /*If not create room*/
        let users = await this.User.find({
          userName: { $in: message.participants },
        }).session(session);
        // TODO Check user's valid
        room = await this.Room.create(
          {
            participants: users,
            dateCreate: new Date(),
            dateUpdate: new Date(),
          },
          { session: session }
        );

        result = await this.Room.findByIdAndUpdate(
          room._id,
          {
            $push: {
              messages: {
                from: message.from,
                date: new Date(),
                message: message.message,
              },
            },
          },
          { new: true }
        ).session(session);
      }

      await session.commitTransaction();
      session.endSession();
      return { success: true, data: result };
    } catch (err) {
      await session.abortTransaction();

      session.endSession();

      return { success: false, data: err };
    }
  }

  /**
   * Find rooms by user id where the user inside.
   * @param id
   * @returns {undefined|IUser}
   */
  async getAllMessages(id: string) {
    try {
      let user = await this.User.findById(id);
      if (user) {
        let rooms = await this.Room.aggregate([
          {
            $in: {
              participants: user._id,
            },
          },
          {
            $project: {
              messages: {
                $slice: ["$messages", -1],
              },
            },
          },
        ]);
        return { success: true, data: rooms };
      } else {
        return { success: false, data: null };
      }
    } catch (err) {
      return { success: false, data: err };
    }
  }

  /**
   * Get conversation by room id
   * @param id
   * @returns {undefined|IUser}
   */
  async getConversation(id: string) {
    try {
      let room = await this.Room.findById(id);
      return { success: true, data: room };
    } catch (err) {
      return { success: false, data: err };
    }
  }
}
