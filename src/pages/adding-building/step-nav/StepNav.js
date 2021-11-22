import React from 'react'
import styled from 'styled-components'
import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation('buildingInput')

  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'

  return (
    <UL className="nav d-flex justify-content-between">
      {!id && <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/search-building'}
        >{t('Search Building')}
        </NavLink>
      </li> }
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/general-information'}
        >{t('General Information')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/activity'}
        >{t('Activity')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/electricity-consumption'}
        >{t('Electricity Consumption')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/hvac'}
        >{t('HVAC')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/lighting'}
        >{t('Lighting')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/envelope-facade'}
        >{t('Envelope & Facade')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/renewable-energy'}
        >{t('Renewable Energy')}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeClassName="active" className="nav-link"
          to={parentUrl + '/adding-building-successfully'}
        >{t('Done')}
        </NavLink>
      </li>
    </UL>
  )
}

export default StepNav
