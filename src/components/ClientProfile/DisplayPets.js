import React, { useState, useEffect } from "react";
import getPets from "../../services/pet/getPets";
import { NavLink } from "react-router-dom";

function DisplayPets() {
  const [pets, setPets] = useState([]);
  const defaultMessage = "You have no pets?";

  useEffect(() => {
    getPets().then((result) => {
      setPets(result.data.getPets.pets || []);
    });
  }, []);

  const petList = pets.map((pet, index) => {
    return (
      <li key={index} className="border-b hover:border-b-slate-300 py-1">
        <NavLink to={`/profile/pet-profile/${pet.id}`}>{pet.name}</NavLink>
      </li>
    );
  });

  return <div className="flex-col justify-center">{pets.length === 0 ? defaultMessage : petList}</div>;
}

export default DisplayPets;
