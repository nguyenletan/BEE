import React, { useState } from 'react'
import Header from '../../components/Header'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import GeneralInformation from './general-information/GeneralInformation'
import SearchBuilding from './search-building/SearchBuilding'
import AskQuestion from './search-building/AskQuestion'
import Activity from './activity/Activity'

export const BuildingInformationContext = React.createContext()

const AddingBuilding = () => {
  let { path } = useRouteMatch()

  const [buildingInformationContext, setBuildingInformationContext] = useState()

  return (
    <>

      <Header/>
      <BuildingInformationContext.Provider
        value={[buildingInformationContext, setBuildingInformationContext]}>
        <div className="container">
          <Router>
            <Switch>
              <Route path={`${path}/`} component={AskQuestion} exact/>
              <Route path={`${path}/search-building`}
                     component={SearchBuilding}/>
              <Route path={`${path}/general-information`}
                     component={GeneralInformation}/>
              <Route path={`${path}/activity`}
                     component={Activity}/>
            </Switch>
          </Router>
        </div>
      </BuildingInformationContext.Provider>
    </>
  )
}

export default AddingBuilding