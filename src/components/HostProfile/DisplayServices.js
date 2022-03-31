import React, {useEffect, useState} from 'react'
import getHostById from '../../services/host/getHostById'
import getUserById from '../../services/user/getUserById'
import getBoardingById from '../../services/boarding/getBoardingById'
import getSittingById from '../../services/sitting/getSittingById'
import getVisitById from '../../services/visit/getVisitById'
import getDaycareById from '../../services/daycare/getDaycareById'
import getWalkingById from '../../services/walking/getWalkingById'
import Modal from 'react-modal'
import HostServices from "./DisplayServices/HostServices";
import SittingServices from "./DisplayServices/SittingServices";
import DropInServices from "./DisplayServices/DropInServices";
import DayCareServices from "./DisplayServices/DayCareServices";
import DogWalkingServices from "./DisplayServices/DogWalkingServices";
import BaseRateCard from "./DisplayServices/BaseRateCard";

function DisplayServices(props) {

    const [host, setHost] = useState({});
    const [user, setUser] = useState({});
    const [boarding, setBoarding] = useState({});
    const [sitting, setSitting] = useState({});
    const [visit, setVisit] = useState({});
    const [daycare, setDaycare] = useState({});
    const [walking, setWalking] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    useEffect(() => {
        getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host));
        getUserById(props.hostId).then((result) => setUser(result.data.getUserById.user));
        getBoardingById(props.hostId).then((result) => setBoarding(result.data.getBoardingById.boarding));
        getSittingById(props.hostId).then((result) => setSitting(result.data.getSittingById.sitting));
        getVisitById(props.hostId).then((result) => setVisit(result.data.getVisitById.visit));
        getDaycareById(props.hostId).then((result) => setDaycare(result.data.getDaycareById.daycare));
        getWalkingById(props.hostId).then((result) => setWalking(result.data.getWalkingById.walking));
    }, []);

    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }
    function afterOpenModal() { subtitle.style.color = '#f00'; }

    const modalStyles = {
        content: {
            top: '50%', left: '50%', right: 'auto', bottom: 'auto',
            marginRight: '-50%', transform: 'translate(-50%, -50%)',
            width: '30vw', overflowY: 'auto', maxHeight: 'calc(100vh - 210px)',
        },
    };

    return (
        <div className="flex-col p-1">
            {host.doesBoarding && <BaseRateCard
                title="Boarding" baseRate={boarding.baseRate}
                tagLineOne="in the host's home" tagLineTwo="per night"/>}

            {host.doesHouseSitting && <BaseRateCard
                title="Home Sitting" baseRate={sitting.baseRate}
                tagLineOne="in your home" tagLineTwo="per visit"/>}

            {host.doesDropInVisits && <BaseRateCard
                title="Drop-in Visits" baseRate={visit.baseRate}
                tagLineOne="visits in your home" tagLineTwo="per visit"/>}

            {host.doesDayCare && <BaseRateCard
                title="Day Care" baseRate={daycare.baseRate}
                tagLineOne="in the host's home" tagLineTwo="per day"/>}

            {host.doesDogWalking && <BaseRateCard
                title="Dog Walking" baseRate={walking.baseRate}
                tagLineOne="in your neighborhood" tagLineTwo="per walk"/>}

            <div>
                <button className="cursor-pointer" onClick={openModal}>See Additional Rates</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={modalStyles}
                    contentLabel="Example Modal"
                >
                    <div className="flex-col">
                        <div className="flex justify-between text-xl font-medium mb-6">
                            {user.firstName}'s Rates
                            <a className="cursor-pointer" onClick={closeModal}>X</a>
                        </div>
                        {host.doesBoarding && <HostServices boarding={boarding}/>}
                        {host.doesHouseSitting && <SittingServices sitting={sitting}/>}
                        {host.doesDropInVisits && <DropInServices visit={visit}/>}
                        {host.doesDayCare && <DayCareServices daycare={daycare}/>}
                        {host.doesDogWalking && <DogWalkingServices walking={walking}/>}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default DisplayServices