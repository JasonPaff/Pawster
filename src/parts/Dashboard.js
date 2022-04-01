import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DisplayPets from "../components/ClientProfile/DisplayPets";
import getHost from "../services/host/getHost";
import getUserById from "../services/user/getUserById";

export default function Dashboard() {
  const [host, setHost] = useState({});
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("id");

  const header = " bg-background-darker text-center text-sm p-1";
  const cardInfo = "flex flex-col pt-4 pb-8 px-6 text-slate-700 gap-1";
  const infoItem = "border-b hover:border-b-slate-300 py-1";

  useEffect(() => {
    getUserById(userId).then((result) => {setUser(result.data.getUserById.user)})
    getHost().then((result) => {setHost(result.data.getHost.host);});
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
            <NavLink to="/profile/register-host">Become a Host</NavLink>
          </li> 
          : 
          <li className={infoItem}>Edit Host Info</li>}

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
          {host.doesBoarding ? 
          <li className={infoItem}>
            <NavLink to="/profile/edit-boarding">Edit Boarding Info</NavLink>
          </li>:          
          <li className={infoItem}>
            <NavLink to="/profile/edit-boarding">Add Boarding Info</NavLink>
          </li>}

          {host.doesHouseSitting ?           
          <li className={infoItem}>
            <NavLink to="/profile/edit-sitting">Edit Home Sitting Info</NavLink>
          </li>:          
          <li className={infoItem}>
            <NavLink to="/profile/edit-sitting">Add Home Sitting Info</NavLink>
          </li>}

          {host.doesDropInVisits ?           
          <li className={infoItem}>
            <NavLink to="/profile/edit-visit">Edit Drop-in Visit Info</NavLink>
          </li>:          
          <li className={infoItem}>
            <NavLink to="/profile/edit-visit">Add Drop-in Visit Info</NavLink>
          </li>}
          
          {host.doesDayCare ?           
          <li className={infoItem}>
            <NavLink to="/profile/edit-daycare">Edit Day Care Info</NavLink>
          </li>:          
          <li className={infoItem}>
            <NavLink to="/profile/edit-daycare">Add Day Care Info</NavLink>
          </li>}

          {host.doesDogWalking ?           
          <li className={infoItem}>
            <NavLink to="/profile/edit-walking">Edit Dog Walking Info</NavLink>
          </li>:          
          <li className={infoItem}>
            <NavLink to="/profile/edit-walking">Add Dog Walking Info</NavLink>
          </li>}

          <li className={infoItem}>
            <NavLink to={`/profile/host/${userId}`}>View your Host Profile</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
