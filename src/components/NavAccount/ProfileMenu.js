import React from "react";
import { NavLink } from "react-router-dom";

export default function Account() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const fullName = firstName + " " + lastName;
  const user = fullName || "Anonymous";

  return (
    <div className="flex flex-row">
      <div className="relative flex flex-row gap-2 ">
        <NavLink to="/profile" className="link">
          {user}
        </NavLink>
        <span>|</span>
        <NavLink to="/logout" className="link">
          Logout
        </NavLink>
      </div>
    </div>
  );
}
