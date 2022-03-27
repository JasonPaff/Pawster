import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import hostsFilter from '../utils/hostsFilter'
import getAllHosts from '../services/host/getAllHosts'

const mapStateToProps = (state) => {
    return {
      hosts: state.hostsRed.hosts,
      doesBoarding: state.filtersRed.doesBoarding,
      doesHouseSitting: state.filtersRed.doesHouseSitting,
      doesDropInVisits: state.filtersRed.doesDropInVisits,
      doesDayCare: state.filtersRed.doesDayCare,
      doesDogWalking: state.filtersRed.doesDogWalking,
      has_house: state.filtersRed.has_house,
      has_fenced_yard: state.filtersRed.has_fenced_yard,
      doesnt_own_dog: state.filtersRed.doesnt_own_dog,
      doesnt_own_cat: state.filtersRed.doesnt_own_cat
    }
}


function DisplayHosts(props) {

  const [filteredHosts, setFilteredHosts] = useState(props.hosts)

  useEffect(() => {
    getAllHosts().then((result) => {console.log(result.data)})
    let hosts = [...props.hosts]
    hosts = hostsFilter(
      hosts, props.has_house, props.has_fenced_yard, 
      props.doesnt_own_dog, props.doesnt_own_cat,
      props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
      props.doesDayCare, props.doesDogWalking
      )
    setFilteredHosts(hosts)
  },[
    props.hosts, props.has_house, props.has_fenced_yard, 
    props.doesnt_own_dog, props.doesnt_own_cat,
    props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
    props.doesDayCare, props.doesDogWalking  
  ])

  const hosts = filteredHosts.map((host, index) => {
      return <NavLink key={index} to={`/profile/host/${host.id}`}>
        <li className="p-5 border">
          {host.name}
        </li>
        </NavLink>
  })

  return (
    <div className="flex-col p-2 border list-none w-full">
      {hosts}
    </div>
  );
}
  
export default connect(mapStateToProps)(DisplayHosts);