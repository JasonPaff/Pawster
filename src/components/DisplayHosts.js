import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import hostsFilter from "../utils/hostsFilter";
import getAllHosts from "../services/host/getAllHosts";
import * as actionCreators from "../store/action_creators/actionCreators";
import HostListProfilePic from "./HostListProfilePic";
import SearchBaseRate from "./Search/SearchBaseRate";

// needs to put the addresses of the hosts in a separate array, global state, and passed onto the maps to set pins

const mapStateToProps = (state) => {
  return {
    hosts: state.hostsRed.hosts,
    doesBoarding: state.filtersRed.doesBoarding,
    doesHouseSitting: state.filtersRed.doesHouseSitting,
    doesDropInVisits: state.filtersRed.doesDropInVisits,
    doesDayCare: state.filtersRed.doesDayCare,
    doesDogWalking: state.filtersRed.doesDogWalking,
    canHostMultiplePets: state.filtersRed.canHostMultiplePets,
    canHostUnspayedFemales: state.filtersRed.canHostUnspayedFemales,
    hasChildren: state.filtersRed.hasChildren,
    hasOtherPets: state.filtersRed.hasOtherPets,
    isHomeFullTime: state.filtersRed.isHomeFullTime,
    isSmoking: state.filtersRed.isSmoking,
    canHostSmallPet: state.filtersRed.canHostSmallPet,
    canHostMediumPet: state.filtersRed.canHostMediumPet,
    canHostLargePet: state.filtersRed.canHostLargePet,
    canHostGiantPet: state.filtersRed.canHostGiantPet,
    doesCat: state.filtersRed.doesCat,
    doesDog: state.filtersRed.doesDog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHost: (hosts) => dispatch(actionCreators.getHosts(hosts)),
    onGetFilteredHosts: (filteredHosts) => dispatch(actionCreators.getFilteredHosts(filteredHosts)),
  };
};

function DisplayHosts(props) {
  const [filteredHosts, setFilteredHosts] = useState(props.hosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (props.hosts.length === 0) {
      getAllHosts().then((result) => {
        const users = result.data.getHostUsers.users;
        const hosts = result.data.getAllHosts.hosts;
        const addresses = result.data.getHostAddresses.addresses;
        const userHosts = users.map((user) => {
          if (mounted) {
            setLoading(false);
            const host = hosts.find((h) => h.userId === user.id);
            const address = addresses.find((a) => a.userId === user.id);
            return {
              ...user,
              ...host,
              ...address,
            };
          }
        });
        props.onGetHost(userHosts);
      });
      return function cleanup() {
        mounted = false;
      };
    }
    let hosts = [...props.hosts];
    hosts = hostsFilter(
      props.hosts,
      props.doesBoarding,
      props.doesHouseSitting,
      props.doesDropInVisits,
      props.doesDayCare,
      props.doesDogWalking,
      props.canHostMultiplePets,
      props.canHostUnspayedFemales,
      props.hasChildren,
      props.hasOtherPets,
      props.isHomeFullTime,
      props.isSmoking,
      props.canHostSmallPet,
      props.canHostMediumPet,
      props.canHostLargePet,
      props.canHostGiantPet,
      props.doesCat,
      props.doesDog
    );
    setFilteredHosts(hosts);
    props.onGetFilteredHosts(hosts);
  }, [
    props.hosts,
    props.doesBoarding,
    props.doesHouseSitting,
    props.doesDropInVisits,
    props.doesDayCare,
    props.doesDogWalking,
    props.canHostMultiplePets,
    props.canHostUnspayedFemales,
    props.hasChildren,
    props.hasOtherPets,
    props.isHomeFullTime,
    props.isSmoking,
    props.canHostSmallPet,
    props.canHostMediumPet,
    props.canHostLargePet,
    props.canHostGiantPet,
    props.doesCat,
    props.doesDog,
  ]);

  const hosts = filteredHosts.map((host, index) => {
    return (
      <NavLink key={index} to={`/profile/host/${host.id}`}>
        <li className="flex flex-col  lg:flex-row p-4 bg-gray-50 hover:bg-white border border-slate-200 rounded-md hover:shadow-md hover:border-slate-300 hover:text-green-900">
          <div className="flex-shrink-0">
            <HostListProfilePic imgStyle={"w-24 h-24 object-cover rounded-md mx-auto"} hostId={host.id} />
          </div>
          <div className="flex flex-row  justify-between w-full">
            <div className="flex flex-col sm:ml-5 ">
              <div className="text-xl font-medium">
                {index + 1}. {host.firstName}
              </div>
              <div className="text-sm ">
                {host.city}, {host.state} {host.zipcode}
              </div>
              <div className="text-sm"> Experience: {host.experience} </div>
              <div className="text-sm"> Can Host: {host.totalCanHost} </div>
            </div>
            <SearchBaseRate hostId={host.id} />
          </div>
        </li>
      </NavLink>
    );
  });

  return <ul className="flex flex-col p-4 gap-2 ">{hosts}</ul>;
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayHosts);
