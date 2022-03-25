import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import createPet from '../../services/pet/createPet'

function CreatePet() {
  
  const [pet, setPet] = useState({
      "canBeLeftAlone": false,
      "isFixed": false,
      "isHouseBroken": false,
      "isFriendlyToChildren": false,
      "isFriendlyToOtherDogs": false,
      "isFriendlyToOtherCats": false,
      "isMicroChipped": false,
  })


  const navigate = useNavigate()


  const handleTextChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,

    })
  }

  const handleBooleanChange = (e) => {
      const { checked } = e.target
    setPet({
        ...pet,
        [e.target.name]: checked,
    })
  }

  const handleIntegerChange = (e) => {
      setPet({
        ...pet,
        [e.target.name]: parseInt(e.target.value),
      })
  }

  async function handleCreatePet() {
    console.log(pet)
    const response = await createPet(pet);

    if (response.data.createPet.success) {
        navigate('/profile')
    } else {
        alert(response.data.createPet.message);
    }
  }


  // TODO: If have time use Cat/Dog API to autocomplete searches for breeds
  return (
    <div className="flex-col justify-center">

        <div>Add Pet
            <div><input type="text" placeholder="Type (Dog or Cat)" name="type" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Pet's Name" name="name" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="How many months old" name="ageMonth" onChange={handleIntegerChange} /></div>
            <div><input type="text" placeholder="How many years old"name="ageYear" onChange={handleIntegerChange} /></div>
            <div><input type="text" placeholder="Weight" name="weight" onChange={handleIntegerChange} /></div>
            <div><input type="text" placeholder="Breed" name="breed" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Tell us about your pet!" name="description" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Energy Level" name="energyLevel" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Feeding Schedule" name="feedingSchedule" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Potty Schedule" name="pottySchedule" onChange={handleTextChange} /></div>
            <div>Can be Left Alone <input type="checkbox" name="canBeLeftAlone" onChange={handleBooleanChange} /></div>
            <div>Is your Pet Fixed? <input type="checkbox" name="isFixed" onChange={handleBooleanChange} /></div>
            <div>House Broken <input type="checkbox" name="isHouseBroken" onChange={handleBooleanChange} /></div>
            <div>Friendly to Children <input type="checkbox" name="isFriendlyToChildren" onChange={handleBooleanChange} /></div>
            <div>Friendly to Other dogs <input type="checkbox" name="isFriendlyToOtherDogs" onChange={handleBooleanChange} /></div>
            <div>Friendly to Other cats <input type="checkbox" name="isFriendlyToOtherCats" onChange={handleBooleanChange} /></div>
            <div>Microchipped <input type="checkbox" name="isMicroChipped" onChange={handleBooleanChange} /></div>
            <div><input type="text" placeholder="Medication" name="medication" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Medication Instructions" name="medicationInstructions" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Veterinarian Information" name="vetDetails" onChange={handleTextChange} /></div>
            <div><input type="text" placeholder="Additional Information" name="additionalInfo" onChange={handleTextChange} /></div>
            <button onClick={handleCreatePet}>Save</button>
        </div>

    </div>
  );
}

export default CreatePet;