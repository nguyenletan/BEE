import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const UL = styled.ul`
  margin-bottom: 20px;

  .nav-link {
    padding-left: 0;
    padding-right: 0;
    margin-right: 1rem;

    &.active {
      font-weight: 700;
      font-size: 1.2em;
    }
  }
`

const StepNav = ({ activePositon }) => {

  return (
    <UL className="nav d-flex justify-content-between">
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/search-building'}>Search Building</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/general-information'}>General
          Information</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/activity'}>Activity</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/electricity-consumption'}>Electricity Consumption</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/hvac'}>HVAC</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/lighting'}>Lighting</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/envelope-facade'}>Envelope & Facade</NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link"
                 to={'/adding-building/renewable-energy'}>Renewable Energy</NavLink>
      </li>
    </UL>
  )
}

export default StepNav