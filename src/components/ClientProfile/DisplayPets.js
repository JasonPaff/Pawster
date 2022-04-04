import React, { useState, useEffect } from "react";
import getPets from "../../services/pet/getPets";
import { NavLink } from "react-router-dom";
import PetProfilePhoto from "../ClientProfile/PetProfilePhoto";

function DisplayPets() {
  const [pets, setPets] = useState([]);
  const defaultMessage = "You have no pets?";

  useEffect(() => {
    getPets().then((result) => {
      setPets(result.data.getPets.pets);
    });
  }, []);

  const petList = pets.map((pet, index) => {
    return (
      <li key={index} className=" flex gap-1 border-b hover:border-b-slate-300 items-center py-1">
        <div className=" bg-slate-300 flex-shrink-0 rounded">
          <PetProfilePhoto petId={pet.id} imgStyle={"w-7 h-7 rounded border border-slate-400 object-cover"} />
        </div>
        <span className="flex-grow">
          <NavLink to={`/profile/pet-profile/${pet.id}`}>{pet.name}</NavLink>
        </span>
        <span className=" text-right text-xs">
          <NavLink className="text-gray-400" to={`/profile/pet-profile/edit/${pet.id}`}>
          Edit
          </NavLink>
        </span>
      </li>
    );
  });

  return <>{pets.length === 0 ? defaultMessage : petList}</>;
}

export default DisplayPets;
