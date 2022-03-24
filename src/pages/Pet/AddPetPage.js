import React, { useEffect, useState } from 'react'
import AddPetPhoto from '../../components/Add&Create/AddPetPhoto';
import CreatePet from '../../components/Add&Create/CreatePet'



function AddPetPage() {
  

  return (
    <div className="flex-col justify-center">
      <h1>Add Pet Page</h1>
      <CreatePet />
      <AddPetPhoto />
    </div>
  );
}

export default AddPetPage;