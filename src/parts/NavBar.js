import { NavLink } from "react-router-dom";
import "../styles/tailwind.output.css";

function NavBar() {
  return (
    <div className="flex justify-center">
      <h1>Nav Bar</h1>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  );
}

export default NavBar;