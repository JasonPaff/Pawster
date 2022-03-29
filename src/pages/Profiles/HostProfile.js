import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import getUserById from '../../services/user/getUserById'
import getHostById from '../../services/host/getHostById'
import DisplayPets from '../../components/ClientProfile/DisplayPets';
import DisplayServices from '../../components/HostProfile/DisplayServices';


const card = "bg-white border border-slate-200 shadow-sm  rounded-md p-5 ";

function HostProfile() {

  const params = useParams()
  
  const [host, setHost] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserById(params.userId).then((result) => {setUser(result.data.getUserById.user)})
    getHostById(params.userId).then((result) => {setHost(result.data.getHostById.host)})
  },[])

  // const hostInfo = host.map((host) => {
  //   return <li key={host.id}>{}</li>
  // })

  // const userInfo = host.map((userInfo) => {
  //   return <li key={host.id}>{}</li>
  // })


  return (
    <div className="grid row-span-2">
      <div className={`${card} row-span-1`}>
        Account Info
      </div>

      <div className={`${card} row-span-1`}>
        Services
        <DisplayServices hostId={params.userId}/>
      </div>

      <div className={`${card} row-span-2 col-span-2`}>
        Pets
        <DisplayPets />
      </div>
    </div>
  );
}

export default HostProfile;