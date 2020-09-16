import { Inject } from "@tsed/common";
import { Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Log } from "../../repository/Log/log.model";
import { ILog } from "../../types/log.dto";

@Service()
export class LogService {
  @Inject(Log)
  private Log: MongooseModel<Log>;

  /**
   * Simple log service.
   * @param id
   * @returns {undefined|IUser}
   */
  async create(log: ILog): Promise<void> {
    await this.Log.create({
      type: log.type,
      error: log.error,
      info: log.info,
      userId: log.from,
      createdDate: new Date(),
    });
  }
}
