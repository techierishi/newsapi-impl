import { Const } from "./Const";

const Util = {};

Util.httpHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": Util.is(() => sessionStorage.getItem("jwt"), ""),
  };
};

Util.is = function (fn, dv) {
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

Util.baseURL = function () {
  let baseUrl = "";
  if (process.env.NODE_ENV === "development") {
    return (baseUrl = Const.API_BASE_URL);
  } else {
    return (baseUrl = "");
  }
};

Util.parseJwt = function (token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload)['username'];
};

export default Util;
