import React, { useState } from "react";
import { connect } from "react-redux";
import { RadioGroup } from "@headlessui/react";
import "../../styles/ServiceOptions.css";

import * as actionCreators from "../../store/action_creators/filterActionCreator";

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
  };
};

const data = {
  services: [
    {
      id: 1,
      name: "Services",
      options: [
        {
          id: 11,
          name: "doesBoarding",
          label: "Boarding",
          iconColor: "travel-color.png",
          iconContour: "travel-contour.png",
        },
        {
          id: 12,
          name: "doesHouseSitting",
          label: "Home Sitting",
          iconColor: "house-color.png",
          iconContour: "house-contour.png",
        },
        {
          id: 13,
          name: "doesDropInVisits",
          label: "Drop-in Visits",
          iconColor: "pet-bowl-color.png",
          iconContour: "pet-bowl-contour.png",
        },
        {
          id: 14,
          name: "doesDayCare",
          label: "Day Care",
          iconColor: "daycare-color.png",
          iconContour: "daycare-contour.png",
        },
        {
          id: 15,
          name: "doesDogWalking",
          label: "Dog Walking",
          iconColor: "dog-walking-color.png",
          iconContour: "dog-walking-contour.png",
        },
      ],
    },
  ],
  weights: [
    {
      id: 1,
      name: "Weights",
      options: [
        {
          id: "w1",
          title: "Small",
          weight: "1 - 15",
        },
        {
          id: "w2",
          title: "Medium",
          weight: "16 - 40",
        },
        {
          id: "w3",
          title: "Large",
          weight: "41 - 100",
        },
        {
          id: "w4",
          title: "Giant",
          weight: "101 - 200",
        },
      ],
    },
  ],
};

function ServiceOptions(props) {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState([]);
  props.onToggleService({ [selectedService]: true });

  const availableServices = data.services.map(({ id, name, options }) => {
    return (
      <RadioGroup key={id} value={selectedService} onChange={setSelectedService} className="flex gap-2 p-6 flex-wrap justify-around ">
        {options.map((opt, i) => {
          return (
            <RadioGroup.Option
              key={opt.id}
              value={opt.name}
              name={name}
              className={({ active, checked }) =>
                `flex rounded bg-white w-36 h-24 justify-center items-center cursor-pointer focus:outline-none border 
                ${active ? "ring-2 ring-offset-1 ring-offset-accent-red ring-white ring-opacity-60 " : ""}
                  ${checked ? "border-accent-red " : "border-slate-300 "}
                     `
              }
            >
              {({ checked }) => {
                return (
                  <span className={checked ? "text-accent-red" : "text-slate-600"}>
                    <img src={checked ? require("../../img/icons/" + opt.iconColor) : require("../../img/icons/" + opt.iconContour)} alt={opt.name} className=" h-10 mx-auto mb-2" />
                    {opt.label}
                  </span>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    );
  });

  const weightOptions = data.weights.map(({ id, name, options }) => {
    return (
      <RadioGroup key={id} value={selectedWeight} onChange={setSelectedWeight} className="flex gap-2 flex-wrap justify-around ">
        {options.map((opt, i) => {
          return (
            <RadioGroup.Option
              key={opt.id}
              value={opt.title}
              name={name}
              className={({ active, checked }) =>
                `flex rounded bg-white justify-center items-center cursor-pointer focus:outline-none border 
                ${active ? "ring-2 ring-offset-1 ring-offset-accent-red ring-white ring-opacity-60 " : ""}
                ${checked ? "border-accent-red " : "border-slate-300 "}
                `
              }
            >
              {({ checked }) => {
                return (
                  <div className="flex flex-col text-sm w-28 items-center p-2 border rounded">
                    <div className={checked ? "text-accent-red" : "text-slate-600"}>{opt.title}</div>
                    <div className={checked ? "text-accent-red" : "text-slate-600"}>{opt.weight} Lbs</div>
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    );
  });

  return (
    <div className="rounded overflow-hidden bg-background-light border border-slate-300 m-4">
      {/* TODO: filter by Dog and Cat  services   */}
      <div className="flex flex-row py-2 px-6 gap-2 items-center bg-background-darker">
        <p>I'm looking for service for my:</p>
        <label htmlFor="dog-services" className="inline text-base text-black">
          Dog
        </label>
        <input type="checkbox" className=" inline" id="dog-services" />
        <label htmlFor="cat-services" className="inline text-base text-black">
          Cat
        </label>
        <input type="checkbox" className=" inline" id="cat-services" />
      </div>
      <div>
        {availableServices}
        <div className="flex flex-row gap-4 p-6 justify-items-stretch">
          {weightOptions}
          <button className=" bg-accent-green text-white flex-1 ">Search</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(ServiceOptions);
