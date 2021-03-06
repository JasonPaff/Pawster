import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createDaycare from '../../../services/daycare/createDaycare'
import updateDaycare from '../../../services/daycare/updateDaycare'
import getDaycare from '../../../services/daycare/getDaycare'
import getHost from '../../../services/host/getHost'
import updateHost from '../../../services/host/updateHost'

// TODO: Cannot read properties of undefined "exists" during save


function CreateDayCare() {
  
  const navigate = useNavigate()

  const [daycare, setDayCare] = useState({})
  const [updateDayCare, setUpdateDayCare] = useState({})
  const [host, setHost] = useState({})

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
    getDaycare().then((result) => {setUpdateDayCare(result.data.getDaycare.daycare)})
  },[])


  const handleFloatChange = (e) => {
    setDayCare({
      ...daycare,
      [e.target.name]: parseFloat(e.target.value),
    })
    setHost({
      ...host,
      doesDayCare: true
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateDayCare({
      ...updateDayCare,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  async function handleCreateDayCare() {
    const response = await createDaycare(daycare);
    console.log(response)
    if (response.data.createDaycare.success) {
      window.location.reload()
    } else {
        alert(response.data.createDaycare.message);
    }
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

  async function handleUpdateDayCare() {
    const response = await updateDaycare(updateDayCare);
    if (response.data.updateDaycare.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateDaycare.message);
    }
  }

  

  return (
    <div className="flex justify-around">
      {
        !updateDayCare ?
        <div>
          <div>Additional Cat Rate<input type="text" placeholder="$0.00" name="additionalCatRate" onChange={handleFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
          <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
          <div>Bathing Cost<input type="text" placeholder="$0.00"name="bathingRate" onChange={handleFloatChange} /></div>
          <div>Cat Rate<input type="text" placeholder="$0.00" name="catRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Pick-up/Drop-off Rate<input type="text" placeholder="$0.00" name="pickUpDropOffRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={() => {handleCreateDayCare(); handleUpdateHost()}}>Save</button>
        </div>
        :
        <div>
          <div>Additional Cat Rate<input type="text" defaultValue={updateDayCare.additionalCatRate} placeholder="$0.00" name="additionalCatRate" onChange={handleUpdateFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateDayCare.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateDayCare.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Bathing Cost<input type="text" defaultValue={updateDayCare.bathingRate} placeholder="$0.00"name="bathingRate" onChange={handleUpdateFloatChange} /></div>
          <div>Cat Rate<input type="text" defaultValue={updateDayCare.catRate} placeholder="$0.00" name="catRate" onChange={handleUpdateFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateDayCare.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Pick-up/Drop-off Rate<input type="text" defaultValue={updateDayCare.pickUpDropOffRate} placeholder="$0.00" name="pickUpDropOffRate" onChange={handleUpdateFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" defaultValue={updateDayCare.puppyRate} name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={handleUpdateDayCare}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateDayCare;