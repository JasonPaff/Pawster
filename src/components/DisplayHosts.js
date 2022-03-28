import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import hostsFilter from '../utils/hostsFilter'
import getAllHosts from '../services/host/getAllHosts'
import * as actionCreators from '../store/action_creators/actionCreators'

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
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHost: (hosts) => dispatch(actionCreators.getHosts(hosts))
  }
}


function DisplayHosts(props) {
  const [filteredHosts, setFilteredHosts] = useState(props.hosts)

  useEffect(() => {
    if (props.hosts.length === 0) {
      getAllHosts().then((result) => {
        console.log(result)
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
      props.isHomeFullTime, props.isSmoking
    )
    console.log(hosts)
    setFilteredHosts(hosts)
  },[
    props.hosts, props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
    props.doesDayCare, props.doesDogWalking, props.canHostMultiplePets,
    props.canHostUnspayedFemales, props.hasChildren, props.hasOtherPets,
    props.isHomeFullTime, props.isSmoking 
  ])

  console.log(filteredHosts)

  const hosts = filteredHosts.map((host, index) => {
      return <NavLink key={index} to={`/profile/host/${host.id}`}>
        <li className="p-5 border">
          {host.firstName} {host.lastName}
        </li>
        </NavLink>
  })

  return (
    <div className="flex-col p-2 border list-none w-full">
      {hosts}
    </div>
  );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DisplayHosts);