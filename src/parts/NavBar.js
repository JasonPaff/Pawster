import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex justify-center">
      <h1>Nav Bar</h1>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  );
};