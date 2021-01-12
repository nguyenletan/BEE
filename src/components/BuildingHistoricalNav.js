import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'

const BuildingHistoricalNav = () => {

  let { url } = useRouteMatch()
  return <nav className="nav nav-pills flex-column flex-sm-row">
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to={url + '/energy-performance'}>Energy
      Performance</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
             to={url + '/comparison'}>Comparison</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
             to={url + '/improve'}>Improve</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to={url + '/asset-reliability'}>Asset
      Reliability</NavLink>
  </nav>
}

BuildingHistoricalNav.propTypes = {}

export default BuildingHistoricalNav