import React, { useEffect, useState } from 'react'
import createBoarding from '../../services/boarding/createBoarding'
import { useNavigate } from 'react-router-dom';



function CreateBoarding() {
  
  const navigate = useNavigate()

  const [boarding, setBoarding] = useState({})

  const handleFloatChange = (e) => {
    setBoarding({
      ...boarding,
      [e.target.name]: parseFloat(e.target.value),
    })
  }

  async function handleCreateBoarding() {
    const response = await createBoarding(boarding);

    if (response.data.createBoarding.success) {
        navigate('/profile')
    } else {
        alert(response.data.createBoarding.message);
    }
  }

  return (
    <div className="flex justify-around">
      <div>Additional Cat Rate<input type="text" placeholder="$0.00" name="additionalCatRate" onChange={handleFloatChange} /></div>
      <div>Addition Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
      <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
      <div>Bathing Cost<input type="text" placeholder="$0.00"name="bathingRate" onChange={handleFloatChange} /></div>
      <div>Cat Rate<input type="text" placeholder="$0.00" name="catRate" onChange={handleFloatChange} /></div>
      <div>Daily Rate<input type="text" placeholder="$0.00" name="dailyRate" onChange={handleFloatChange} /></div>
      <div>Extended Care Rate<input type="text" placeholder="$0.00" name="extendedCareRate" onChange={handleFloatChange} /></div>
      <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
      <div>Pick-up/Drop-off Rate<input type="text" placeholder="$0.00" name="pickUpDropOffRate" onChange={handleFloatChange} /></div>
      <button onClick={handleCreateBoarding}>Save</button>
    </div>
  );
}

export default CreateBoarding;