import React, { useEffect, useState } from 'react'
import CreatePet from '../../components/Create/CreatePet'



function AddPetPage() {
  

  return (
    <div className="flex-col justify-center">
      <h1>Add Pet Page</h1>
      <CreatePet />
      {/* Upload pet photo */}
    </div>
  );
}

export default AddPetPage;