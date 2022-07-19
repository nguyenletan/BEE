import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const SubNav = styled.nav`
  display: flex;
  align-items: center;
  //@media(min-width: 600px) {
  //  display: flex;
  //}
  a i {
    display: none;
  }

  @media (max-width: 600px) {
    a {
      display: none;

      i {
        padding-left: .3em;
        display: inline;
      }

      &.active {
        display: flex;

      }
    }
  }

`

const BuildingHistoricalNav = () => {
  //const { url } = useMatch()
  const { t } = useTranslation('common')
  return (
    <SubNav className="nav nav-pills flex-column flex-sm-row">
      <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to="energy-performance">
        {t('Building Performance')}<i className="bi bi-caret-down-fill"/>
      </NavLink>
      <NavLink
        activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
        to="comparison"
      >{t('Comparison')}
      </NavLink>
      <NavLink
        activeClassName="active" className="flex-sm-fill text-sm-center nav-link"
        to="improve"
      >{t('Improve')}
      </NavLink>
      <NavLink activeClassName="active" className="flex-sm-fill text-sm-center nav-link" to="asset-reliability">
        {t('Asset Reliability')}
      </NavLink>
    </SubNav>
  )
}

BuildingHistoricalNav.propTypes = {}

export default BuildingHistoricalNav
