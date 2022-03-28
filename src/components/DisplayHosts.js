import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import hostsFilter from '../utils/hostsFilter'
import getUserById from '../services/user/getUserById'
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
      has_house: state.filtersRed.has_house,
      has_fenced_yard: state.filtersRed.has_fenced_yard,
      doesnt_own_dog: state.filtersRed.doesnt_own_dog,
      doesnt_own_cat: state.filtersRed.doesnt_own_cat
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHost: (hosts) => dispatch(actionCreators.getHosts(hosts))
  }
}


function DisplayHosts(props) {
  const [hostUsers, setHostUsers] = useState([])
  const [filteredHosts, setFilteredHosts] = useState(hostUsers)

  useEffect(() => {
    getAllHosts().then((result) => {
      console.log(result)
      const users = result.data.getHostUsers.users
      const hosts = result.data.getAllHosts.hosts 
      const userHosts = users.map(user => {
        const host = hosts.find(h => h.userId == user.id)
        return {
          ...user,
          ...host
        }
      })
      console.log(userHosts)
      props.onGetHost(userHosts)
    })
    let hosts = [...props.hosts]
    hosts = hostsFilter(
      hosts, props.has_house, props.has_fenced_yard, 
      props.doesnt_own_dog, props.doesnt_own_cat,
      props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
      props.doesDayCare, props.doesDogWalking
      )
    setFilteredHosts(hosts)
  },[
    props.has_house, props.has_fenced_yard, 
    props.doesnt_own_dog, props.doesnt_own_cat,
    props.doesBoarding, props.doesHouseSitting, props.doesDropInVisits,
    props.doesDayCare, props.doesDogWalking  
  ])

  const hosts = filteredHosts.map((host, index) => {
      return <NavLink key={index} to={`/profile/host/${host.id}`}>
        <li className="p-5 border">
          {host.firstName}
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