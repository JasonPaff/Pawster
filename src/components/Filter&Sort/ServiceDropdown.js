import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action_creators/filterActionCreator";

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
  };
};

function ServiceDropdown(props) {
  // const [selected, setSelected] = useState(data[0]);
  // props.onToggleService({ [selected]: true });

  // const availableServices = data.services.map(({ id, name, options }) => {
  //   return <option key={id}></option>;
  // });

  return (
    <select>
      <option value={true}>Boarding</option>
      <option value={true}>Home Sitting</option>
      <option value={true}>Drop-in Visits</option>
      <option value={true}>Day Care</option>
      <option value={true}>Dog Walking</option>
    </select>
  );
}

export default connect(null, mapDispatchToProps)(ServiceDropdown);
