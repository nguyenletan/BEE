/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Header from '../../components/Header'

import { Route, Routes, useParams } from 'react-router-dom'
import GeneralInformation from './general-information/GeneralInformation'
import SearchBuilding from './search-building/SearchBuilding'
import AskQuestion from './search-building/AskQuestion'
import Activity from './activity/Activity'
import ElectricityConsumption
  from './electricity_consumption/ElectricityConsumption'
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
  defaultBuildingActivityState,
  defaultCoolingSystemState,
  defaultElectricityConsumptionListState, defaultEnvelopFacadeState,
  defaultGeneralBuildingInformationState,
  defaultHeatingSystemState,
  defaultLightingSubSystemListState, defaultSolarPanelSystemListState,
  defaultSpaceUsageGFAListState,
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

  const { id } = useParams()

  const setBuildingActivity = useSetRecoilState(buildingActivityState)

  const setGeneralBuildingInformation = useSetRecoilState(
    generalBuildingInformationState)
  const setSpaceUsageGFAList = useSetRecoilState(spaceUsageGFAListState)
  const setElectricityConsumptionList = useSetRecoilState(
    electricityConsumptionListState)
  const setCoolingSystem = useSetRecoilState(coolingSystemState)
  const setHeatingSystem = useSetRecoilState(heatingSystemState)
  const setLightingSubSystemList = useSetRecoilState(lightingSubSystemListState)
  const setEnvelopFacade = useSetRecoilState(envelopFacadeState)
  const setSolarPanelSystemList = useSetRecoilState(solarPanelSystemListState)
  const setAddingBuildingProgressState = useSetRecoilState(
    addingBuildingProgressState)

  //console.log(id)

  useEffect(() => {
    const fetchApi = async () => {
      const building = await getBuildingByIdForEditing(id)
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
    } else {
      setGeneralBuildingInformation(defaultGeneralBuildingInformationState)
      setBuildingActivity(defaultBuildingActivityState)
      setSpaceUsageGFAList(defaultSpaceUsageGFAListState)
      setElectricityConsumptionList(defaultElectricityConsumptionListState)
      setCoolingSystem(defaultCoolingSystemState)
      setHeatingSystem(defaultHeatingSystemState)
      setLightingSubSystemList(defaultLightingSubSystemListState)
      setEnvelopFacade(defaultEnvelopFacadeState)
      setSolarPanelSystemList(defaultSolarPanelSystemListState)
      setAddingBuildingProgressState(0)
    }

    // eslint-disable-line
  }, [])


  return (
    <>
      <Header/>

      <div className="container">
        <Routes>
          <Route path={`/`} element={<AskQuestion/>} exact/>
          <Route
            path={`search-building`}
            element={<SearchBuilding/>}
          />
          <Route
            path={`general-information`}
            element={<GeneralInformation/>}
          />
          <Route
            path={`activity`}
            element={<Activity/>}
          />
          <Route
            path={`electricity-consumption`}
            element={<ElectricityConsumption/>}
          />
          <Route
            path={`hvac`}
            element={<HVAC/>}
          />
          <Route
            path={`lighting`}
            element={<Lighting/>}
          />
          <Route
            path={`envelope-facade`}
            element={<EnvelopFacade/>}
          />
          <Route
            path={`renewable-energy`}
            element={<RenewableEnergy/>}
          />
          <Route
            path={`adding-building-successfully`}
            element={<AddingBuildingSuccessfully/>}
          />
        </Routes>
      </div>

    </>
  )
}

export default AddingBuilding
