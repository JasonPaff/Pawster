import React, {useEffect, useState} from 'react'
import getUserPhotos from '../../services/user_photo/getUserPhotos'
import emptyImage from '../../img/icons/user.png'

function ClientProfilePic() {

    const [fetchedPhotos, setPhotos] = useState([])

    useEffect(() => {
        getUserPhotos().then((result) => {
            if (result.data.getUserPhotos.success === true) {
                setPhotos(result.data.getUserPhotos.photos)
            } else {
                return null
            }
        })
    }, [])

    const userProfilePhoto = fetchedPhotos.map((pic) => {
        if (pic.isProfilePhoto === true) {
            return `data:${pic.photoType};base64, ${pic.photo}`
        } else {
            return emptyImage
        }
    })

    return (
        <div>
            <img className="w-10" src={userProfilePhoto} alt="profile"/>
        </div>
    )

}

export default ClientProfilePic