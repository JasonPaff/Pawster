import React, {useEffect, useState} from 'react'
import getUserPhotos from '../../services/user_photo/getUserPhotos'
import emptyImage from '../../img/icons/user.png'




function ClientProfilePic() {

    const [fetchedPhotos, setPhotos] = useState([])

    useEffect(() => {
        getUserPhotos().then((result) => {
            console.log(result)
            if (result.data.getUserPhotos.success === true) {
                setPhotos(result.data.getUserPhotos.photos)
            } else {
                return null
            }
        })
    }, [])

    const userProfilePhoto = fetchedPhotos.map((pic) => {
        let imageSrc = `data:${pic.photoType};base64, ${pic.photo}`;
        if (pic.isProfilePhoto === true) {
            return imageSrc
        } else {
            imageSrc = emptyImage
        }
    })

    return (
        <div>
            <img className="w-10"src={userProfilePhoto}/>
        </div>
    )

}

export default ClientProfilePic