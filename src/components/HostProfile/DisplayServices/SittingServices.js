import React from "react";

export default function SittingServices(props) {
    return (
        <>
            <div className="flex-col mb-3">
                <div className="border p-4">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="text-xl font-medium">Home Sitting</div>
                            <div>${props.sitting.baseRate}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-gray-500">in your home</div>
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Holiday Rate</div>
                            <div>${props.sitting.holidayRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Additional Dog Rate</div>
                            <div>${props.sitting.additionalDogRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night, per additional dog</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Additional Cat Rate</div>
                            <div>${props.sitting.additionalCatRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Puppy Rate</div>
                            <div>${props.sitting.puppyRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Cat Care</div>
                            <div>${props.sitting.catRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Bathing / Grooming</div>
                            <div>${props.sitting.bathingRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per bath</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Extended Care</div>
                            <div>${props.sitting.extendedCareRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}