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
      <NavLink key={pet.id} to={`/profile/pet-profile/${pet.id}`}>
        <li className="flex-col border p-5 mr-3">
          <PetProfilePhoto petId={pet.id} />
          {pet.name}
        </li>
      </NavLink>
    );
  });

  return <ul className="">{petList}</ul>;
}

export default DisplayHostPets;
