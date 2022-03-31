import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getPet from '../../services/pet/getPet'

function PetProfile() {
  const params = useParams()

  const [pet, setPet] = useState({})

  useEffect(() => {
    getPet(params.petId).then((result) => {setPet(result.data.getPet.pet)})
  }, [])


  return (
    <div className="flex-col justify-center">
      <h1>{pet.name}'s Profile Page</h1>
    </div>
  );
}

export default PetProfile;