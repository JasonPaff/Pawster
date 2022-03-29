import React, { useState } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/action_creators/filterActionCreator";
import CardServiceComponent from "./CardServiceComponent";
import CardWeightsComponent from "./CardWeightsComponent";

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
  };
};

function ServiceOptions(props) {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState([]);
  props.onToggleService({ [selectedService]: true });

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
        <CardServiceComponent selectedService={selectedService} setSelectedService={setSelectedService} />
        <div className="flex flex-row gap-4 p-6 justify-items-stretch">
          <CardWeightsComponent selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} />
          <button className=" bg-accent-green text-white flex-1 text-lg ">Search</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(ServiceOptions);
