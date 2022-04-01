import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import getBoardingById from '../services/boarding/getBoardingById'
import getWalkingById from '../services/walking/getWalkingById'
import getSittingById from '../services/sitting/getSittingById'
import getVisitById from '../services/visit/getVisitById'
import getDaycareById from '../services/daycare/getDaycareById'

const mapStateToProps = (state) => {
    return {
      doesBoarding: state.filtersRed.doesBoarding,
      doesHouseSitting: state.filtersRed.doesHouseSitting,
      doesDropInVisits: state.filtersRed.doesDropInVisits,
      doesDayCare: state.filtersRed.doesDayCare,
      doesDogWalking: state.filtersRed.doesDogWalking,
    }
}

function SearchBaseRate(props) {

    const [boarding, setBoarding] = useState({})
    const [daycare, setDaycare] = useState({})
    const [sitting, setSitting] = useState({})
    const [visit, setVisit] = useState({})
    const [walking, setWalking] = useState({})

    useEffect(() => {
        getBoardingById(props.hostId).then((result) => setBoarding(result.data.getBoardingById.boarding))
        getWalkingById(props.hostId).then((result) => setWalking(result.data.getWalkingById.walking))
        getSittingById(props.hostId).then((result) => setSitting(result.data.getSittingById.sitting))
        getVisitById(props.hostId).then((result) => setVisit(result.data.getVisitById.visit))
        getDaycareById(props.hostId).then((result) => setDaycare(result.data.getDaycareById.daycare))
    }, [])
    
    console.log(sitting)

    return (
        <div className="flex-col justify-center">
            
            {props.doesBoarding ? <><p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${boarding.baseRate}</div><p className="text-xs">per night</p></> : null}
            {props.doesHouseSitting ? <><p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${sitting.baseRate}</div><p className="text-xs">per night</p></> : null}
            {props.doesDropInVisits ? <><p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${visit.baseRate}</div><p className="text-xs">per night</p></> : null}
            {props.doesDayCare ? <><p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${daycare.baseRate}</div><p className="text-xs">per night</p></> : null}
            {props.doesDogWalking ? <><p className="text-xs">from</p><div className="text-xl font-bold text-emerald-600">${walking.baseRate}</div><p className="text-xs">per night</p></> : null}
        </div>
    )
}

export default connect(mapStateToProps)(SearchBaseRate)