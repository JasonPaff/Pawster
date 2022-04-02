import React, {useEffect, useState} from 'react'
import getUserProfilePhotoById from '../../services/user_photo/getUserProfilePhotoById'
import emptyImage from '../../img/icons/user.png'




function ClientProfilePic() {

    const [fetchedPhoto, setPhoto] = useState({})

    const userId = localStorage.getItem("id")

    useEffect(() => {
        getUserProfilePhotoById(userId).then((result) => {
            if (result.data.getUserProfilePhotoById.success === true) {
                setPhoto(result.data.getUserProfilePhotoById.photo)
            } else {
                return null
            }
        })
    }, [])

    let imageSrc;

    if (fetchedPhoto.isProfilePhoto === true && fetchedPhoto.userId === userId) {
        imageSrc = `data:${fetchedPhoto.photoType};base64, ${fetchedPhoto.photo}`;
    } else {
        imageSrc = emptyImage
    }

    return (
        <div>
            <img className="w-60 rounded-full" src={imageSrc}/>
        </div>
    )

}

export default ClientProfilePic