import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import getPet from '../../services/pet/getPet'
import updatePet from '../../services/pet/updatePet'
import addPetPhoto from '../../services/pet_photo/addPetPhoto'
import AddPetPhoto from '../../components/Add&Create/AddPetPhoto'


const mapStateToProps = (state) => {
    return {
        photo: state.petRed.photo
    }
}


function EditPet(props) {
  

    const [pet, setPet] = useState({})


    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getPet(params.petId).then((result) => {setPet(result.data.getPet.pet)})
    }, [])
  
  
  
  
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
  
    async function handleUpdatePet() {
      const response = await updatePet(pet);

  
      if (response.data.updatePet.success) {
          navigate('/profile')
      } else {
          alert(response.data.updatePet.message);
      }
    }

    async function uploadPetPhoto(getPhoto) {
        const sendPhoto = {
            petId: params.petId,
            photo: getPhoto[0].name,
            photoType: getPhoto[0].type,

        }
        const response = await addPetPhoto(sendPhoto)
        console.log(response)
        if (response.data.addPetPhoto.success) {
        } else {
            alert(response.data.addPetPhoto.message);
        }
    }
  
  
    // TODO: If have time use Cat/Dog API to autocomplete searches for breeds
    return (
      <div className="flex-col justify-center">
        <div>Add Pet Photo</div>
        <AddPetPhoto />
        <button onClick={() => uploadPetPhoto(props.photo)}>Add Photo</button>
        <div>Add Pet
            <div><input type="text" defaultValue={pet.type} name="type" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.name} placeholder="Pet's Name" name="name" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.ageMonth} placeholder="How many months old" name="ageMonth" onChange={handleIntegerChange} /></div>
            <div><input type="text" defaultValue={pet.ageYear} placeholder="How many years old"name="ageYear" onChange={handleIntegerChange} /></div>
            <div><input type="text" defaultValue={pet.weight} placeholder="Weight" name="weight" onChange={handleIntegerChange} /></div>
            <div><input type="text" defaultValue={pet.breed} placeholder="Breed" name="breed" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.description} placeholder="Tell us about your pet!" name="description" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.energyLevel} placeholder="Energy Level" name="energyLevel" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.feedingSchedule} placeholder="Feeding Schedule" name="feedingSchedule" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.pottySchedule} placeholder="Potty Schedule" name="pottySchedule" onChange={handleTextChange} /></div>
            <div>Can be Left Alone <input type="checkbox" defaultChecked={pet.canBeLeftAlone} name="canBeLeftAlone" onChange={handleBooleanChange} /></div>
            <div>Is your Pet Fixed? <input type="checkbox" defaultChecked={pet.isFixed} name="isFixed" onChange={handleBooleanChange} /></div>
            <div>House Broken <input type="checkbox" defaultChecked={pet.isHouseBroken}  name="isHouseBroken" onChange={handleBooleanChange} /></div>
            <div>Friendly to Children <input type="checkbox" defaultChecked={pet.isFriendlyToChildren} name="isFriendlyToChildren" onChange={handleBooleanChange} /></div>
            <div>Friendly to Other dogs <input type="checkbox" defaultChecked={pet.isFriendlyToOtherDogs} name="isFriendlyToOtherDogs" onChange={handleBooleanChange} /></div>
            <div>Friendly to Other cats <input type="checkbox" defaultChecked={pet.isFriendlyToOtherCats} name="isFriendlyToOtherCats" onChange={handleBooleanChange} /></div>
            <div>Microchipped <input type="checkbox" defaultChecked={pet.isMicroChipped} name="isMicroChipped" onChange={handleBooleanChange} /></div>
            <div><input type="text" defaultValue={pet.medication} placeholder="Medication" name="medication" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.medicationInstructions} placeholder="Medication Instructions" name="medicationInstructions" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.vetDetails} placeholder="Veterinarian Information" name="vetDetails" onChange={handleTextChange} /></div>
            <div><input type="text" defaultValue={pet.additionalInfo} placeholder="Additional Information" name="additionalInfo" onChange={handleTextChange} /></div>
            <button onClick={handleUpdatePet}>Save</button>
        </div>
      </div>
    )
}

export default connect(mapStateToProps)(EditPet);