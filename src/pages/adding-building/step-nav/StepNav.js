import React from 'react'
import styled from 'styled-components'
import { NavLink, useParams } from 'react-router-dom'

const UL = styled.ul`
  margin-top: 3rem;
  margin-bottom: 3rem;

  .nav-link {
    padding-left: 0;
    padding-right: 0;
    margin-right: 1rem;
    color: var(--bs-primary);

    &.active {
      font-weight: 700;
      //font-size: 1.1em;
      text-decoration: underline;
    }
  }
`

const StepNav = () => {

  const { id } = useParams()

  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'

  return (
    <UL className="nav d-flex justify-content-between">
      {!id && <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/search-building'}
        >Search
          Building
        </NavLink>
      </li> }
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/general-information'}
        >General
          Information
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/activity'}
        >Activity
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/electricity-consumption'}
        >Electricity Consumption
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/hvac'}
        >HVAC
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/lighting'}
        >Lighting
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/envelope-facade'}
        >Envelope &
          Facade
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/renewable-energy'}
        >Renewable
          Energy
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/adding-building-successfully'}
        >Done
        </NavLink>
      </li>
    </UL>
  )
}

export default StepNav
