import React, { useEffect, useState } from 'react'
import ClientInfo from '../../components/ClientProfile/ClientInfo';
import { NavLink } from 'react-router-dom';
import DisplayPets from '../../components/ClientProfile/DisplayPets';
import DisplayServices from '../../components/ClientProfile/DisplayServices/DisplayServices';
import HostProfile from './HostProfile';


function ClientProfile() {
  

  return (
    <div className="flex justify-around">
      <div>Account Info
        <div className="text-sky-400"><NavLink to="/profile/account-info">Update</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/register-host">Become a Host</NavLink></div>
      </div>

      <div><ClientInfo /></div>

      <div>Host Actions
        <div className="text-sky-400"><NavLink to="/profile/edit-boarding">Add Boarding Info</NavLink></div>
      </div>

      <div>Services
        <DisplayServices />
      </div>

      <div>Pets
        <DisplayPets />
        <div className="text-sky-400"><NavLink to="/profile/add-pet">Add Pet</NavLink></div>
      </div>

    </div>
  );
}

export default ClientProfile;