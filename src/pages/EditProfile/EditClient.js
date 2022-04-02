import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateAddress from "../../components/Add&Create/CreateAddress";
import AddUserPhoto from "../../components/Add&Create/AddUserPhoto";
import addUserPhoto from "../../services/user_photo/addUserPhoto";
import ClientProfilePic  from '../../components/ClientProfile/ClientProfilePic'
import getUserProfilePhotoById from "../../services/user_photo/getUserProfilePhotoById";

const mapStateToProps = (state) => {
  return {
    photo: state.hostsRed.userPhoto,
  };
};

const userId = localStorage.getItem("id")

function EditClient(props) {
  const [photo, setPhoto] = useState({})

  useEffect(() => {
    getUserProfilePhotoById(userId).then((result) => {setPhoto(result.data.getUserProfilePhotoById.photo)})
  }, [])

  console.log(photo)

  async function submit(dataString, type) {
    const sendPhoto = {
      photo: dataString,
      photoType: type,
    };
    const response = await addUserPhoto(sendPhoto);

    

    console.log(response);
    if (response.data.addUserPhoto.success) {
    } else {
      alert(response.data.addUserPhoto.message);
    }
  }

  async function uploadUserPhoto(getPhoto) {
    console.log(getPhoto);
    console.log(props.photo);
    const reader = new FileReader();
    reader.onload = () => {
      submit(reader.result.replace("data:", "").replace(/^.+,/, ""), getPhoto[0].type);
    };
    reader.readAsDataURL(getPhoto[0]);
    window.location.reload()

  }

  return (
    <div className="flex flex-col py-10 px-10">
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-around">
          <div>
            <ClientProfilePic />
          </div>
          <div className="w-3/5">
            <AddUserPhoto />
          </div>
        </div>
        <button className="self-end w-44 bg-accent-green text-white" onClick={() => uploadUserPhoto(props.photo)}>
          Set Profile Picture
        </button>
      </div>
      <hr className="my-10 border-slate-300" />
      <CreateAddress />
    </div>
  );
}

export default connect(mapStateToProps)(EditClient);
