import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPet from "../../services/pet/getPet";
import PetProfilePhoto from "../../components/ClientProfile/PetProfilePhoto";
import { AiOutlineCheck } from "react-icons/ai";

function PetProfile() {
  const params = useParams();

  const [pet, setPet] = useState({});

  useEffect(() => {
    getPet(params.petId).then((result) => {
      setPet(result.data.getPet.pet);
    });
  }, []);

  console.log(pet);

  return (
    <div className="container flex flex-col lg:flex-row justify-center  mx-auto my-4 gap-4">
      <div className="flex-shrink-0 mx-auto lg:mx-0">
        <div className="card  p-10  inline-block ">
          <PetProfilePhoto className="" petId={params.petId} imgStyle={"w-64 h-64 rounded-lg border border-slate-300 object-cover"} />
        </div>
      </div>
      <div className="card p-4 lg:p-10 max-w-2xl justify-center mx-auto lg:mx-0">
        <h1 className="text-2xl font-medium">{pet.name}</h1>
        <hr className="my-4" />
        <div className="p-1 ">
          <div className="grid grid-cols-2 gap-x-3">
            <p>{pet.type}</p>
            <p>
              <span className="text-right text-sm text-gray-500">Breed: </span>
              {pet.breed}
            </p>
            <p>
              {pet.ageYear && pet.ageYear + " yrs"}, {pet.ageMonth && pet.ageMonth + " mon"}
            </p>
            <p>
              <span className="text-right text-sm text-gray-500"> Energy Level:</span> {pet.energyLevel}
            </p>
            <p>{pet.weight} lbs</p>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-x-3">
            {pet.canBeLeftAlone ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Can Be Left Alone
              </div>
            ) : null}
            {pet.isFixed ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Fixed
              </div>
            ) : null}
            {pet.isHouseBroken ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                House-broken
              </div>
            ) : null}
            {pet.isFriendlyToChildren ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Friendly to Children
              </div>
            ) : null}
            {pet.isFriendlyToOtherDogs ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Friendly to Dogs
              </div>
            ) : null}
            {pet.isFriendlyToOtherCats ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Friendly to Cats
              </div>
            ) : null}
            {pet.isMicroChipped ? (
              <div className="flex text-slate-500">
                <AiOutlineCheck size="1.3em" className="mr-1" />
                Microchipped
              </div>
            ) : null}
          </div>

          <hr className="my-4" />
          <div className="m-2 border-b">
            <lapel className="text-sm text-slate-500">Feeding Schedule:</lapel>
            <p> {pet.feedingSchedule}</p>
          </div>
          <div className="m-2 border-b">
            <lapel className="text-sm text-slate-500">Potty Schedule:</lapel>
            <p> {pet.pottySchedule}</p>
          </div>
          <div className="m-2 border-b">
            <lapel className="text-sm text-slate-500">Medication Type: </lapel>
            <p> {pet.medication}</p>
          </div>
          <div className="m-2 border-b">
            <lapel className="text-sm text-slate-500">Medication Instructions: </lapel>
            <p> {pet.medicationInstructions}</p>
          </div>
          <div className="m-2 border-b">
            <lapel className="text-sm text-slate-500">Veterinarian Information: </lapel>
            <p> {pet.vetDetails}</p>
          </div>
          <h2 className="text-lg font-medium mt-6 ">About me</h2>
          <p>
            {pet.description}
            {pet.description === " " && <p>user has not added an about me for this pet yet</p>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetProfile;
