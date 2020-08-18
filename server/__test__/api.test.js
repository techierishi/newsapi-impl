const httpMocks = require("node-mocks-http");
const { Config } = require("../config");
const { Controller } = require("../controller");

describe("API Tests", () => {
  let response = null;
  let db = null;

  beforeAll(() => {
    // Low DB Configs
    const low = require("lowdb");
    const FileSync = require("lowdb/adapters/FileSync");
    const adapter = new FileSync(Config.DB_NAME);
    db = low(adapter);
  });

  beforeEach(() => {
    response = httpMocks.createResponse();
  });

  test("Login API: Success login", () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: Config.ROUTE.LOGIN,
      body: {
        username: "conde-nast",
        password: "C0ndeNas1",
      },
    });

    Controller.login(request, response, db);
    expect(response._isJSON()).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  test("Login API: Failed login", () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: Config.ROUTE.LOGIN,
      body: {
        username: "conde-nast",
        password: "C0ndeNas1234",
      },
    });

    Controller.login(request, response, db);
    expect(response._isJSON()).toBeTruthy();
    expect(response.statusCode).toBe(401);
  });

  test("Login API: Validation", () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: Config.ROUTE.LOGIN,
      body: {
        username: "test",
        password: "",
      },
    });

    Controller.loginMiddleware(request, response, () => {});
    expect(response._isJSON()).toBeTruthy();
    expect(response.statusCode).toBe(422);
  });
});
