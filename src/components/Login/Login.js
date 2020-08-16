import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  Card,
  Button,
  Container,
} from "shards-react";
import { withRouter } from "react-router-dom";
import Util from "../../Util";
import "./Login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    var baseUrl = Util.baseURL();
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: Util.httpHeader(),
      body: JSON.stringify({ username, password }),
    }).then(function (response) {
      return response.json();
    })
    .then(
      (response) => {
        const token = Util.is(() => response.data.token, null);
        if (response.status && token) {
          sessionStorage.setItem("jwt", token);
          props.history.push("/articles");
        }
      }
    ).catch((error) => {
      console.log("Login.login.catch", error);
    });
  };
  return (
    <Container>
      <Row className="mainRow">
        <Col className="mainCol">
          <Card
            style={{ maxWidth: "350px", padding: "15px", margin: " 50px auto" }}
          >
            <Form>
              <FormGroup>
                <label htmlFor="#username">Username</label>
                <FormInput
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter username"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter password"
                />
              </FormGroup>

              <Button onClick={login}>Login</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Login);
