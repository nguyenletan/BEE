/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Header from '../../components/Header'

import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import GeneralInformation from './general-information/GeneralInformation'
import SearchBuilding from './search-building/SearchBuilding'
import AskQuestion from './search-building/AskQuestion'
import Activity from './activity/Activity'
import ElectricityConsumption from './electricity_consumption/ElectricityConsumption'
import HVAC from './hvac/HVAC'
import Lighting from './lighting/Lighting'
import EnvelopFacade from './envelope-facade/EnvelopFacade'
import RenewableEnergy from './renewable-energy/RenewableEnergy'
import AddingBuildingSuccessfully from './AddingBuildingSuccessfully'
import { getBuildingByIdForEditing } from 'api/BuildidingAPI'
import { useSetRecoilState } from 'recoil'
import {
  addingBuildingProgressState,
  buildingActivityState,
  coolingSystemState,
  electricityConsumptionListState,
  envelopFacadeState,
  generalBuildingInformationState,
  heatingSystemState,
  lightingSubSystemListState,
  solarPanelSystemListState,
  spaceUsageGFAListState,
} from 'atoms'

export const BuildingInformationContext = React.createContext()

const AddingBuilding = () => {
  const { path } = useRouteMatch()
  const { id } = useParams()

  const setBuildingActivity = useSetRecoilState(buildingActivityState)
  const setGeneralBuildingInformation = useSetRecoilState(generalBuildingInformationState)
  const setSpaceUsageGFAList = useSetRecoilState(spaceUsageGFAListState)
  const setElectricityConsumptionList = useSetRecoilState(electricityConsumptionListState)
  const setCoolingSystem = useSetRecoilState(coolingSystemState)
  const setHeatingSystem = useSetRecoilState(heatingSystemState)
  const setLightingSubSystemList = useSetRecoilState(lightingSubSystemListState)
  const setEnvelopFacade = useSetRecoilState(envelopFacadeState)
  const setSolarPanelSystemList = useSetRecoilState(solarPanelSystemListState)
  const setAddingBuildingProgressState = useSetRecoilState(addingBuildingProgressState)

  //console.log(id)

  useEffect(() => {
    const fetchApi = async () => {
      const building = await getBuildingByIdForEditing(id)
      console.log(building)
      setGeneralBuildingInformation(building?.generalBuildingInformation)
      setBuildingActivity(building?.buildingActivity)
      setSpaceUsageGFAList(building?.spaceUsageGFAList)
      setElectricityConsumptionList(building?.electricityConsumptionList)
      if (building?.coolingSystem) {
        setCoolingSystem(building?.coolingSystem)
      }

      if (building?.heatingSystem) {
        setHeatingSystem(building?.heatingSystem)
      }

      setLightingSubSystemList(building?.lightingSubSystemList)
      setEnvelopFacade(building?.envelopFacade)
      setSolarPanelSystemList(building?.solarPanelSystemList)
      setAddingBuildingProgressState(100)

      return building
    }

    if (id) {
      fetchApi()
    }


    // eslint-disable-line
  }, [])

  return (
    <>
      <Header/>

      <div className="container">
        <Router>
          <Switch>
            <Route path={`${path}/`} component={AskQuestion} exact/>
            <Route
              path={`${path}/search-building`}
              component={SearchBuilding}
            />
            <Route
              path={`${path}/general-information`}
              component={GeneralInformation}
            />
            <Route
              path={`${path}/activity`}
              component={Activity}
            />
            <Route
              path={`${path}/electricity-consumption`}
              component={ElectricityConsumption}
            />
            <Route
              path={`${path}/hvac`}
              component={HVAC}
            />
            <Route
              path={`${path}/lighting`}
              component={Lighting}
            />
            <Route
              path={`${path}/envelope-facade`}
              component={EnvelopFacade}
            />
            <Route
              path={`${path}/renewable-energy`}
              component={RenewableEnergy}
            />
            <Route
              path={`${path}/adding-building-successfully`}
              component={AddingBuildingSuccessfully}
            />
          </Switch>
        </Router>
      </div>

    </>
  )
}

export default AddingBuilding
