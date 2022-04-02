import React, { useState, useEffect} from 'react'
import getVisitById from '../../services/visit/getVisitById'


function VisitBaseRate(props) {

    const [visit, setVisit] = useState({})

    useEffect(() => {
        getVisitById(props.hostId).then((result) => setVisit(result.data.getVisitById.visit))
    }, [])

    return (
        <div>
            <p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${visit.baseRate}</div><p className="text-xs">per visit</p>        
        </div>
    )
}

export default VisitBaseRate