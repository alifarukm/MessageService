import { Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject, Inject } from "@tsed/common";
import { Exception } from "@tsed/exceptions";
import { LogService } from "../services/Logging/log.service";
import { LogTypes } from "../types/enums/logTypes";

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilterMethods {
  @Inject()
  logService: LogService;

  async catch(exception: Exception, ctx: PlatformContext) {
    const { response, logger } = ctx;
    const error = await this.mapError(exception);
    const headers = this.getHeaders(exception);
    logger.error({
      error,
    });

    response.setHeaders(headers).status(error.status).body(error);
  }

  async mapError(error: any) {
    await this.logService.create({
      info: error.origin?.name || error.name,
      type: LogTypes.error,
      error: this.getErrors(error),
    });
    return {
      name: error.origin?.name || error.name,
      message: error.message,
      status: error.status || 500,
      errors: this.getErrors(error),
    };
  }

  protected getErrors(error: any) {
    return [error, error.origin].filter(Boolean).reduce((errs, { errors }: ResponseErrorObject) => {
      return [...errs, ...(errors || [])];
    }, []);
  }

  protected getHeaders(error: any) {
    return [error, error.origin].filter(Boolean).reduce((obj, { headers }: ResponseErrorObject) => {
      return {
        ...obj,
        ...(headers || {}),
      };
    }, {});
  }
}
