import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DaycareBaseRate from "./DaycareBaseRate";
import BoardingBaseRate from "./BoardingBaseRate";
import HouseSittingBaseRate from "./HouseSittingBaseRate";
import VisitBaseRate from "./VistitsBaseRate";
import WalkingBaseRate from "./WalkingBaseRate";

const mapStateToProps = (state) => {
  return {
    doesBoarding: state.filtersRed.doesBoarding,
    doesHouseSitting: state.filtersRed.doesHouseSitting,
    doesDropInVisits: state.filtersRed.doesDropInVisits,
    doesDayCare: state.filtersRed.doesDayCare,
    doesDogWalking: state.filtersRed.doesDogWalking,
  };
};

function SearchBaseRate(props) {
  return (
    <div className="flex-col justify-center truncate">
      {props.doesBoarding ? <BoardingBaseRate hostId={props.hostId} /> : null}
      {props.doesHouseSitting ? <HouseSittingBaseRate hostId={props.hostId} /> : null}
      {props.doesDropInVisits ? <VisitBaseRate hostId={props.hostId} /> : null}
      {props.doesDayCare ? <DaycareBaseRate hostId={props.hostId} /> : null}
      {props.doesDogWalking ? <WalkingBaseRate hostId={props.hostId} /> : null}
    </div>
  );
}

export default connect(mapStateToProps)(SearchBaseRate);
