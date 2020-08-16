import React from "react";
import { Row, Col } from "shards-react";

import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Row>
          <Col >
             <p>News</p>
          </Col>
        </Row>
      </header>
    );
  }
}
