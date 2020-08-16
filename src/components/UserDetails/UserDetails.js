import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, Button } from "shards-react";
import "./UserDetails.css";
import Util from "../../Util";

const UserDetails = (props) => (
  <Card small className="mb-4 pt-3 user-card">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={props.avatar}
          alt={props.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{props.name}</h4>

      <Button
        pill
        theme="light"
        onClick={() => {
          sessionStorage.removeItem("jwt");
          window.location.href = window.location.origin;
        }}
      >
        Log Out
      </Button>
    </CardHeader>
  </Card>
);

UserDetails.propTypes = {
  userDetails: PropTypes.object,
};

UserDetails.defaultProps = {
    name:  Util.is(()=> Util.parseJwt(sessionStorage.getItem('jwt')), ''),
    avatar: require("../../assets/user-image.png")
};

export default UserDetails;
