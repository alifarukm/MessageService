import { EndpointInfo, IAuthOptions, IMiddleware, Middleware, Req, Returns, UseAuth } from "@tsed/common";
import { useDecorators } from "@tsed/core";
import { Unauthorized } from "@tsed/exceptions";
import { Authorize } from "@tsed/passport";
import { Operation } from "@tsed/swagger";
import { IAuthRequest } from "../protocols/request";

@Middleware()
export class CustomAuthMiddleware implements IMiddleware {
  public use(@Req() request: IAuthRequest, @EndpointInfo() endpoint: EndpointInfo) {
    // retrieve options given to the @UseAuth decorator
    const options = endpoint.get(CustomAuthMiddleware) || {};

    if (!request.isAuthenticated()) {
      // passport.js method to check auth
      throw new Unauthorized("Unauthorized");
    }
  }
}

export interface ICustomAuthOptions extends IAuthOptions {
  role?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function CustomAuth(options: ICustomAuthOptions = {}): Function {
  return useDecorators(
    Authorize("jwt"),
    UseAuth(CustomAuthMiddleware, options),
    Operation({
      parameters: [
        {
          in: "header",
          name: "Authorization",
          type: "string",
          required: true,
        },
      ],
    }),
    Returns(401, { description: "Unauthorized" }),
    Returns(403, { description: "Forbidden" })
  );
}
