import React, { useEffect, useState } from "react";
import getUserProfilePhotoById from "../../services/user_photo/getUserProfilePhotoById";
import emptyImage from "../../img/icons/user.png";

function ClientProfilePic(props) {
  const [fetchedPhoto, setPhoto] = useState({});

  const userId = localStorage.getItem("id");
  console.log("props");
  console.log(props);

  useEffect(() => {
    getUserProfilePhotoById(userId).then((result) => {
      if (result.data.getUserProfilePhotoById.success === true) {
        setPhoto(result.data.getUserProfilePhotoById.photo);
      } else {
        return null;
      }
    });
  }, []);

  let imageSrc;

  if (fetchedPhoto.isProfilePhoto === true && fetchedPhoto.userId === userId) {
    imageSrc = `data:${fetchedPhoto.photoType};base64, ${fetchedPhoto.photo}`;
  } else {
    imageSrc = emptyImage;
  }

  return (
    <>
      <img className={props.styleImg} src={imageSrc} alt="" />
    </>
  );
}

export default ClientProfilePic;
