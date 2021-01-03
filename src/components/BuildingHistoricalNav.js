import React from 'react'

const BuildingHistoricalNav = (props) => {
  return <nav className="nav nav-pills flex-column flex-sm-row">
    <a className="flex-sm-fill text-sm-center nav-link active" href="#">Energy Performance</a>
    <a className="flex-sm-fill text-sm-center nav-link" href="#">Comparison</a>
    <a className="flex-sm-fill text-sm-center nav-link" href="#">Improve</a>
    <a className="flex-sm-fill text-sm-center nav-link" href="#">Asset Reliability</a>
  </nav>
}

BuildingHistoricalNav.propTypes = {

}

export default BuildingHistoricalNav