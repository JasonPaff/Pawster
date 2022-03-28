import React, { useState } from "react";
import { connect } from "react-redux";
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
        },
        {
          id: 12,
          name: "doesHouseSitting",
          label: "Home Sitting",
        },
        {
          id: 13,
          name: "doesDropInVisits",
          label: "Drop-in Visits",
        },
        {
          id: 14,
          name: "doesDayCare",
          label: "Day Care",
        },
        {
          id: 15,
          name: "doesDogWalking",
          label: "Dog Walking",
        },
      ],
    },
  ],
};

function ServiceOptions(props) {
  const availableServices = data.services.map(({ id, name, options }) => {
    return (
      <div key={id} className="flex bg-slate-500 gap-2 p-4">
        {/* <h2>{name}</h2> */}
        {options.map((opt) => {
          console.log(name);
          return (
            <div key={opt.id} className="bg-slate-300">
              <input type="radio" value={opt.name} name={name} onChange={() => props.onToggleService({ [opt.name]: true })} />
              {opt.label}
            </div>
          );
        })}
      </div>
    );
  });

  // radio updates global state in real time?

  return (
    <div className="rounded overflow-hidden bg-background-light border border-slate-300">
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
