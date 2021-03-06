import React, { useState, useEffect } from "react";
import getPetsById from "../../services/pet/getPetsById";
import PetProfilePhoto from "../ClientProfile/PetProfilePhoto";
import { NavLink } from "react-router-dom";

function DisplayHostPets(props) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPetsById(props.userId).then((result) => {
      setPets(result.data.getPetsById.pets);
    });
  }, []);

  const petList = pets.map((pet) => {
    return (
      <>
        {!pet.id && <p> Currently has no pets</p>}
        <NavLink key={pet.id} to={`/profile/pet-profile/${pet.id}`} className="hover:text-inherit ">
          <div className="flex gap-3  border border-slate-300  rounded-lg p-2 hover:shadow-md">
            <div className="flex items-center  justify-center bg-background-light  ">
              <PetProfilePhoto petId={pet.id} imgStyle={" h-24 w-24 object-cover border border-slate-300 rounded-md"} />
            </div>
            <div className="auto-cols-fr flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-5 lg:grid-rows-3 lg:grid-flow-col">
              <p className="font-medium underline col-span-2"> {pet.name}</p>
              <p>{pet.type}</p>
              <p className="text-sm">
                {pet.ageYear && pet.ageYear + " yrs"} {pet.ageMonth && pet.ageMonth + "m"}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Breed:</span> {pet.breed}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Energy Level:</span> {pet.energyLevel}
              </p>
            </div>
          </div>
        </NavLink>
      </>
    );
  });

  return <ul className="flex flex-col gap-3 mt-4">{petList}</ul>;
}

export default DisplayHostPets;
