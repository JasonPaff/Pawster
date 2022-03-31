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
    return (
      <NavLink to={`/profile/pet-profile/${pet.id}`}>
        <li className="flex-col border p-5 mr-3" key={index}>
          <PetProfilePhoto petId={pet.id}/>
          {pet.name}
        </li>
      </NavLink>
    );
  });

  return (
    <div className="flex list-none">
      {petList}
    </div>
  );
}

export default DisplayHostPets;
