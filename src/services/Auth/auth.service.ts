import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../../repository/User/user.model";
import { Auth, IUserRegisterDTO } from "../../types/user.dtos";
import { BCryptService } from "../Bcrypt/bcrypt.service";
import { NotFound } from "@tsed/exceptions";

@Service()
export class AuthService {
  @Inject(User)
  private User: MongooseModel<User>;

  async findByCredential(email: string, password: string) {
    const user: User | null = await this.User.findOne({ email: email });
    if (user && (await BCryptService.compare(password, user?.password))) {
      return {
        id: user?._id,
        email: user?.email,
        password: user?.password,
      } as Auth;
    }
  }

  async verifyPassword(user: Auth, password: string): Promise<boolean> {
    return await BCryptService.compare(user.password, password);
  }
}
