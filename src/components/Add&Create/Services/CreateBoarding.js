import React, { useEffect, useState } from 'react'
import createBoarding from '../../../services/boarding/createBoarding'
import updateBoarding from '../../../services/boarding/updateBoarding'
import { useNavigate } from 'react-router-dom';
import getBoarding from '../../../services/boarding/getBoarding';
import getHost from '../../../services/host/getHost'
import updateHost from '../../../services/host/updateHost'


function CreateBoarding() {
  
  const navigate = useNavigate()

  const [boarding, setBoarding] = useState({})
  const [updateBoard, setUpdateBoarding] = useState({})
  const [host, setHost] = useState({})

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
    getBoarding().then((result) => {setUpdateBoarding(result.data.getBoarding.boarding)})
  },[])


  const handleFloatChange = (e) => {
    setBoarding({
      ...boarding,
      [e.target.name]: parseFloat(e.target.value),
    })
    setHost({
      ...host,
      doesBoarding: true
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateBoarding({
      ...updateBoard,
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

  async function handleUpdateHost() {
    const response = await updateHost(host)
    console.log(response)
    if (response.data.updateHost.success) {
        console.log("Host Updated")
        window.location.reload()
    } else {
        alert(response.data.updateHost.message);
    }
  }

  async function handleUpdateBoarding() {
    const response = await updateBoarding(updateBoard);

    console.log(response)
    if (response.data.updateBoarding.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateBoarding.message);
    }
  }



  return (
    <div className="flex justify-around">
      {
        !updateBoard ?
        <div>
          <div>Additional Cat Rate<input type="text" placeholder="$0.00" name="additionalCatRate" onChange={handleFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
          <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
          <div>Bathing Cost<input type="text" placeholder="$0.00"name="bathingRate" onChange={handleFloatChange} /></div>
          <div>Cat Rate<input type="text" placeholder="$0.00" name="catRate" onChange={handleFloatChange} /></div>
          <div>Daily Rate<input type="text" placeholder="$0.00" name="dailyRate" onChange={handleFloatChange} /></div>
          <div>Extended Care Rate<input type="text" placeholder="$0.00" name="extendedCareRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Pick-up/Drop-off Rate<input type="text" placeholder="$0.00" name="pickUpDropOffRate" onChange={handleFloatChange} /></div>
          <button onClick={() => {handleCreateBoarding(); handleUpdateHost()}}>Save</button>
        </div>
        :
        <div>
          <div>Additional Cat Rate<input type="text" defaultValue={updateBoard.additionalCatRate} placeholder="$0.00" name="additionalCatRate" onChange={handleUpdateFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateBoard.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateBoard.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Bathing Cost<input type="text" defaultValue={updateBoard.bathingRate} placeholder="$0.00"name="bathingRate" onChange={handleUpdateFloatChange} /></div>
          <div>Cat Rate<input type="text" defaultValue={updateBoard.catRate} placeholder="$0.00" name="catRate" onChange={handleUpdateFloatChange} /></div>
          <div>Daily Rate<input type="text" defaultValue={updateBoard.dailyRate} placeholder="$0.00" name="dailyRate" onChange={handleUpdateFloatChange} /></div>
          <div>Extended Care Rate<input type="text" defaultValue={updateBoard.extendedCareRate} placeholder="$0.00" name="extendedCareRate" onChange={handleUpdateFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateBoard.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Pick-up/Drop-off Rate<input type="text" defaultValue={updateBoard.pickUpDropOffRate} placeholder="$0.00" name="pickUpDropOffRate" onChange={handleUpdateFloatChange} /></div>
          <button onClick={handleUpdateBoarding}>Update</button>
        </div>
      }
    </div>
  );
}

export default CreateBoarding;