import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getUserById from '../../services/user/getUserById'
import getHostById from '../../services/host/getHostById'

function HostProfile() {

  const params = useParams()

  console.log(params.userId)
  
  const [host, setHost] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserById(params.userId).then((result) => {console.log(result)})
    getHostById(params.userId).then((result) => {console.log(result)})
  },[])

  return (
    <div className="flex justify-around">
        
    </div>
  );
}

export default HostProfile;