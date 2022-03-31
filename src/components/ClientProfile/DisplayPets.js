import React, { useState, useEffect } from "react";
import getPets from "../../services/pet/getPets";
import { NavLink } from "react-router-dom";
import PetProfilePhoto from "../PetProfilePhoto";

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
      <li key={index} className="border-b hover:border-b-slate-300 py-1">
        <PetProfilePhoto petId={pet.id} />
        <NavLink to={`/profile/pet-profile/${pet.id}`}>{pet.name}</NavLink>
        <NavLink className="text-sky-400" to={`/profile/pet-profile/edit/${pet.id}`}>
          Edit
        </NavLink>
      </li>
    );
  });

  return <div className="flex-col justify-center">{pets.length === 0 ? defaultMessage : petList}</div>;
}

export default DisplayPets;
