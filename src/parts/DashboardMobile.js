import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DisplayPets from "../components/ClientProfile/DisplayPets";
import getHost from "../services/host/getHost";
import getUserById from "../services/user/getUserById";
import HostActions from "./HostActions";
import { slide as Menu } from "react-burger-menu";
import "../styles/burgerMenu.css";

export default function Dashboard() {
  const [host, setHost] = useState({});
  const [user, setUser] = useState({});
  const [menuOpenState, setMenuOpenState] = useState(false);

  const userId = localStorage.getItem("id");

  const header = "";
  const cardInfo = "";
  const infoItem = "";

  function closeMenu() {
    setMenuOpenState(false);
    console.log(menuOpenState);
  }

  useEffect(() => {
    getUserById(userId).then((result) => {
      setUser(result.data.getUserById.user);
    });
    getHost().then((result) => {
      setHost(result.data.getHost.host);
    });
  }, []);

  return (
    <div className="relative bg-background-darker">
      <Menu right isOpen={menuOpenState} customBurgerIcon={<p className=" py-1 px-5">Menu</p>}>
        <div className="">
          <ul className={cardInfo}>
            <li className={infoItem} onClick={closeMenu}>
              <NavLink to="/profile/">Account Info</NavLink>
            </li>
            <li className={infoItem}>
              <NavLink to="/profile/edit-profile">Edit Profile</NavLink>
            </li>

            {user.isHost ? (
              <li className={infoItem}>
                <NavLink to="/profile/edit-host">Edit Host Info</NavLink>
              </li>
            ) : null}

            <li className={infoItem}>
              <NavLink to="/profile/messages">Messages</NavLink>
            </li>
          </ul>
        </div>

        <div className="">
          <ul className={cardInfo}>
            <DisplayPets />
            <NavLink to="/profile/add-pet">
              <button className=" text-center mt-4 p-0 border-slate-200 w-full text-slate-500">Add a Pet </button>
            </NavLink>
          </ul>
        </div>

        <div className="">
          <ul className={cardInfo}>
            {user.isHost ? (
              <HostActions />
            ) : (
              <li className={infoItem}>
                <NavLink to="/profile/edit-host">Become a host</NavLink>
              </li>
            )}
          </ul>
        </div>
      </Menu>
      {/*  */}
    </div>
  );
}
