import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import getHost from "../services/host/getHost";

function HostActions() {

    const [host, setHost] = useState({});
    const infoItem = "border-b hover:border-b-slate-300 py-1";
    const userId = localStorage.getItem("id");

    useEffect(() => {
        getHost().then((result) => {setHost(result.data.getHost.host);});
      }, []);

    return (
        <div>
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
        </div>
    )

}

export default HostActions