import React, {useState, useEffect} from 'react'
import getBoarding from '../../../services/boarding/getBoarding';


function DisplayBoarding() {

    const [boarding, setBoarding] = useState({})

    useEffect(() => {
        getBoarding().then((result) => {setBoarding(result.data.getBoarding.boarding)})
    },[])

    return (
        <div className="flex-col justify-center">
        <h3>Boarding</h3>
         Base rate: ${boarding.baseRate}
        </div>
    );
}

export default DisplayBoarding;