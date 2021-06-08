import React, { useState } from 'react'
import Header from '../../components/Header'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import GeneralInformation from './general-information/GeneralInformation'
import SearchBuilding from './search-building/SearchBuilding'

const Title = styled.h1`
  color: var(--primary);
  font-weight: 600;
`

export const BuildingInformationContext = React.createContext()

const AddingBuilding = () => {
  let { path } = useRouteMatch()

  const [buildingInformationContext, setBuildingInformationContext] = useState()

  return (
    <>
      <BuildingInformationContext.Provider value={[buildingInformationContext, setBuildingInformationContext]}>
        <Header/>

        <Title>New Building</Title>

        <Router>
          <Switch>
            <Route path={`${path}/`} component={SearchBuilding} exact/>
            <Route path={`${path}/general-information`}
                   component={GeneralInformation} exact/>
          </Switch>
        </Router>
      </BuildingInformationContext.Provider>
    </>
  )
}

export default AddingBuilding