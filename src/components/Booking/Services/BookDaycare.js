import React, {useEffect, useState} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getDaycareById from '../../../services/daycare/getDaycareById'


function BookDaycare(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [daycare, setDaycare] = useState({})
    const [book, setBook] = useState({})

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getDaycareById(props.hostId).then((result) => setDaycare(result.data.getDaycareById.daycare))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])


    function handleBooking() {
        console.log("Booked")
    }

    return (
        <div>
            {host.doesDayCare ? 
            <div>
                <button onClick={handleBooking}>Book</button>
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookDaycare