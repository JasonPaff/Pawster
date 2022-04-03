import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import hostsFilter from '../utils/hostsFilter'
import getAllHosts from '../services/host/getAllHosts'
import * as actionCreators from '../store/action_creators/actionCreators'
import HostListProfilePic from './HostListProfilePic'
import SearchBaseRate from './Search/SearchBaseRate'


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
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHost: (hosts) => dispatch(actionCreators.getHosts(hosts)),
    onGetFilteredHosts:  (filteredHosts) => dispatch(actionCreators.getFilteredHosts(filteredHosts))
  }
}

function DisplayHosts(props) {
  const [filteredHosts, setFilteredHosts] = useState(props.hosts)

  useEffect(() => {
    if (props.hosts.length === 0) {
      getAllHosts().then((result) => {
        const users = result.data.getHostUsers.users
        const hosts = result.data.getAllHosts.hosts
        const addresses = result.data.getHostAddresses.addresses
        const userHosts = users.map(user => {
          const host = hosts.find(h => h.userId === user.id)
          const address = addresses.find(a => a.userId === user.id)
          return {
            ...user,
            ...host,
            ...address
          }
        })
        props.onGetHost(userHosts)
      })
    }
    let hosts = [...props.hosts]
    hosts = hostsFilter(
      props.hosts, props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
      props.doesDayCare, props.doesDogWalking, props.canHostMultiplePets,
      props.canHostUnspayedFemales, props.hasChildren, props.hasOtherPets,
      props.isHomeFullTime, props.isSmoking, props.canHostSmallPet, props.canHostMediumPet,
      props.canHostLargePet, props.canHostGiantPet
    )
    setFilteredHosts(hosts)
    props.onGetFilteredHosts(hosts)
  },[
    props.hosts, props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
    props.doesDayCare, props.doesDogWalking, props.canHostMultiplePets,
    props.canHostUnspayedFemales, props.hasChildren, props.hasOtherPets,
    props.isHomeFullTime, props.isSmoking, props.canHostSmallPet, props.canHostMediumPet,
    props.canHostLargePet, props.canHostGiantPet
  ])

  const hosts = filteredHosts.map((host, index) => {
      return <NavLink key={index} to={`/profile/host/${host.id}`}>
        <li className="flex p-5 border">
          <div className="">
            <HostListProfilePic hostId={host.id}/>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex-col ml-5">
              <div className="text-xl font-medium">{index + 1}. {host.firstName}</div>
              <div className="text-xs mt-2">{host.city}, {host.state} {host.zipcode}</div>
            </div>
            <SearchBaseRate hostId={host.id} />
          </div>
        </li>
        </NavLink>
  })

  return (
    <div className="flex-col p-2 border list-none w-full overflow-auto">
      {hosts}
    </div>
  );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DisplayHosts);