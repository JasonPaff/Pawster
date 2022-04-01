import React, {useEffect, useState} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getSittingById from '../../../services/sitting/getSittingById'


function BookSitting(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [sitting, setSitting] = useState({})
    const [book, setBook] = useState({})

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getSittingById(props.hostId).then((result) => setSitting(result.data.getSittingById.sitting))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])


    function handleBooking() {
        console.log("Booked")
    }

    return (
        <div>
            {host.doesHouseSitting ? 
            <div>
                
                <button onClick={handleBooking}>Book</button>
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookSitting