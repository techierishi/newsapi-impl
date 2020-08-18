const Axios = require("axios");
const { Config } = require("./config");
const { Utils } = require("./utils");
const jwt = require("jsonwebtoken");

const Controller = {};

Controller.loginMiddleware = function (req, res, next) {
  const username = Utils.is(() => req.body.username, null);
  const password = Utils.is(() => req.body.password, null);

  if (username && password) {
    next();
  } else {
    res.status(422).json(Utils.error("Please enter both username & password"));
  }
};

Controller.tokenCheckMiddleware = function (req, res, next) {
  const token = req.headers[Config.TOKEN_HEADER];
  try {
    jwt.verify(token, Config.JWT_TOKEN);
    next();
  } catch (err) {
    res.status(401).json(Utils.error("Unauthorized access!"));
  }
};

Controller.login = function (req, res, db) {
  const username = req.body.username;
  const password = Utils.encrypt(req.body.password);

  let users = db
    .get("users")
    .find({ username: username, password: password })
    .value();

  if (users) {
    const token = jwt.sign({ username }, Config.JWT_TOKEN);
    res.status(200).json(Utils.success({ token }, "Log in successfull"));
  } else {
    res.status(401).json(Utils.error("Invalid credentials"));
  }
};

Controller.news = function (req, res) {
  const searchKey = Utils.is(() => req.query.search, "");
  const addSearch = searchKey ? `&q=${searchKey}` : "";
  const finalURL = `${Config.NEWS_API_URL}${addSearch}&apiKey=${Config.API_KEY}`;
  console.log("finalURL", finalURL);
  Axios.get(finalURL)
    .then((response) => {
      console.log('app.get("/news").response', response);
      if (Utils.is(() => response.data.status, "") === "ok") {
        res.status(200).json(Utils.success(response.data));
      } else {
        res.status(500).json(Utils.success(response.data));
      }
    })
    .catch((error) => {
      console.log('app.get("/news").error', error);
      res.status(500).json(Utils.error(error.message));
    });
};

module.exports.Controller = Controller;
