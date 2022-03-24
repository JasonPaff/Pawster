import React, { useEffect, useState } from 'react'
import getAddress from '../../services/address/getAddress';

const fetchedEmail = localStorage.getItem("email")

function ClientAddress() {

    const [address, setAddress] = useState('')

    useEffect(() => {
        getAddress(fetchedEmail).then((result) =>{
            console.log(result.data.getAddress)
        })
    }, [])
  

  return (
    <div className="flex-col justify-center">
        <h1>display saved addresses</h1>
    </div>
  );
}

export default ClientAddress;