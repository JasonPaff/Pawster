import React, { useState, useEffect } from "react";
import getPetsById from "../../services/pet/getPetsById"
import { NavLink } from "react-router-dom";

function DisplayHostPets(props) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPetsById().then((result) => {
      setPets(result.data.getPets.pets);
    });
  }, []);

  const petList = pets.map((pet, index) => {
    console.log(pet.name)
    return (
      <li key={index}>
        <NavLink to={`/profile/pet-profile/${pet.id}`}>{pet.name}</NavLink>
        <NavLink className="text-sky-400" to={`/profile/pet-profile/edit/${pet.id}`}>Edit</NavLink>
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
