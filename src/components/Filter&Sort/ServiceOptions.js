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
};

function ServiceOptions(props) {
  const [selected, setSelected] = useState(data[0]);
  props.onToggleService({ [selected]: true });

  const availableServices = data.services.map(({ id, name, options }) => {
    return (
      <RadioGroup key={id} value={selected} onChange={setSelected} className="flex gap-2 p-6 flex-wrap justify-around ">
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

  // radio updates global state in real time?

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

        <div className="flex space-x-20">
          <div>
            <label htmlFor="radio1">Option 1</label>
            <input className="radioInput" type="radio" name="serviceType" id="radio1"></input>
          </div>
          <div>
            <label htmlFor="radio2">Option 2</label>
            <input className="radioInput" type="radio" name="serviceType" id="radio2"></input>
          </div>
          <div>
            <label htmlFor="radio3">Option 3</label>
            <input className="radioInput" type="radio" name="serviceType" id="radio3"></input>
          </div>
          <div>
            <label htmlFor="radio4">Option 4</label>
            <input className="radioInput" type="radio" name="serviceType" id="radio4"></input>
          </div>
          <div>
            <label htmlFor="radio5">Option 5</label>
            <input className="radioInput" type="radio" name="serviceType" id="radio5"></input>
          </div>
        </div>
      </div>
      <button>Search</button>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(ServiceOptions);
