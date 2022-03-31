import React, {useEffect, useState} from "react";
import getPetPhotos from "../services/pet_photo/getPetPhotos";
import emptyImage from "../img/icons/user.png";

function PetProfilePhoto(props) {
    const [fetchedPhotos, setPhotos] = useState([])

    useEffect(() => {
        getPetPhotos(props.petId).then((result) => {
            if (result.data.getPetPhotos.success === true) {
                setPhotos(result.data.getPetPhotos.photos)
            } else {
                return null
            }
        })
    }, [])

    const petProfilePhoto = fetchedPhotos.map((pic) => {
        if (pic.isProfilePhoto === true) {
            return `data:${pic.photoType};base64, ${pic.photo}`
        } else {
            return emptyImage
        }
    })

    return (
        <div>
            <img className="w-60" src={petProfilePhoto} alt="pet profile"/>
        </div>
    )
}

export default PetProfilePhoto;