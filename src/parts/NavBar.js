import { NavLink } from "react-router-dom";
import "../styles/tailwind.output.css";

function NavBar() {
  return (
    <div class="flex justify-between">
      <div><h1>Logo goes here</h1></div>

      <div>Something Goes Here</div>

      <div class="flex">
        <div><NavLink to="/login">Login</NavLink></div>
        <div><NavLink to="/logout">Logout</NavLink></div>           
      </div>
    </div>
  );
}

export default NavBar;