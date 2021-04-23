import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

const SubNav = styled.nav`
  display: none;
  @media(min-width: 600px) {
    display: flex;
  }

`

const BuildingHistoricalNav = () => {

  let { url } = useRouteMatch()
  return <SubNav className="nav nav-pills flex-column flex-sm-row">
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to={url + '/energy-performance'}>Energy
      Performance</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
             to={url + '/comparison'}>Comparison</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
             to={url + '/improve'}>Improve</NavLink>
    <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to={url + '/asset-reliability'}>Asset
      Reliability</NavLink>
  </SubNav>
}

BuildingHistoricalNav.propTypes = {}

export default BuildingHistoricalNav