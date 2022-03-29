import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getUserById from '../../services/user/getUserById'
import getHostById from '../../services/host/getHostById'

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
    <div className="flex justify-around">
        <div>{user.firstName}'s Host Profile</div>
    </div>
  );
}

export default HostProfile;