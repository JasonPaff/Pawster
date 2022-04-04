import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createWalking from '../../../services/walking/createWalking'
import updateWalking from '../../../services/walking/updateWalking'
import getWalking from '../../../services/walking/getWalking'
import getHost from '../../../services/host/getHost'
import updateHost from '../../../services/host/updateHost'

// TODO: 


function CreateWalking() {
  
  const navigate = useNavigate()

  const [walking, setWalking] = useState({})
  const [updateWalk, setUpdateWalk] = useState({})
  const [host, setHost] = useState({})

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
    getWalking().then((result) => {setUpdateWalk(result.data.getWalking.walking)})
  },[])


  const handleFloatChange = (e) => {
    setWalking({
      ...walking,
      [e.target.name]: parseFloat(e.target.value),
    })
    setHost({
      ...host,
      doesDogWalking: true
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateWalk({
      ...updateWalk,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  async function handleUpdateHost() {
    const response = await updateHost(host)
    console.log(response)
    if (response.data.updateHost.success) {
        console.log("Host Updated")
    } else {
        alert(response.data.updateHost.message);
    }
  }

  async function handleCreateWalking() {
    const response = await createWalking(walking);
    if (response.data.createWalking.success) {
      window.location.reload()
    } else {
        alert(response.data.createWalking.message);
    }
  }

  async function handleUpdateWalk() {
    const response = await updateWalking(updateWalk);
    if (response.data.updateWalking.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateWalking.message);
    }
  }

  

  return (
    <div className="flex justify-around">
      {
        !updateWalk ?
        <div>
          <div>Additional Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
          <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={() => {handleCreateWalking(); handleUpdateHost()}}>Save</button>
        </div>
        :
        <div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateWalk.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateWalk.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateWalk.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" defaultValue={updateWalk.puppyRate} name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={handleUpdateWalk}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateWalking;