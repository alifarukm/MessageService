import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { Types } from "mongoose";

import { Room } from "../../repository/Message/room.model";
import { User } from "../../repository/User/user.model";
import { sendMessageDTO } from "../../types/message.dtos";

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
    try {
      let room;
      let result;
      const sendUsers = message.participants;
      let user = await this.User.findById(message.from);

      if (user) {
        message.participants.push(user.userName);
      } else {
        return { success: false, data: new BadRequest("Users not found.") };
      }
      // If client comes from roomId get room and push message.
      if (message.roomId && Types.ObjectId.isValid(message.roomId)) {
        room = await this.Room.findById(message.roomId);

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
          );
        }
      } else {
        /*If not create room*/
        let users = await this.User.find({
          userName: { $in: message.participants },
        });
        if (users.length === message.participants.length) {
          room = await this.Room.findOne({
            participants: {
              $eq: users.map((item) => {
                return item._id;
              }),
            },
          });
          if (room) {
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
            );
          } else {
            let anyBlock = await this.User.find({
              userName: { $in: sendUsers },
            });

            anyBlock.map((usr) => {
              if (usr.blocks.includes(user?._id)) {
                return { success: false, data: new BadRequest("A user or many blocked you.") };
              }
            });

            room = await this.Room.create({
              participants: users,
              dateCreate: new Date(),
              dateUpdate: new Date(),
            });

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
            );
          }
        }
      }
      return { success: true, data: result };
    } catch (err) {
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
        console.log(id);

        let rooms = await this.Room.aggregate()
          .match({
            participants: {
              $in: [user._id, "$participants"],
            },
          })
          .lookup({
            from: "users",
            localField: "messages.from",
            foreignField: "_id",
            as: "details",
          })
          .project({
            participants: "$details.userName",
            lastMessage: {
              $slice: ["$messages", -1],
            },
          })
          .unwind("$lastMessage");

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
      let room = await this.Room.aggregate()
        .match({ _id: Types.ObjectId(id) })
        .lookup({ from: "users", localField: "messages.from", foreignField: "_id", as: "details" })
        .project({
          participants: "$details.userName",
          messages: "$messages",
        });
      return { success: true, data: room };
    } catch (err) {
      return { success: false, data: err };
    }
  }
}
