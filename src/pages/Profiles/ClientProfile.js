import React, { useEffect, useState } from 'react'
import ClientInfo from '../../components/ClientProfile/ClientInfo';
import { NavLink } from 'react-router-dom';


function ClientProfile() {
  

  return (
    <div className="flex justify-around">
      <div>User Photo</div>
      <div><ClientInfo /></div>
      <div><NavLink to="/profile/account-info">Update Account Info</NavLink></div>
    </div>
  );
}

export default ClientProfile;