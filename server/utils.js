const { Config } = require("./config");

const Utils = {};

Utils.createDefaultUser = function (db) {
  db.defaults({
    users: [
      {
        username: Config.DEFAULT_USERNAME,
        password: Config.DEFAULT_PASSWORD,
      },
    ]
  }).write();
};

Utils.encrypt = function (dataToEncrypt) {
  return require("crypto")
    .createHash("sha256")
    .update(dataToEncrypt)
    .digest("hex");
};

Utils.is = function (fn, dv) {
  try {
    if (fn()) {
      return fn();
    } else {
      return dv;
    }
  } catch (e) {
    return dv;
  }
};

Utils.success = function (data, message = "") {
  {
    return {
      status: true,
      data,
    };
  }
};

Utils.error = function (message) {
  return {
    status: false,
    message,
    data: null,
  };
};

module.exports.Utils = Utils;
