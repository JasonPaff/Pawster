import React, { useState, useEffect} from 'react'
import getWalkingById from '../../services/walking/getWalkingById'


function WalkingBaseRate(props) {

    const [walking, setWalking] = useState({})

    useEffect(() => {
        getWalkingById(props.hostId).then((result) => setWalking(result.data.getWalkingById.walking))
    }, [])

    return (
        <div>
            <p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${walking.baseRate}</div><p className="text-xs">per walk</p>       
        </div>
    )
}

export default WalkingBaseRate