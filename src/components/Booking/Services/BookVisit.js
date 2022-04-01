import React, {useEffect, useState} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getVisitById from '../../../services/visit/getVisitById'


function BookVisit(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [visit, setVisit] = useState({})
    const [book, setBook] = useState({})

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getVisitById(props.hostId).then((result) => setVisit(result.data.getVisitById.visit))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])


    function handleBooking() {
        console.log("Booked")
    }

    return (
        <div>
            {host.doesDropInVisits ? 
            <div>
                
                <button onClick={handleBooking}>Book</button>
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookVisit