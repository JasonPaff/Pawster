import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createSitting from '../../../services/sitting/createSitting'
import updateSitting from '../../../services/sitting/updateSitting'
import getSitting from '../../../services/sitting/getSitting'

// TODO: Cannot read properties of undefined "exists"


function CreateSitting() {
  
  const navigate = useNavigate()

  const [sitting, setSitting] = useState({})
  const [updateSit, setUpdateSit] = useState({})

  useEffect(() => {
    getSitting().then((result) => {
    console.log(result)
    setUpdateSit(result.data.getSitting.sitting)
    })
  },[])


  const handleFloatChange = (e) => {
    setSitting({
      ...sitting,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateSit({
      ...updateSit,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  async function handleCreateSitting() {
    console.log(sitting)
    const response = await createSitting(sitting);

    console.log(response)
    if (response.data.createSitting.success) {
        navigate('/profile')
    } else {
        alert(response.data.createSitting.message);
    }
  }

  async function handleUpdateSit() {
    console.log(updateSit)
    const response = await updateSitting(updateSit);

    if (response.data.updateSit.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateSit.message);
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
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={handleCreateSitting}>Save</button>
        </div>
        :
        <div>
          <div>Additional Cat Rate<input type="text" defaultValue={updateSit.additionalCatRate} placeholder="$0.00" name="additionalCatRate" onChange={handleUpdateFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateSit.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateSit.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Bathing Cost<input type="text" defaultValue={updateSit.bathingRate} placeholder="$0.00"name="bathingRate" onChange={handleUpdateFloatChange} /></div>
          <div>Cat Rate<input type="text" defaultValue={updateSit.catRate} placeholder="$0.00" name="catRate" onChange={handleUpdateFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateSit.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" defaultValue={updateSit.puppyRate} name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={handleUpdateSit}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateSitting;