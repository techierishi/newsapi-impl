const { Utils } = require("../utils");

describe("Util Tests", () => {
  test("Checkg encrypt function", () => {
    const toEnc = "Password";
    const toExpect =
      "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a";
    expect(Utils.encrypt(toEnc)).toBe(toExpect);
  });

  test("Check is function: positive", () => {
    const nestedObj = {
      foo: {
        bar: "Test",
      },
    };
    const toExpect = "Test";
    expect(Utils.is(() => nestedObj.foo.bar, null)).toBe(toExpect);
  });

  test("Check is function: negative", () => {
    const nestedObj = {
      foo: undefined,
    };
    expect(Utils.is(() => nestedObj.foo.bar, null)).toBe(null);
  });

  test("Success message test", () => {
    const successData = {
      news: "This is a test news",
    };
    const successMessage = "Success message";
    const successObj = {
      status: true,
      message: successMessage,
      data: successData,
    };
    expect(Utils.success(successData, successMessage)).toStrictEqual(successObj);
  });

  test("Error message test", () => {
    const errMessage = "Error message";
    const errObj = {
      status: false,
      message: errMessage,
      data: null,
    };
    expect(Utils.error(errMessage)).toStrictEqual(errObj);
  });
});
