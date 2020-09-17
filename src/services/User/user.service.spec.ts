import { PlatformTest } from "@tsed/common";
import { expect } from "chai";
import { IUser } from "../../types/user.dtos";
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
    this.timeout(5000);
    it("should create a new user", async function () {
      const userService = await PlatformTest.get<UserService>(UserService);

      let result = await userService.create("alifaruk.km01@gmail.com", "deneme1", "alifarukm");

      expect(result.email).to.be.equal("alifaruk.km01@gmail.com");
    });

    it("should create a new user for block", async function () {
      const userService = await PlatformTest.get<UserService>(UserService);

      let result = await userService.create("no-reply-@gmail.com", "deneme1", "alifarukBlock");

      expect(result.email).to.be.equal("alifaruk.km01@gmail.com");
    });

    it("should not create a new user same email", async function () {
      const userService = await PlatformTest.get<UserService>(UserService);

      let result = await userService.create("alifaruk.km01@gmail.com", "deneme1", "alifarukm");
      console.log(result);
      expect(result.email).to.be.equal("alifaruk.km01@gmail.com");
    });

    // it("should find user by email", async function () {
    //   const userService = await PlatformTest.get<UserService>(UserService);

    //   let result = await userService.create("no-reply-@gmail.com", "deneme1", "alifarukBlock");

    //   expect(result.email).to.be.equal("alifaruk.km01@gmail.com");
    // });

    // it("should block a user", async function () {
    //   const userService = await PlatformTest.get<UserService>(UserService);
    //   const user = await userService.
    //   let result = await userService.create("alifaruk.km01@gmail.com", "deneme1", "alifarukm");

    //   expect(result.email).to.be.equal("alifaruk.km01@gmail.com");
    // });
  });
});
