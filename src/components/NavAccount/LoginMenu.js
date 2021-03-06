import React from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-row">
      <div className="relative flex flex-row gap-2 mr-3 ">
        <NavLink to="/login" className="link">
          Login
        </NavLink>
        <span>|</span>
        <NavLink to="/register" className="link">
          Register
        </NavLink>
      </div>
    </div>
  );
}
