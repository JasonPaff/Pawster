import React, { useEffect, useState } from 'react'
import ClientInfo from '../../components/ClientProfile/ClientInfo';
import { NavLink } from 'react-router-dom';
import DisplayPets from '../../components/ClientProfile/DisplayPets';
import getHost from '../../services/host/getHost'


function ClientProfile() {

  const [host, setHost] = useState({})
  const userId = localStorage.getItem("id")

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
  },[])
  

  return (
    <div className="grid grid-cols-3 gap-4 grid-rows-4 p-12">
      <div className="border p-5 row-span-1">Account Info
        <div className="text-sky-400"><NavLink to="/profile/account-info">Update</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/register-host">Become a Host</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/messages">Messages</NavLink></div>
      </div>

      <div className="col-span-2 border p-5 row-span-2">
        <div>Current Bookings + Communication</div>
      </div>

      <div className="border p-5 row-span-3">Host Actions
        <div className="text-sky-400"><NavLink to="/profile/edit-boarding">Edit Boarding Info</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/edit-sitting">Edit Home Sitting Info</NavLink></div>
        {host.doesDropInVisits==true ? <div className="text-sky-400"><NavLink to="/profile/edit-visit">Edit Drop-in Visit Info</NavLink></div> : <div className="text-sky-400"><NavLink to="/profile/edit-visit">Add Drop-in Visit Info</NavLink></div>}
        <div className="text-sky-400"><NavLink to="/profile/edit-daycare">Edit Day Care Info</NavLink></div>
        <div className="text-sky-400"><NavLink to="/profile/edit-walking">Edit Dog Walking Info</NavLink></div>
        <div className="text-sky-400"><NavLink to={`/profile/host/${userId}`}>View your Host Profile</NavLink></div>
        <div>Services Active
          {/* <DisplayServices /> */}
        </div>
      </div>


      <div className="col-span-2 border p-5 row-span-2">Pets
        <DisplayPets />
        <div className="text-sky-400"><NavLink to="/profile/add-pet">Add Pet</NavLink></div>
      </div>

    </div>
  );
}

export default ClientProfile;