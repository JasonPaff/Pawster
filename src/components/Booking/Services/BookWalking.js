import React, {useEffect, useState} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getWalkingById from '../../../services/walking/getWalkingById'


function BookWalking(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [walking, setWalking] = useState({})
    const [book, setBook] = useState({})

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getWalkingById(props.hostId).then((result) => setWalking(result.data.getWalkingById.walking))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])


    function handleBooking() {
        console.log("Booked")
    }

    return (
        <div>
            {host.doesDogWalking ? 
            <div>
                
                <button onClick={handleBooking}>Book</button>
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookWalking