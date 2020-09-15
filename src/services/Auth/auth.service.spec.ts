import { PlatformTest } from "@tsed/common";
import { expect } from "chai";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  describe("without IOC", () => {
    it("should do something", () => {
      expect(new AuthService()).to.be.an.instanceof(AuthService);
    });
  });

  describe("with inject()", () => {
    it(
      "should get the service from the inject method",
      PlatformTest.inject([AuthService], (authService: AuthService) => {
        expect(authService).to.be.an.instanceof(AuthService);
      })
    );
  });

  describe("via PlatformTest to mock other service", function () {
    this.timeout(3000);
    it("should get the service from InjectorService", async function () {
      const authService = await PlatformTest.get<AuthService>(AuthService);

      expect(true).to.be.true;
    });
  });
});
