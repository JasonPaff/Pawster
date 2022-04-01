import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import getHostById from '../services/host/getHostById'
import CardServiceComponent from '../components/Filter&Sort/CardServiceComponent'
import * as actionCreators from "../store/action_creators/filterActionCreator";
import { data } from "../components/Filter&Sort/data";
import BookBoarding from '../components/Booking/Services/BookBoarding'
import BookSitting from '../components/Booking/Services/BookSitting'
import BookVisit from '../components/Booking/Services/BookVisit'
import BookWalking from '../components/Booking/Services/BookWalking'
import BookDaycare from '../components/Booking/Services/BookDaycare'

const mapStateToProps = (state) => {
    return {
      doesBoarding: state.filtersRed.doesBoarding,
      doesHouseSitting: state.filtersRed.doesHouseSitting,
      doesDropInVisits: state.filtersRed.doesDropInVisits,
      doesDayCare: state.filtersRed.doesDayCare,
      doesDogWalking: state.filtersRed.doesDogWalking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
    };
  };

function BookHost(props) {

    const params = useParams()
    const [host, setHost] = useState({})
    
    const [selectedService, setSelectedService] = useState(data.services[0]);
    
    useEffect(() => {
        getHostById(params.hostId).then((result) => setHost(result.data.getHostById.host))
    }, [])

    props.onToggleService({ [selectedService.name]: true });


    return (
        <div className="flex justify-center p-14">
            <div className="flex-col justify-center ">
                <h1>Book Host</h1>
                <div>
                    <CardServiceComponent selectedService={selectedService} setSelectedService={setSelectedService} />
                </div>
                <div className="flex justify-center p-14">
                    {props.doesBoarding ? <BookBoarding hostId={params.hostId}/> : null}
                    {props.doesHouseSitting ? <BookSitting hostId={params.hostId}/> : null}
                    {props.doesDropInVisits ? <BookVisit hostId={params.hostId}/> : null}
                    {props.doesDayCare ? <BookDaycare hostId={params.hostId}/> : null}
                    {props.doesDogWalking ? <BookWalking hostId={params.hostId}/> : null}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BookHost)