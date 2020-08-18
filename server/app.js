const Axios = require("axios");
const { Config } = require("./config");
const { Utils } = require("./utils");
const jwt = require("jsonwebtoken");
const { Controller } = require("./controller");

module.exports = function (app) {
  // Low DB Configs
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");

  const adapter = new FileSync(Config.DB_NAME);
  const db = low(adapter);

  // Middlewares
  
  // REST API's
  app.post(Config.ROUTE.LOGIN, Controller.loginMiddleware, function (req, res) {
    Controller.login(req, res, db);
  });

  app.get(Config.ROUTE.NEWS, Controller.tokenCheckMiddleware, function (req, res) {
    Controller.news(req, res);
  });

  Utils.createDefaultUser(db);
};
