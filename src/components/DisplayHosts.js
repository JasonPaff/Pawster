import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import hostsFilter from '../utils/hostsFilter'

const mapStateToProps = (state) => {
    return {
      hosts: state.hostsRed.hosts,
      has_house: state.filtersRed.has_house,
      has_fenced_yard: state.filtersRed.has_fenced_yard,
      doesnt_own_dog: state.filtersRed.doesnt_own_dog,
      doesnt_own_cat: state.filtersRed.doesnt_own_cat
    }
}


function DisplayHosts(props) {

  const [filteredHosts, setFilteredHosts] = useState(props.hosts)

  useEffect(() => {
    let hosts = [...props.hosts]
    hosts = hostsFilter(hosts, props.has_house, props.has_fenced_yard, props.doesnt_own_dog, props.doesnt_own_cat)
    setFilteredHosts(hosts)
  },[props.hosts, props.has_house, props.has_fenced_yard, props.doesnt_own_dog, props.doesnt_own_cat])

  const hosts = filteredHosts.map((host, index) => {
      return <li key={index}>{host.name}</li>
  })

  return (
    <div className="flex-col justify-center">
      <h1>Display Hosts</h1>
      {hosts}
    </div>
  );
}
  
export default connect(mapStateToProps)(DisplayHosts);