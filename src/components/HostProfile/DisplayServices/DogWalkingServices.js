import React from "react";

export default function DogWalkingServices(props) {
    return (
        <>
            <div className="flex-col mb-3">
                <div className="border p-4">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="text-xl font-medium">Dog Walking</div>
                            <div>${props.walking.baseRate}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-gray-500">in your neighborhood</div>
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Holiday Rate</div>
                            <div>${props.walking.holidayRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Additional Dog Rate</div>
                            <div>${props.walking.additionalDogRate}</div>
                        </div>
                        <div className="flex">
                            <div className="text-gray-500">per night, per additional dog</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>Puppy Rate</div>
                            <div>${props.walking.puppyRate}</div>
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