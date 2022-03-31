import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action_creators/filterActionCreator";
import { Listbox, Transition } from "@headlessui/react"

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
  };
};

const mapStateToProps = (state) => {
  return {
    boarding: state.filtersRed.doesBoarding,
    houseSitting: state.filtersRed.doesHouseSitting,
    dropInVisits: state.filtersRed.doesDropInVisits,
    dayCare: state.filtersRed.doesDayCare,
    dogWalking: state.filtersRed.doesDogWalking,

  }
}

const services =[
    {name:"doesBoarding", label:"Boarding"}, 
    {name:"doesHouseSitting", label:"Home Sitting"}, 
    {name:"doesDropInVisits", label:"Drop-In Visits"}, 
    {name:"doesDayCare", label:"Day Care"}, 
    {name:"doesDogWalking", label:"Dog Walking"}
  ]

function ServiceDropdown(props) {

  const [selectedService, setSelectedService] = useState("Boarding")

  useEffect(() => {
    if (props.boarding) {
      setSelectedService("Boarding")
    } else if (props.houseSitting){
      setSelectedService("Home Sitting")
    } else if (props.dropInVisits){
      setSelectedService("Drop-In Visits")
    } else if (props.dayCare){
      setSelectedService("Day Care")
    } else if (props.dogWalking){
      setSelectedService("Dog Walking")
    }
  }, [])

  function handleChange(value) {
    props.onToggleService({ [value.name]: true })
    setSelectedService(value.label)
  }
  
  
  return (
    <div>
      <Listbox as="div" value={selectedService} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="text-sm font-medium text-gray-700">
              Services
            </Listbox.Label>
            <div className="relative">
              <span className="inline-block w-full">
                <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800">
                  <span className="block truncate">{selectedService}</span>
                </Listbox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="border border-gray-300 rounded mt-1"
                >
                  {services.map((service) => (
                    <Listbox.Option key={service.name} value={service}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-white bg-green-600"
                              : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-10 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {service.label}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-green-600"
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDropdown);
