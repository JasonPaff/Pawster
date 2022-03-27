import React, { useEffect, useState } from 'react'
import getHost from '../../services/host/getHost'

function HostProfile() {
  
  const [hosts, setHosts] = useState([])

  useEffect(() => {
    getHost().then((result) => {console.log(result)})
  },[])

  return (
    <div className="flex justify-around">
        
    </div>
  );
}

export default HostProfile;