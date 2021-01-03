import React from 'react'
import { Link } from 'react-router-dom'

const BuildingHistoricalNav = ({id}) => {
  return <nav className="nav nav-pills flex-column flex-sm-row">
    <Link className="flex-sm-fill text-sm-center nav-link active" to={'/energy-performance/' + id}>Energy Performance</Link>
    <Link className="flex-sm-fill text-sm-center nav-link" to={'/energy-performance/' + id}>Comparison</Link>
    <Link className="flex-sm-fill text-sm-center nav-link" to={'/energy-performance/' + id}>Improve</Link>
    <Link className="flex-sm-fill text-sm-center nav-link" to={'/energy-performance/' + id}>Asset Reliability</Link>
  </nav>
}

BuildingHistoricalNav.propTypes = {

}

export default BuildingHistoricalNav