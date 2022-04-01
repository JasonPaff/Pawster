
import React, {useEffect, useState} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getBoardingById from '../../../services/boarding/getBoardingById'


function BookBoarding(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [boarding, setBoarding] = useState({})
    const [book, setBook] = useState({})

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getBoardingById(props.hostId).then((result) => setBoarding(result.data.getBoardingById.boarding))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])


    function handleBooking() {
        console.log("Booked")
    }

    return (
        <div>
            {host.doesBoarding ? 
            <div>
                
                <button onClick={handleBooking}>Book</button>
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookBoarding