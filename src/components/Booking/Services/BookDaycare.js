import React, {useEffect, useState, useMemo} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getDaycareById from '../../../services/daycare/getDaycareById'
import StripeContainer from '../../Stripe/StripeContainer'


function BookDaycare(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [daycare, setDaycare] = useState({})
    const [book, setBook] = useState({})
    const [showItem, setShowItem] = useState(false)
    const [checked, setChecked] = useState([])


    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getDaycareById(props.hostId).then((result) => setDaycare(result.data.getDaycareById.daycare))
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
    }, [])

    const data = [
        {
            "name": "Pet Bathing",
            "amount": daycare.bathingRate,

        },
        {
            "name": "Additional Dog",
            "amount": daycare.additionalDogRate,

        },
        {
            "name": "Additional Cat",
            "amount": daycare.additionalCatRate,

        },
        {
            "name": "Puppy",
            "amount": daycare.puppyRate,

        },

    ]

    const totalSum = useMemo(
        () =>
          Object.entries(checked).reduce(
            (accumulator, [name, value]) =>
              value
                ? accumulator +
                  data.find(
                    (service) => service.name + "" === name
                  ).amount
                : accumulator,
            0
          ),
        [checked]
    );


    function handleBooking() {
        setShowItem(true)
    }

    return (
        <div className="w-3/5">
            {host.doesDayCare ? 
            <div>
                {showItem ? <StripeContainer />
                :
                <>
                <div>
                    <div>Day Care Base Rate: ${daycare.baseRate}</div>
                    <div className="underline">Add ons: </div>
                    <div>
                        {data.map(({ name, amount }) => {
                        return (
                            <div>
                            <label>
                                <input
                                className="mr-2"
                                type="checkbox"
                                defaultChecked={!!checked[name]}
                                onChange={() => {
                                    setChecked({
                                    ...checked,
                                    [name]: !checked[name]
                                    });
                                }}
                                />
                                {name}: ${amount}
                            </label>
                            </div>
                        );
                        })}
                    </div>
                </div>
                    <div>Total: ${totalSum + daycare.baseRate}</div>
                    <button onClick={handleBooking}>Book</button>
                </>
                }
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookDaycare