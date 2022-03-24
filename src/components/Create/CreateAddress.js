import React, { useState } from 'react'
import createAddress from '../../services/address/createAddress'
import { useNavigate } from 'react-router-dom'

const fetchedEmail = localStorage.getItem("email")

function CreateAddress() {
  
  const [address, setAddress] = useState({})

  const navigate = useNavigate()

  const handleTextChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,

    })
  }

  const handleZipcodeChange = (e) => {
    setAddress({
      ...address,
      "zipcode": parseInt(e.target.value)
    })
  }

  async function handleCreateAddress() {
    console.log(fetchedEmail)
    console.log(address)
    const response = await createAddress(fetchedEmail, address);

    if (response.data.createAddress.success) {
        navigate('/profile/account-info');
    } else {
        alert(response.data.createAddress.message);
    }
  }

  // TODO: Clear Input field after submitting address
  return (
    <div className="flex-col justify-center">
      <div><input type="text" placeholder="Street" name="street" onChange={handleTextChange} /></div>
      <div><input type="text" placeholder="City" name="city" onChange={handleTextChange} /></div>
      <div><input type="text" placeholder="State" name="state" onChange={handleTextChange} /></div>
      <div><input type="text" placeholder="Zipcode" name="zipcode" onChange={handleZipcodeChange} /></div>
      <button onClick={handleCreateAddress}>Submit</button>
    </div>
  );
}

export default CreateAddress;