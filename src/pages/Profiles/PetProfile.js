import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getPet from '../../services/pet/getPet'
import PetProfilePhoto from '../../components/ClientProfile/PetProfilePhoto'
import { AiOutlineCheck } from 'react-icons/ai'

function PetProfile() {
  const params = useParams()

  const [pet, setPet] = useState({})

  useEffect(() => {
    getPet(params.petId).then((result) => {setPet(result.data.getPet.pet)})
  }, [])

  console.log(pet.id)


  return (
    <div className="flex justify-center p-20">
      <div className="flex-col">
        <PetProfilePhoto className="rounded-lg" petId={params.petId}/>

      </div>
      <div className="flex-col p-12 ml-14 w-2/5">
        <h1 className="text-3xl font-medium">{pet.name}</h1>
        <div className="p-1">
          <p>{pet.type}</p>
          <p className="font-xs">{pet.weight} lbs, {pet.ageYear} yrs {pet.ageMonth} mo</p>
          <h2 className="text-lg font-medium mt-14">About me</h2>
          <p>{pet.description}</p>
          <div className="flex flex-wrap mt-14 justify-evenly">
            {pet.canBeLeftAlone ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Can Be Left Alone</div> : null}
            {pet.isFixed ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Fixed</div> : null}
            {pet.isHouseBroken ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>House-broken</div> : null}
            {pet.isFriendlyToChildren ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Friendly to Children</div> : null}
            {pet.isFriendlyToOtherDogs ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Friendly to Dogs</div> : null}
            {pet.isFriendlyToOtherCats ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Friendly to Cats</div> : null}
            {pet.isMicroChipped ? <div className="flex justify-center text-slate-500"><AiOutlineCheck size="1.3em" className="mr-1"/>Microchipped</div> : null}
          </div>

          <p className="mt-12">Energy Level: {pet.energyLevel}</p>

          <p className="mt-12">Medication Type: {pet.medication}</p>

          <p className="mt-12">Medication Instructions: {pet.medicationInstructions}</p>

          <p className="mt-12">Veterinarian Information: {pet.vetDetails}</p>

        </div>
      </div>
    </div>
  );
}

export default PetProfile;