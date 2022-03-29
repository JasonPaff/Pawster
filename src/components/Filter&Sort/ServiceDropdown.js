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



function ServiceDropdown(props) {
    const [selected, setSelected] = useState(data[0]);
    props.onToggleService({ [selected]: true });

    const availableServices = data.services.map(({id, name, options}) => {
        return <option key={id}></option>
    })

  return (
    <select value={selected} onChange={setSelected}>
        <option value={true}>Boarding</option>
        <option value={true}>Home Sitting</option>
        <option value={true}>Drop-in Visits</option>
        <option value={true}>Day Care</option>
        <option value={true}>Dog Walking</option>
    </select>
  );
}

export default connect(null, mapDispatchToProps)(ServiceDropdown);
