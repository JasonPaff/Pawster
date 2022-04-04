import React, { useState, useEffect} from 'react'
import getSittingById from '../../services/sitting/getSittingById'


function HouseSittingBaseRate(props) {

    const [sitting, setSitting] = useState({})

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        getSittingById(props.hostId).then((result) => {
            if (mounted) {
                setLoading(false)
                setSitting(result.data.getSittingById.sitting)
            }
        })
        return function cleanup() {
            mounted = false
          }
    }, [])

    return (
        <div>
            <p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${sitting.baseRate}</div><p className="text-xs">per visit</p>
        </div>
    )
}

export default HouseSittingBaseRate