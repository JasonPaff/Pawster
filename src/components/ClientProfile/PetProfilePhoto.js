import React, {useEffect, useState} from 'react'
import getPetPhotos from '../../services/pet_photo/getPetPhotos'
import emptyImage from '../../img/icons/user.png'


function PetProfilePhoto(props) {
    const [fetchedPhotos, setPhotos] = useState([])

    useEffect(() => {
        getPetPhotos(props.petId).then((result) => {
            console.log(result)
            if (result.data.getPetPhotos.success === true) {
                setPhotos(result.data.getPetPhotos.photos)
            } else {
                return null
            }
        })
    }, [])

    const petProfilePhoto = fetchedPhotos.map((pic) => {
        let imageSrc = `data:${pic.photoType};base64, ${pic.photo}`;
        if (pic.isProfilePhoto === true) {
            return imageSrc
        } else {
            imageSrc = emptyImage
            console.log(imageSrc)
            return imageSrc
        }
    })

    
    return (
        <div>
            <img className="w-60 rounded-lg"src={petProfilePhoto}/>
        </div>
    )
}

export default PetProfilePhoto;
