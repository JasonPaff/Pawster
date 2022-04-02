import React, {useEffect, useState} from 'react'
import getUserProfilePhotoById from '../../services/user_photo/getUserProfilePhotoById'
import emptyImage from '../../img/icons/user.png'

function HostProfilePic(props) {
    const [fetchedPhoto, setPhoto] = useState({})
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getUserProfilePhotoById(props.hostId).then((result) => {
            if (result.data.getUserProfilePhotoById.success === true) {
                setPhoto(result.data.getUserProfilePhotoById.photo)
            }
            setIsLoaded(true);
        })
    }, [])

    return (
        <>
            {isLoaded && (
                <div className="flex justify-center">
                    {fetchedPhoto.isProfilePhoto === true && fetchedPhoto.userId === props.hostId && (
                        <img className="w-20 rounded-full" src={`data:${fetchedPhoto.photoType};base64, ${fetchedPhoto.photo}`} alt="profile"/>
                    )}
                    {fetchedPhoto.isProfilePhoto === false && (
                        <img className="w-28 rounded-full" src={emptyImage} alt="profile"/>
                    )}

                </div>
            )}
        </>
    );
}

export default HostProfilePic