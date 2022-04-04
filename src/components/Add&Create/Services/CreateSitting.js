import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createSitting from '../../../services/sitting/createSitting'
import updateSitting from '../../../services/sitting/updateSitting'
import getSitting from '../../../services/sitting/getSitting'
import getHost from '../../../services/host/getHost'
import updateHost from '../../../services/host/updateHost'


function CreateSitting() {
  
  const navigate = useNavigate()

  const [sitting, setSitting] = useState({})
  const [updateSit, setUpdateSit] = useState({})
  const [host, setHost] = useState({})

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
    getSitting().then((result) => {setUpdateSit(result.data.getSitting.sitting)})
  },[])


  const handleFloatChange = (e) => {
    setSitting({
      ...sitting,
      [e.target.name]: parseFloat(e.target.value),
    })
    setHost({
      ...host,
      doesHouseSitting: true
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateSit({
      ...updateSit,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  async function handleCreateSitting() {
    const response = await createSitting(sitting);

    console.log(response)
    if (response.data.createSitting.success) {
      window.location.reload()
    } else {
        alert(response.data.createSitting.message);
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

  async function handleUpdateSit() {
    const response = await updateSitting(updateSit);
    if (response.data.updateSitting.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateSitting.message);
    }
  }

  

  return (
    <div className="flex justify-around">
      {
        !updateSit ?
        <div>
          <div>Additional Cat Rate<input type="text" placeholder="$0.00" name="additionalCatRate" onChange={handleFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
          <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
          <div>Bathing Cost<input type="text" placeholder="$0.00"name="bathingRate" onChange={handleFloatChange} /></div>
          <div>Cat Rate<input type="text" placeholder="$0.00" name="catRate" onChange={handleFloatChange} /></div>
          <div>Extended Care Rate<input type="text" placeholder="$0.00" name="extendedCareRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={() => {handleCreateSitting(); handleUpdateHost()}}>Save</button>
        </div>
        :
        <div>
          <div>Additional Cat Rate<input type="text" defaultValue={updateSit.additionalCatRate} placeholder="$0.00" name="additionalCatRate" onChange={handleUpdateFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateSit.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateSit.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Bathing Cost<input type="text" defaultValue={updateSit.bathingRate} placeholder="$0.00"name="bathingRate" onChange={handleUpdateFloatChange} /></div>
          <div>Cat Rate<input type="text" defaultValue={updateSit.catRate} placeholder="$0.00" name="catRate" onChange={handleUpdateFloatChange} /></div>
          <div>Extended Care Rate<input type="text" defaultValue={updateSit.extendedCareRate} placeholder="$0.00" name="extendedCareRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateSit.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" defaultValue={updateSit.puppyRate} name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={handleUpdateSit}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateSitting;