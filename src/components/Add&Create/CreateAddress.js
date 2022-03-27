import React, { useEffect, useState } from 'react'
import createAddress from '../../services/address/createAddress'
import updateAddress from '../../services/address/updateAddress'
import getAddress from '../../services/address/getAddress'
import { useNavigate } from 'react-router-dom'

function CreateAddress() {
  
  const navigate = useNavigate()
  
  const [address, setAddress] = useState({})
  const [addCheck, setAddCheck] = useState({})


  useEffect(() => {
    getAddress().then((result) =>{
        setAddCheck(result.data.getAddress.address)
    })
  }, [])

  const handleTextChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,

    })
  }
  const handleUpdateTextChange = (e) => {
    setAddCheck({
      ...addCheck,
      [e.target.name]: e.target.value,

    })
  }
  const handleZipcodeChange = (e) => {
    setAddress({
      ...address,
      "zipcode": parseInt(e.target.value)
    })
  }
  const handleUpdateZipcodeChange = (e) => {
    setAddCheck({
      ...addCheck,
      "zipcode": parseInt(e.target.value)
    })
  }

  async function handleCreateAddress() {
    console.log(address)
    const response = await createAddress(address);

    if (response.data.createAddress.success) {
        window.location.reload()
    } else {
        alert(response.data.createAddress.message);
    }
  }

  async function handleUpdateAddress() {
    const response = await updateAddress(addCheck);
    console.log(response)

    if (response.data.updateAddress.success) {
        navigate('/profile');
    } else {
        alert(response.data.updateAddress.message);
    }
  }

  // TODO: Clear Input field after submitting address
  // addCheck - Checks if user already has an existing address
  // Exisiting address will display update Address fields
  // If not, add address fields will display
  return (
    <div className="flex-col justify-center">
      {
        !addCheck ? 
        <div>Add Address
          <div><input type="text" placeholder="Street" name="street" onChange={handleTextChange} /></div>
          <div><input type="text" placeholder="City" name="city" onChange={handleTextChange} /></div>
          <div><input type="text" placeholder="State" name="state" onChange={handleTextChange} /></div>
          <div><input type="text" placeholder="Zipcode" name="zipcode" onChange={handleZipcodeChange} /></div>
          <button onClick={handleCreateAddress}>Save</button>
        </div>
        : 
        <div>Update Address
          <div><input type="text" defaultValue={addCheck.street} name="street" onChange={handleUpdateTextChange} /></div>
          <div><input type="text" defaultValue={addCheck.city} name="city" onChange={handleUpdateTextChange} /></div>
          <div><input type="text" defaultValue={addCheck.state} name="state" onChange={handleUpdateTextChange} /></div>
          <div><input type="text" defaultValue={addCheck.zipcode} name="zipcode" onChange={handleUpdateZipcodeChange} /></div>
          <button onClick={handleUpdateAddress}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateAddress;