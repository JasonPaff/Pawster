import React, { useState, useEffect } from "react";
import getPetsById from "../../services/pet/getPetsById"
import PetProfilePhoto from "../PetProfilePhoto";
import { NavLink } from "react-router-dom";

function DisplayHostPets(props) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPetsById(props.userId).then((result) => {
      setPets(result.data.getPetsById.pets);
    });
  }, []);

  const petList = pets.map((pet, index) => {
    console.log(pet.name)
    console.log(pet)
    return (
      <li key={index}>
        <PetProfilePhoto petId={pet.id}/>
        <NavLink to={`/profile/pet-profile/${pet.id}`}>{pet.name}</NavLink>
      </li>
    );
  });

  return (
    <div className="flex-col justify-center">
      <h1>Display Pets</h1>
      {petList}
    </div>
  );
}

export default DisplayHostPets;
