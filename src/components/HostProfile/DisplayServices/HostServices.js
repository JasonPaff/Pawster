import React from "react";

export default function HostServices(props) {
    return (
      <>
          <div className="flex-col mb-3">
              <div className="border p-4">
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div className="text-xl font-medium">Boarding</div>
                          <div>${props.boarding.baseRate}</div>
                      </div>
                      <div className="flex justify-between">
                          <div className="text-gray-500">in the host's home</div>
                          <div className="text-gray-500">per night</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Holiday Rate</div>
                          <div>${props.boarding.holidayRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per night</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Additional Dog Rate</div>
                          <div>${props.boarding.additionalDogRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per night, per additional dog</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Additional Cat Rate</div>
                          <div>${props.boarding.additionalCatRate}</div>
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
                          <div>${props.boarding.catRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per night</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Bathing / Grooming</div>
                          <div>${props.boarding.bathingRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per bath</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Sitter Pick-Up and Drop-Off</div>
                          <div>${props.boarding.pickUpDropOffRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per round trip</div>
                      </div>
                  </div>
                  <div className="mb-4">
                      <div className="flex justify-between">
                          <div>Extended Care</div>
                          <div>${props.boarding.extendedCareRate}</div>
                      </div>
                      <div className="flex">
                          <div className="text-gray-500">per night</div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}