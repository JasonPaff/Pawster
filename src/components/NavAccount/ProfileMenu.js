import React from "react";
import { NavLink } from 'react-router-dom'

export default function Account() {
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  const fullName = firstName + " " + lastName
  const user = fullName || "Anonymous";

  return <div><NavLink to="/profile">{user}</NavLink></div>;
}
