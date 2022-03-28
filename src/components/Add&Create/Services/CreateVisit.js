import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createVisit from '../../../services/visit/createVisit'
import updateVisit from '../../../services/visit/updateVisit'
import getVisit from '../../../services/visit/getVisit'
import deleteVisit from '../../../services/visit/deleteVisit'
import getHost from '../../../services/host/getHost'
import updateHost from '../../../services/host/updateHost'

// TODO: Update host service boolean false upon delete.

function CreateVisit() {
  
  const navigate = useNavigate()

  const [visit, setVisit] = useState({})
  const [updateVis, setUpdateVis] = useState({})
  const [host, setHost] = useState({})

  useEffect(() => {
    getHost().then((result) => {setHost(result.data.getHost.host)})
    getVisit().then((result) => {setUpdateVis(result.data.getVisit.visit)})
  },[])



  const handleFloatChange = (e) => {
    setVisit({
      ...visit,
      [e.target.name]: parseFloat(e.target.value),
    })
    setHost({
      ...host,
      doesDropInVisits: true
    })
  }

  const handleUpdateFloatChange = (e) => {
    setUpdateVis({
      ...updateVis,
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

  async function handleCreateVisit() {
    const response = await createVisit(visit);
    console.log(response)
    if (response.data.createVisit.success) {
        navigate('/profile')
    } else {
        alert(response.data.createVisit.message);
    }
  }

  async function handleUpdateVis() {
    const response = await updateVisit(updateVis);
    if (response.data.updateVisit.success) {
        navigate('/profile')
    } else {
        alert(response.data.updateVisit.message);
    }
  }

  function setStateAsync(host) {
    return new Promise((resolve) => {
      setHost({
        ...host,
        doesDropInVisits: false
      }, resolve)
    });
  }

  async function handleDeleteService() {
    await setStateAsync(host)
    const response = await deleteVisit();
    if (response.data.deleteVisit.success) {
        console.log(host)
        handleUpdateHost()
        navigate('/profile')
    } else {
        alert(response.data.deleteVisit.message);
    }
  }

  

  return (
    <div className="flex justify-around">
      {
        !updateVis ?
        <div>
          <div>Additional Cat Rate<input type="text" placeholder="$0.00" name="additionalCatRate" onChange={handleFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" placeholder="$0.00" name="additionalDogRate" onChange={handleFloatChange} /></div>
          <div>Base Rate<input type="text" placeholder="$0.00" name="baseRate" onChange={handleFloatChange} /></div>
          <div>Bathing Cost<input type="text" placeholder="$0.00"name="bathingRate" onChange={handleFloatChange} /></div>
          <div>Cat Rate<input type="text" placeholder="$0.00" name="catRate" onChange={handleFloatChange} /></div>
          <div>Holiday Rate<input type="text" placeholder="$0.00" name="holidayRate" onChange={handleFloatChange} /></div>
          <div>Hourly Rate<input type="text" placeholder="$0.00" name="hourlyRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <button onClick={() => {handleCreateVisit(); handleUpdateHost()}}>Save</button>
        </div>
        :
        <div>
          <div>Additional Cat Rate<input type="text" defaultValue={updateVis.additionalCatRate} placeholder="$0.00" name="additionalCatRate" onChange={handleUpdateFloatChange} /></div>
          <div>Additional Dog Rate<input type="text" defaultValue={updateVis.additionalDogRate} placeholder="$0.00" name="additionalDogRate" onChange={handleUpdateFloatChange} /></div>
          <div>Base Rate<input type="text" defaultValue={updateVis.baseRate} placeholder="$0.00" name="baseRate" onChange={handleUpdateFloatChange} /></div>
          <div>Bathing Cost<input type="text" defaultValue={updateVis.bathingRate} placeholder="$0.00"name="bathingRate" onChange={handleUpdateFloatChange} /></div>
          <div>Cat Rate<input type="text" defaultValue={updateVis.catRate} placeholder="$0.00" name="catRate" onChange={handleUpdateFloatChange} /></div>
          <div>Holiday Rate<input type="text" defaultValue={updateVis.holidayRate} placeholder="$0.00" name="holidayRate" onChange={handleUpdateFloatChange} /></div>
          <div>Hourly Rate<input type="text" defaultValue={updateVis.hourlyRate} placeholder="$0.00" name="hourlyRate" onChange={handleFloatChange} /></div>
          <div>Puppy Rate<input type="text" defaultValue={updateVis.puppyRate} placeholder="$0.00" name="puppyRate" onChange={handleFloatChange} /></div>
          <div><button onClick={handleUpdateVis}>Update</button><button onClick={handleDeleteService}>Deactivate Service</button></div>
        </div>
      }
    </div>
  );
}

export default CreateVisit;