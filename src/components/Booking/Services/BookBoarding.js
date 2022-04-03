
import React, {useEffect, useState, useMemo} from 'react'
import getHostById from "../../../services/host/getHostById"
import getUserById from '../../../services/user/getUserById'
import getBoardingById from '../../../services/boarding/getBoardingById'
import StripeContainer from '../../Stripe/StripeContainer'




function BookBoarding(props) {

    const [user, setUser] = useState({})
    const [host, setHost] = useState({})
    const [boarding, setBoarding] = useState({})
    const [book, setBook] = useState({})
    const [showItem, setShowItem] = useState(false)
    const [checked, setChecked] = useState([])

    const userId = localStorage.getItem("id")
    
    
    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host))
        getBoardingById(props.hostId).then((result) => {setBoarding(result.data.getBoardingById.boarding)})
        getUserById(userId).then((result) => setUser(result.data.getUserById.user))
        
    }, [])

    const data = [
        {
            "name": "Pet Bathing",
            "amount": boarding.bathingRate,

        },
        {
            "name": "Additional Dog",
            "amount": boarding.additionalDogRate,

        },
        {
            "name": "Additional Cat",
            "amount": boarding.additionalCatRate,

        },
        {
            "name": "Puppy",
            "amount": boarding.puppyRate,

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
            {host.doesBoarding ? 
            <div>
                {showItem ? <StripeContainer />
                :
                <>
                <div>
                    <div>Boarding Base Rate: ${boarding.baseRate}</div>
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
                    <div>Total: ${totalSum + boarding.baseRate}</div>
                    <button onClick={handleBooking}>Book</button>
                </>
                }
            </div> 

            : <div>"Host does not provide this service"</div>}
        </div>
        
    )
}

export default BookBoarding