import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import createPet from "../../services/pet/createPet";
import addPetPhoto from "../../services/pet_photo/addPetPhoto";

const mapStateToProps = (state) => {
  return {
    photo: state.petRed.photo,
  };
};

function CreatePet(props) {
  const [pet, setPet] = useState({
    canBeLeftAlone: false,
    isFixed: false,
    isHouseBroken: false,
    isFriendlyToChildren: false,
    isFriendlyToOtherDogs: false,
    isFriendlyToOtherCats: false,
    isMicroChipped: false,
  });

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooleanChange = (e) => {
    const { checked } = e.target;
    setPet({
      ...pet,
      [e.target.name]: checked,
    });
  };

  const handleIntegerChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  async function handleCreatePet() {
    console.log(props.photo);
    const response = await createPet(pet);
    const photoResponse = await addPetPhoto(props.photo);

    console.log(photoResponse);

    if (response.data.createPet.success && photoResponse.data.addPetPhoto.success) {
      navigate("/profile");
    } else {
      alert(response.data.createPet.message);
    }
  }

  const labelClass = "text-sm text-gray-500";

  // TODO: If have time use Cat/Dog API to autocomplete searches for breeds
  return (
    <div className="flex-col justify-center">
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        <label className={labelClass} className={labelClass} htmlFor="">
          Pet's Name:
          <input type="text" placeholder="" name="name" onChange={handleTextChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Cat or Dog ?
          <select name="type" onChange={handleTextChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label className={labelClass} htmlFor="">
          How many months old:
          <input type="text" placeholder="" name="ageMonth" onChange={handleIntegerChange} />
        </label>
        <label className={labelClass} htmlFor="">
          How many years old:
          <input type="text" placeholder="" name="ageYear" onChange={handleIntegerChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Weight:
          <input type="text" placeholder="" name="weight" onChange={handleIntegerChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Breed:
          <input type="text" placeholder="" name="breed" onChange={handleTextChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Energy Level:
          <input type="text" placeholder="" name="energyLevel" onChange={handleTextChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Feeding Schedule:
          <input type="text" placeholder="" name="feedingSchedule" onChange={handleTextChange} />
        </label>
        <label className={labelClass} htmlFor="">
          Potty Schedule:
          <input type="text" placeholder="" name="pottySchedule" onChange={handleTextChange} />
        </label>
      </div>
      {/*  */}
      <hr className="my-4" />
      <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-1">
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="canBeLeftAlone" onChange={handleBooleanChange} />
          Can be Left Alone
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isFixed" onChange={handleBooleanChange} />
          Is your Pet Fixed?
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isHouseBroken" onChange={handleBooleanChange} />
          House Broken
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isFriendlyToChildren" onChange={handleBooleanChange} />
          Friendly to Children
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isFriendlyToOtherDogs" onChange={handleBooleanChange} />
          Friendly to Other dogs
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isFriendlyToOtherCats" onChange={handleBooleanChange} />
          Friendly to Other cats
        </label>
        <label className={labelClass} htmlFor="">
          <input type="checkbox" className="mr-1" name="isMicroChipped" onChange={handleBooleanChange} />
          Microchipped
        </label>
      </div>
      {/*  */}
      <hr className="my-4" />
      <label className={labelClass} htmlFor="">
        Medication:
        <input type="text" placeholder="" name="medication" onChange={handleTextChange} />
      </label>
      <label className={labelClass} htmlFor="">
        Medication Instructions:
      </label>
      <input type="text" placeholder="" name="medicationInstructions" onChange={handleTextChange} />
      <label className={labelClass} htmlFor="">
        Veterinarian Information:
      </label>
      <input type="text" placeholder="" name="vetDetails" onChange={handleTextChange} />
      <label className={labelClass} htmlFor="">
        Additional Information:
      </label>
      <input type="text" placeholder="" name="additionalInfo" onChange={handleTextChange} />
      {/*  */}
      <hr className="mt-8 mb-4" />
      <label className={labelClass} htmlFor="">
        Tell us about your pet!
      </label>
      <textarea type="text" placeholder="" name="description" onChange={handleTextChange} />
      <button className=" bg-accent-green w-44 text-white my-4 mr-0 ml-auto block" onClick={handleCreatePet}>
        Save
      </button>
    </div>
  );
}

export default connect(mapStateToProps)(CreatePet);
