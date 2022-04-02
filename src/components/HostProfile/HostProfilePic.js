import React, {useEffect, useState} from 'react'
import getUserProfilePhotoById from '../../services/user_photo/getUserProfilePhotoById'
import emptyImage from '../../img/icons/user.png'


function HostProfilePic(props) {

    const [fetchedPhoto, setPhoto] = useState({})


    useEffect(() => {
        getUserProfilePhotoById(props.hostId).then((result) => {
            console.log(result);
            if (result.data.getUserProfilePhotoById.success === true) {
                setPhoto(result.data.getUserProfilePhotoById.photo)
            } else {
                return null
            }
        })
    }, [])


    let imageSrc;

    if (fetchedPhoto.isProfilePhoto === true && fetchedPhoto.userId === props.hostId) {
        imageSrc = `data:${fetchedPhoto.photoType};base64, ${fetchedPhoto.photo}`;
    } else {
        imageSrc = emptyImage
    }

    return (
        <div className="flex justify-center">
            <img className="w-60 rounded-full"src={imageSrc}/>
        </div>
    )

}

export default HostProfilePic