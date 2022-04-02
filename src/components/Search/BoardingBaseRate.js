import React, { useState, useEffect} from 'react'
import getBoardingById from '../../services/boarding/getBoardingById'


function DaycareBaseRate(props) {

    const [boarding, setBoarding] = useState({})

    useEffect(() => {
        getBoardingById(props.hostId).then((result) => setBoarding(result.data.getBoardingById.boarding))
    }, [])

    return (
        <div>
            <p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${boarding.baseRate}</div><p className="text-xs">per night</p>       
        </div>
    )
}

export default DaycareBaseRate