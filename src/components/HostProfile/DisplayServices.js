import React, { useEffect, useState } from 'react'
import getHostById from '../../services/host/getHostById'
import getUserById from '../../services/user/getUserById'
import getBoardingById from '../../services/boarding/getBoardingById'
import getSittingById from '../../services/sitting/getSittingById'
import getVisitById from '../../services/visit/getVisitById'
import getDaycareById from '../../services/daycare/getDaycareById'
import getWalkingById from '../../services/walking/getWalkingById'
import Modal from 'react-modal'

function DisplayServices(props) {

    const [host, setHost] = useState({})
    const [user, setUser] = useState({})
    const [boarding, setBoarding] = useState({})
    const [sitting, setSitting] = useState({})
    const [visit, setVisit] = useState({})
    const [daycare, setDaycare] = useState({})
    const [walking, setWalking] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    useEffect(() => {
        getHostById(props.hostId).then((result) => {setHost(result.data.getHostById.host)})
        getUserById(props.hostId).then((result) => {setUser(result.data.getUserById.user)})
        getBoardingById(props.hostId).then((result) => {setBoarding(result.data.getBoardingById.boarding)})
        getSittingById(props.hostId).then((result) => {if (result.data.getSittingById.success) setSitting(result.data.getSittingById.sitting)})
        getVisitById(props.hostId).then((result) => {setVisit(result.data.getVisitById.visit)})
        getDaycareById(props.hostId).then((result) => {setDaycare(result.data.getDaycareById.daycare)})
        getWalkingById(props.hostId).then((result) => {setWalking(result.data.getWalkingById.walking)})

    },[])


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '30vw',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 210px)',
        },
    };


    return (
        <div className="flex-col p-1">
            {host.doesBoarding === true ?
            <div className="flex-col mb-3">
                <div className="flex justify-between">
                    <div>Boarding</div>
                    <div>${boarding.baseRate}</div>
                </div>
                <div className="flex justify-between">
                    <div>in the host's home</div>
                    <div>per night</div>
                </div>
            </div>
            : null}

            {host.doesHouseSitting === true ?
            <div className="flex-col mb-3">
                <div className="flex justify-between">
                    <div>Home Sitting</div>
                    <div>${sitting.baseRate}</div>
                </div>
                <div className="flex justify-between">
                    <div>in your home</div>
                    <div>per visit</div>
                </div>
            </div>
            : null}

            {host.doesDropInVisits === true ?
            <div className="flex-col mb-3">
                <div className="flex justify-between">
                    <div>Drop-in Visits</div>
                    <div>${visit.baseRate}</div>
                </div>
                <div className="flex justify-between">
                    <div>visits in your home</div>
                    <div>per visit</div>
                </div>
            </div>
            : null}

            {host.doesDayCare === true ?
            <div className="flex-col mb-3">
                <div className="flex justify-between">
                    <div>Day Care</div>
                    <div>${daycare.baseRate}</div>
                </div>
                <div className="flex justify-between">
                    <div>in the host's home</div>
                    <div>per day</div>
                </div>
            </div>
            : null}

            {host.doesDogWalking === true ?
            <div className="flex-col mb-3">
                <div className="flex justify-between">
                    <div>Dog Walking</div>
                    <div>${walking.baseRate}</div>
                </div>
                <div className="flex justify-between">
                    <div>in your neighborhood</div>
                    <div>per walk</div>
                </div>
            </div>
            : null}

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
                        <a className="cursor-pointer"onClick={closeModal}>X</a>
                        </div>

                        {host.doesBoarding === true ?
                        <div className="flex-col mb-3">
                            <div className="border p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-medium">Boarding</div>
                                        <div>${boarding.baseRate}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500">in the host's home</div>
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Holiday Rate</div>
                                        <div>${boarding.holidayRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Dog Rate</div>
                                        <div>${boarding.additionalDogRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night, per additional dog</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Cat Rate</div>
                                        <div>${boarding.additionalCatRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                {/* <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Puppy Rate</div>
                                        <div>${boarding}</div>
                                    </div>
                                    <div className="flex">
                                        <div>per night</div>
                                    </div>
                                </div> */}
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Cat Care</div>
                                        <div>${boarding.catRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Bathing / Grooming</div>
                                        <div>${boarding.bathingRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per bath</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Sitter Pick-Up and Drop-Off</div>
                                        <div>${boarding.pickUpDropOffRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per round trip</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Extended Care</div>
                                        <div>${boarding.extendedCareRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                        {host.doesHouseSitting === true ?
                        <div className="flex-col mb-3">
                            <div className="border p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-medium">Home Sitting</div>
                                        <div>${sitting.baseRate}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500">in your home</div>
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Holiday Rate</div>
                                        <div>${sitting.holidayRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Dog Rate</div>
                                        <div>${sitting.additionalDogRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night, per additional dog</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Cat Rate</div>
                                        <div>${sitting.additionalCatRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Puppy Rate</div>
                                        <div>${sitting.puppyRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Cat Care</div>
                                        <div>${sitting.catRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Bathing / Grooming</div>
                                        <div>${sitting.bathingRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per bath</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Extended Care</div>
                                        <div>${sitting.extendedCareRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                        {host.doesDropInVisits === true ?
                        <div className="flex-col mb-3">
                            <div className="border p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-medium">Drop-In Visits</div>
                                        <div>${visit.baseRate}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500">visits in your home</div>
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Holiday Rate</div>
                                        <div>${visit.holidayRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Dog Rate</div>
                                        <div>${visit.additionalDogRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night, per additional dog</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Cat Rate</div>
                                        <div>${visit.additionalCatRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Puppy Rate</div>
                                        <div>${visit.puppyRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Cat Care</div>
                                        <div>${visit.catRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Bathing / Grooming</div>
                                        <div>${visit.bathingRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per bath</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                        {host.doesDayCare === true ?
                        <div className="flex-col mb-3">
                            <div className="border p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-medium">Day Care</div>
                                        <div>${daycare.baseRate}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500">in the host's home</div>
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Holiday Rate</div>
                                        <div>${daycare.holidayRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Dog Rate</div>
                                        <div>${daycare.additionalDogRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night, per additional dog</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Cat Rate</div>
                                        <div>${daycare.additionalCatRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Puppy Rate</div>
                                        <div>${daycare.puppyRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Cat Care</div>
                                        <div>${daycare.catRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Bathing / Grooming</div>
                                        <div>${daycare.bathingRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per bath</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Sitter Pick-Up and Drop-Off</div>
                                        <div>${daycare.pickUpDropOffRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per round trip</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                        {host.doesDogWalking === true ?
                        <div className="flex-col mb-3">
                            <div className="border p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-medium">Dog Walking</div>
                                        <div>${walking.baseRate}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500">in your neighborhood</div>
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Holiday Rate</div>
                                        <div>${walking.holidayRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Additional Dog Rate</div>
                                        <div>${walking.additionalDogRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night, per additional dog</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>Puppy Rate</div>
                                        <div>${walking.puppyRate}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="text-gray-500">per night</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                    </div>

                </Modal>
            </div>
        </div>
    )

}

export default DisplayServices