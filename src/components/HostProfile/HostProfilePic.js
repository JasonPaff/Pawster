import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import getUserProfilePhotoById from '../../services/user_photo/getUserProfilePhotoById'
import emptyImage from '../../img/icons/user.png'


function HostProfilePic() {

    const [fetchedPhoto, setPhoto] = useState({})
    const params = useParams()

    useEffect(() => {
        getUserProfilePhotoById(params.userId).then((result) => {
            if (result.data.getUserProfilePhotoById.success === true) {
                setPhoto(result.data.getUserProfilePhotoById.photo)
            } else {
                return null
            }
        })
    }, [])

    let imageSrc;

    if (fetchedPhoto.isProfilePhoto === true) {
        imageSrc = `data:${fetchedPhoto.photoType};base64, ${fetchedPhoto.photo}`;
    } else {
        imageSrc = emptyImage
    }

    return (
        <div>
            <img className="w-10"src={imageSrc}/>
        </div>
    )

}

export default HostProfilePic