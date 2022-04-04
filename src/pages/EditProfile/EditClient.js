import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateAddress from "../../components/Add&Create/CreateAddress";
import AddUserPhoto from "../../components/Add&Create/AddUserPhoto";
import addUserPhoto from "../../services/user_photo/addUserPhoto";
import ClientProfilePic from "../../components/ClientProfile/ClientProfilePic";
import getUserProfilePhotoById from "../../services/user_photo/getUserProfilePhotoById";
import deleteUserPhoto from "../../services/user_photo/deleteUserPhoto";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    photo: state.hostsRed.userPhoto,
  };
};

const userId = localStorage.getItem("id");

function EditClient(props) {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    getUserProfilePhotoById(userId).then((result) => {
      setPhoto(result.data.getUserProfilePhotoById.photo);
    });
  }, []);

  const navigate = useNavigate();
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
    const reader = new FileReader();
    reader.onload = () => {
      submit(reader.result.replace("data:", "").replace(/^.+,/, ""), getPhoto[0].type);
    };
    reader.readAsDataURL(getPhoto[0]);
    deleteUserPhoto(photo.id);
    window.location.reload();
  }

  return (
    <div className="flex flex-col px-3  lg:px-10 justify-center ">
      <h3 className="text-center pb-4 text-accent-green ">Update Profile Photo</h3>
      <div className="flex flex-col gap-2 w-3/5 min-w-[380px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 justify-around items-center">
          <ClientProfilePic styleImg={"w-36 h-36 object-cover border border-slate-300 rounded-lg"} />

          <div className="w-full">
            <AddUserPhoto />
          </div>
        </div>
        <button className="self-end w-44 bg-accent-green text-white" onClick={() => uploadUserPhoto(props.photo)}>
          Set Profile Photo
        </button>
      </div>
      <hr className="my-10 border-slate-300" />
      <div className="flex flex-col lg:w-3/5  w-full mx-auto ">
        <CreateAddress />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(EditClient);
