import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../../repository/User/user.model";
import { BCryptService } from "../Bcrypt/bcrypt.service";

@Service()
export class UserService {
  constructor(
    @Inject(User)
    private User: MongooseModel<User>
  ) {}

  /**
   * Find a user by his ID.
   * @param id
   * @returns {undefined|IUser}
   */
  async create(email: string, password: string): Promise<any> {
    return await this.User.create({
      email: email,
      password: await BCryptService.hash(password),
      dateCreate: new Date(),
      dateUpdate: new Date(),
      blocks: [],
    });
  }

  async block(id: string, email: string) {
    const user = await this.User.findOne({ email: email });
    if (user) {
      return await this.User.findByIdAndUpdate(id, { $push: { blocks: user._id } }, { new: true });
    }
  }

  /**
   * Find a user by his ID.
   * @param id
   * @returns {undefined|IUser}
   */
  async findById(id: string): Promise<any> {
    return await this.User.findById(id);
  }

  /**
   * Find a user by property.
   * @param property
   * @returns {undefined|IUser}
   */
  async find(property: any): Promise<any> {
    return await this.User.find(property);
  }

  /**
   * Delete a user by id.
   * @param property
   * @returns {undefined|IUser}
   */

  async delete(id: string): Promise<any> {
    return await this.User.findByIdAndDelete(id);
  }
}
