import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionCreators from "../../store/action_creators/actionCreators";

function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // remove the login data from local storage
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("lastName")
    localStorage.removeItem("firstName")
    props.onLogout();
    
    navigate("/");
  });

  return <h1>Log Out</h1>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
