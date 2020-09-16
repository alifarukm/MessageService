import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { BadRequest, InternalServerError } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../../repository/User/user.model";

import { BCryptService } from "../Bcrypt/bcrypt.service";
import { Types } from "mongoose";
import { IUser } from "../../types/user.dtos";

@Service()
export class UserService {
  @Inject(User)
  private User: MongooseModel<User>;

  /**
   * Find a user by his ID.
   * @param id
   * @returns {undefined|IUser}
   */
  async create(email: string, password: string, username: string): Promise<IUser> {
    const result = await this.User.create({
      email: email,
      userName: username,
      password: await BCryptService.hash(password),
      dateCreate: new Date(),
      dateUpdate: new Date(),
      blocks: [],
    });
    return {
      _id: result._id,
      email: result.email,
      userName: result.userName,
    } as IUser;
  }

  async block(id: string, email: string): Promise<IUser> {
    const user = await this.User.findOne({ email: email });
    if (user) {
      const result = await this.User.findByIdAndUpdate(id, { $push: { blocks: user._id } }, { new: true });
      return {
        _id: result?._id,
        email: result?.email,
        userName: result?.userName,
        blocks: result?.blocks,
      } as IUser;
    } else {
      throw new BadRequest("User not found.");
    }
  }

  /**
   * Find a user by his ID.
   * @param id
   * @returns {undefined|IUser}
   */
  async findById(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequest("User id not valid.");
    return await this.User.findById(id);
  }

  /**
   * Find a user by property.
   * @param property
   * @returns {undefined|IUser}
   */
  async find(property: any): Promise<any> {
    throw new BadRequest("SDFSDF");
    return await this.User.find(property);
  }

  /**
   * Delete a user by id.
   * @param property
   * @returns {undefined|IUser}
   */

  async delete(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequest("User id not valid.");
    return await this.User.findByIdAndDelete(id);
  }
}
