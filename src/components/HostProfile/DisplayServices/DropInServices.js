import React from "react";

export default function DropInServices(props) {
    return (
        <>
            <div className="flex-col mb-3">
                <div className="border p-4">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="text-xl font-medium">Drop-In Visits</div>
                            <div>${props.visit.baseRate}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-gray-500">visits in your home</div>
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Holiday Rate</div>
                            <div>${props.visit.holidayRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Additional Dog Rate</div>
                            <div>${props.visit.additionalDogRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night, per additional dog</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Additional Cat Rate</div>
                            <div>${props.visit.additionalCatRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Puppy Rate</div>
                            <div>${props.visit.puppyRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Cat Care</div>
                            <div>${props.visit.catRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Bathing / Grooming</div>
                            <div>${props.visit.bathingRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per bath</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}