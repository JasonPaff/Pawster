import React, {useState, useEffect} from 'react'
import getPets from '../../services/pet/getPets'


function DisplayPets() {

    const [pets, setPets] = useState([])

    useEffect(() => {
        getPets().then((result) => {setPets(result.data.getPets.pets)})
    }, [])

    const petList = pets.map((pet) => {
        return <li key={pet.id}>{pet.name}</li>
    })

    return (
        <div className="flex-col justify-center">
        <h1>Display Pets</h1>
        {petList}
        </div>
    );
}

export default DisplayPets;