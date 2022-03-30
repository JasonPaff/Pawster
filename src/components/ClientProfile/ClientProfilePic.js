import React, {useEffect, useState} from 'react'
import getUserPhotos from '../../services/user_photo/getUserPhotos'
import emptyImage from '../img/icons/user.png'




function ClientProfilePhoto() {

    const [fetchedPhotos, setPhotos] = useState([])

    console.log(fetchedPhotos)

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
            const imageSrc = `data:${pic.photoType};base64, ${pic.photo}`;
            return imageSrc
        } else {
            return emptyImage
        }
    })

    return (
        <div>
            <img className="w-10"src={userProfilePhoto}/>
        </div>
    )

}

export default ClientProfilePhoto