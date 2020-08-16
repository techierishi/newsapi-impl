import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import "./App.css";

import Login from "./components/Login/Login";

export default function App(props) {
  return (
    <div>
      <Login />
    </div>
  );
}
