import { PlatformTest } from "@tsed/common";
import { expect } from "chai";
import { UserService } from "./user.service";

describe("UserService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  describe("without IOC", () => {
    it("should do something", () => {
      expect(new UserService()).to.be.an.instanceof(UserService);
    });
  });

  describe("with inject()", () => {
    it(
      "should get the service from the inject method",
      PlatformTest.inject([UserService], (userService: UserService) => {
        expect(userService).to.be.an.instanceof(UserService);
      })
    );
  });

  describe("via PlatformTest to mock other service", function () {
    it("should create a new user", async function () {
      const userService = await PlatformTest.get<UserService>(UserService);

      let result = await userService.create("alifaruk.km01@gmail.com", "deneme1", "alifarukm");

      expect(result.success).to.be.true;
    });
  });
});
