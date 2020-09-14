import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express"; // /!\ keep this import
import { GlobalAcceptMimesMiddleware } from "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import mongooseConfig from "./config/mongoose";
import { GlobalErrorHandlerMiddleware } from "./middlewares/GlobalErrorMiddleware";
import { User } from "./repository/User/user.model";
export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json", "multipart/form-data"],
  httpPort: process.env.PORT || 3000,
  httpsPort: false, // CHANGE
  mount: {
    "/": [`${rootDir}/controllers/**/*.ts`],
  },
  swagger: [
    {
      spec: {},
      path: "/docs",
    },
  ],
  exclude: ["**/*.spec.ts"],
  componentsScan: [`${rootDir}/protocols/*Protocol.ts`, `${rootDir}/services/**/**.ts`, `${rootDir}/middlewares/**/**.ts`],
  passport: {
    userInfoModel: User,
  },
  mongoose: mongooseConfig,
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;
  $afterRoutesInit() {
    this.app.use(GlobalErrorHandlerMiddleware);
  }
  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    return null;
  }
}
