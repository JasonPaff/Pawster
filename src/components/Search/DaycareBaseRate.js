
import React, { useState, useEffect} from 'react'
import getDaycareById from '../../services/daycare/getDaycareById'

function DaycareBaseRate(props) {
    const [daycare, setDaycare] = useState({})

    useEffect(() => {
        getDaycareById(props.hostId).then((result) => {setDaycare(result.data.getDaycareById.daycare)})
    }, [])

    return (
        <div>
            <p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${daycare.baseRate}</div><p className="text-xs">per day</p>
        </div>
    )
}

export default DaycareBaseRate