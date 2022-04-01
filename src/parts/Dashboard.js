import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DisplayPets from "../components/ClientProfile/DisplayPets";
import getHost from "../services/host/getHost";
import getUserById from "../services/user/getUserById";
import HostActions from "./HostActions";

export default function Dashboard() {
  const [host, setHost] = useState({});
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("id");

  const header = " bg-background-darker text-center text-sm p-1";
  const cardInfo = "flex flex-col pt-4 pb-8 px-6 text-slate-700 gap-1";
  const infoItem = "border-b hover:border-b-slate-300 py-1";

  useEffect(() => {
    getUserById(userId).then((result) => {
      setUser(result.data.getUserById.user);
    });
    getHost().then((result) => {
      setHost(result.data.getHost.host);
    });
  }, []);

  return (
    <>
      <div className="card p-0">
        <header className={header}>General:</header>
        <ul className={cardInfo}>
          <li className={infoItem}>
            <NavLink to="/profile/">Account Info</NavLink>
          </li>
          <li className={infoItem}>
            <NavLink to="/profile/account-info">Update Info</NavLink>
          </li>

          {user.isHost ?
          <li className={infoItem}>
            <NavLink to="/profile/register-host">Edit Host Info</NavLink>
          </li> 
          : 
          null}

          <li className={infoItem}>
            <NavLink to="/profile/messages">Messages</NavLink>
          </li>
        </ul>
      </div>

      <div className="card p-0">
        <header className={header}> Pets</header>
        <ul className={cardInfo}>
          <DisplayPets />
          <NavLink to="/profile/add-pet">
            <button className=" text-center mt-4 p-0 border-slate-200 w-full text-slate-500">Add a Pet </button>
          </NavLink>
        </ul>
      </div>

      <div className="card p-0">
        <header className={header}>Sitter:</header>
        <ul className={cardInfo}>
          {user.isHost ? <HostActions /> : <NavLink to="/profile/register-host">Become a Host</NavLink>}
        </ul>
      </div>
    </>
  );
}
