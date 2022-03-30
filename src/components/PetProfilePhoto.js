import React, {useEffect, useState} from 'react'
import getPetPhotos from '../services/pet_photo/getPetPhotos'
import emptyImage from '../img/icons/user.png'




function PetProfilePhoto(props) {

    const [photo, setPhoto] = useState({})

    const image = "../img/icons/user.png"

    useEffect(() => {
        getPetPhotos(props.petId).then((result) => {console.log(result)})
    }, [])

    return (
        <div>
            {photo.isProfilePhoto === true ? <div></div> : <image src="../img/icons/user.png"/>}
            <img className="w-10"src={emptyImage}/>
        </div>
    )

}

export default PetProfilePhoto