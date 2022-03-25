import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import getPet from '../../services/pet/getPet'
import deletePet from '../../services/pet/deletePet'

function PetProfile() {
  const params = useParams()
  const navigate = useNavigate()

  const [pet, setPet] = useState({})

  useEffect(() => {
    getPet(params.petId).then((result) => {setPet(result.data.getPet.pet)})
  }, [])

  const handleDeletePet = () => {
    deletePet(params.petId)
    navigate('/profile')

  }

  return (
    <div className="flex-col justify-center">
      <h1>{pet.name}'s Profile Page</h1>
      <button onClick={handleDeletePet}>Delete Pet</button>
    </div>
  );
}

export default PetProfile;