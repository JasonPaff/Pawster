import React from "react";
import { connect } from "react-redux";
import CreateAddress from "../../components/Add&Create/CreateAddress";
import AddUserPhoto from "../../components/Add&Create/AddUserPhoto";
import addUserPhoto from "../../services/user_photo/addUserPhoto";

const mapStateToProps = (state) => {
  return {
    photo: state.hostsRed.userPhoto,
  };
};

function EditClient(props) {
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
  }

  return (
    <div className="flex flex-col py-10 px-10">
      <div className="flex flex-col gap-2 ">
        <AddUserPhoto />
        <button className=" self-end w-40 bg-accent-green text-white" onClick={() => uploadUserPhoto(props.photo)}>
          Add Photo
        </button>
      </div>
      <hr className="my-10 border-slate-300" />
      <CreateAddress />
    </div>
  );
}

export default connect(mapStateToProps)(EditClient);
