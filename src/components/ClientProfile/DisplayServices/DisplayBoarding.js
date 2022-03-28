import React, {useState, useEffect} from 'react'
import getBoarding from '../../../services/boarding/getBoarding';
import { NavLink } from 'react-router-dom'

function DisplayBoarding() {

    const [boarding, setBoarding] = useState({})

    useEffect(() => {
        getBoarding().then((result) => {setBoarding(result.data.getBoarding.boarding)})
    },[])

    return (
        <div className="flex-col justify-center">
        <h3>Boarding</h3>
        Base rate: ${boarding.baseRate}
        <NavLink className="text-sky-400" to="/profile/edit-boarding"> Edit</NavLink>
         
        </div>
    );
}

export default DisplayBoarding;