import React, { useEffect, useState } from 'react'
import ClientInfo from '../../components/ClientProfile/ClientInfo';
import { NavLink } from 'react-router-dom';


function ClientProfile() {
  

  return (
    <div className="flex justify-around">
      <div>Account Info
        <div className="text-sky-400"><NavLink to="/profile/account-info">Update</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/register-host">Become a Host</NavLink></div>
      </div>

      <div><ClientInfo /></div>

      <div>Pets
        <div className="text-sky-400"><NavLink to="/profile/add-pet">Add Pet</NavLink></div>
      </div>

    </div>
  );
}

export default ClientProfile;