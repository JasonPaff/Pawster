import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import getPet from "../../services/pet/getPet";
import updatePet from "../../services/pet/updatePet";
import addPetPhoto from "../../services/pet_photo/addPetPhoto";
import AddPetPhoto from "../../components/Add&Create/AddPetPhoto";
import getPetProfilePhoto from "../../services/pet_photo/getPetProfilePhoto";
import PetProfilePhoto from "../../components/ClientProfile/PetProfilePhoto";
import deletePetPhoto from "../../services/pet_photo/deletePetPhoto";

const mapStateToProps = (state) => {
  return {
    photo: state.petRed.photo,
  };
};

function EditPet(props) {
  const [photo, setPhoto] = useState({});
  const [selected, setSelected] = useState("Dog");
  const [pet, setPet] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getPet(params.petId).then((result) => {
      setPet(result.data.getPet.pet);
    });
    getPetProfilePhoto(params.petId).then((result) => {
      setPhoto(result.data.getPetProfilePhoto.photo);
    });
  }, [params.petId]);

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

  const handleDropDown = (e) => {
    setPet({
      ...pet,
    });
  };

  async function handleUpdatePet() {
    const response = await updatePet(params.petId, pet);

    if (response.data.updatePet.success) {
      navigate("/profile");
    } else {
      alert(response.data.updatePet.message);
    }
  }

  async function submit(dataString, type) {
    const sendPhoto = {
      petId: params.petId,
      photo: dataString,
      photoType: type,
    };
    const response = await addPetPhoto(sendPhoto);

    if (response.data.addPetPhoto.success) {
    } else {
      alert(response.data.addPetPhoto.message);
    }
  }

  async function uploadPetPhoto(getPhoto) {
    const reader = new FileReader();
    reader.onload = () => {
      submit(reader.result.replace("data:", "").replace(/^.+,/, ""), getPhoto[0].type);
    };
    reader.readAsDataURL(getPhoto[0]);
    await deletePetPhoto(photo.id);
    window.location.reload();
  }

  // TODO: If have time use Cat/Dog API to autocomplete searches for breeds
  const labelClass = "text-sm text-gray-500";
  return (
    <div className="flex-col justify-center">
      <div className="sm:mx-10">
        <h3 className=" text-accent-green font-medium text-center my-3">Pet Profile Photo</h3>
        <div className="flex justify-center gap-6">
          <PetProfilePhoto imgStyle={" bg-background-light border h-36 w-36 rounded-lg border border-slate-300 object-cover"} petId={params.petId} />
          <div>
            <AddPetPhoto />
            <button className=" block ml-auto mr-0 text-white bg-accent-green my-2" onClick={() => uploadPetPhoto(props.photo)}>
              Add Photo
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <hr className="my-4" />
      {/*  */}
      <div className="mx-10">
        <h3 className=" text-center text-accent-green font-medium m-2">Edit Pet </h3>
        <div className="grid grid-cols-2 gap-3">
          <label className={labelClass} htmlFor="">
            Pet's Name:
            <input type="text" defaultValue={pet.name} placeholder="" name="name" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Cat or Dog:
            <select type="text" defaultValue={selected} name="type" placeholder="" onChange={(e) => setPet({ ...pet, type: e.target.value })}>
              <option value="" disabled selected>
                select
              </option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
          </label>

          <label className={labelClass} htmlFor="">
            How many months old:
            <input type="text" defaultValue={pet.ageMonth} placeholder="" name="ageMonth" onChange={handleIntegerChange} />
          </label>
          <label className={labelClass} htmlFor="">
            How many years old:
            <input type="text" defaultValue={pet.ageYear} placeholder="" name="ageYear" onChange={handleIntegerChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Weight:
            <input type="text" defaultValue={pet.weight} placeholder="" name="weight" onChange={handleIntegerChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Breed:
            <input type="text" defaultValue={pet.breed} placeholder="" name="breed" onChange={handleTextChange} />
          </label>

          <label className={labelClass} htmlFor="">
            Energy Level:
            <input type="text" defaultValue={pet.energyLevel} placeholder="" name="energyLevel" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Feeding Schedule:
            <input type="text" defaultValue={pet.feedingSchedule} placeholder="" name="feedingSchedule" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Potty Schedule:
            <input type="text" defaultValue={pet.pottySchedule} placeholder="" name="pottySchedule" onChange={handleTextChange} />
          </label>
        </div>
        {/*  */}
        <hr className="my-6" />
        {/*  */}
        <div className="grid grid-cols-2 gap-1">
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.canBeLeftAlone} name="canBeLeftAlone" onChange={handleBooleanChange} />
            Can be Left Alone
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isFixed} name="isFixed" onChange={handleBooleanChange} />
            Is your Pet Fixed?
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isHouseBroken} name="isHouseBroken" onChange={handleBooleanChange} />
            House Broken
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isFriendlyToChildren} name="isFriendlyToChildren" onChange={handleBooleanChange} />
            Friendly to Children
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isFriendlyToOtherDogs} name="isFriendlyToOtherDogs" onChange={handleBooleanChange} />
            Friendly to Other dogs
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isFriendlyToOtherCats} name="isFriendlyToOtherCats" onChange={handleBooleanChange} />
            Friendly to Other cats
          </label>
          <label className={labelClass} htmlFor="">
            <input type="checkbox" className="mr-1" defaultChecked={pet.isMicroChipped} name="isMicroChipped" onChange={handleBooleanChange} />
            Microchipped
          </label>
        </div>
        {/*  */}
        <hr className="my-6" />
        {/*  */}
        <div className="flex flex-col gap-3 mb-6">
          <label className={labelClass} htmlFor="">
            Medication:
            <input type="text" defaultValue={pet.medication} placeholder="" name="medication" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Medication Instructions:
            <input type="text" defaultValue={pet.medicationInstructions} placeholder="" name="medicationInstructions" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Veterinarian Information:
            <input type="text" defaultValue={pet.vetDetails} placeholder="" name="vetDetails" onChange={handleTextChange} />
          </label>
          <label className={labelClass} htmlFor="">
            Additional Information:
            <input type="text" defaultValue={pet.additionalInfo} placeholder="" name="additionalInfo" onChange={handleTextChange} />
          </label>
        </div>
        <label className={labelClass} htmlFor="">
          Tell us about your pet!
          <textarea defaultValue={pet.description} placeholder="" name="description" onChange={handleTextChange} />
        </label>
        <button className="block ml-auto mr-0 bg-accent-green text-white w-44 my-4" onClick={handleUpdatePet}>
          Save
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(EditPet);
