import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getPet from '../../services/pet/getPet'

function PetProfile() {
  const params = useParams()

  const [pet, setPet] = useState({})

  useEffect(() => {
    console.log(params.petId)
    getPet(params.petId).then((result) => {setPet(result.data.getPet.pet)})
  }, [])

  console.log(pet.name)

  return (
    <div className="flex justify-center">
      <h1>{pet.name}'s Profile Page</h1>
    </div>
  );
}

export default PetProfile;