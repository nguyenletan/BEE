/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, createContext } from 'react'
import Header from '../../components/Header'
import { Route, Routes, useParams } from 'react-router-dom'
import GeneralInformation from './general-information/GeneralInformation'
import SearchBuilding from './search-building/SearchBuilding'
import AskQuestion from './search-building/AskQuestion'
import Activity from './activity/Activity'
import ElectricityConsumption from './electricity_consumption/ElectricityConsumption'
import HeatConsumption from './heat_consumption/HeatConsumption'
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
  defaultElectricityConsumptionListState,
  defaultHeatConsumptionListState,
  defaultEnvelopFacadeState,
  defaultGeneralBuildingInformationState,
  defaultHeatingSystemState,
  defaultLightingSubSystemListState,
  defaultSolarPanelSystemListState,
  defaultSpaceUsageGFAListState,
  electricityConsumptionListState,
  heatConsumptionListState,
  envelopFacadeState,
  generalBuildingInformationState,
  heatingSystemState,
  lightingSubSystemListState,
  solarPanelSystemListState,
  spaceUsageGFAListState,
} from 'atoms'

export const BuildingInformationContext = createContext()

const AddingBuilding = () => {
  const { id } = useParams()

  const recoilSetters = {
    setBuildingActivity: useSetRecoilState(buildingActivityState),
    setGeneralBuildingInformation: useSetRecoilState(generalBuildingInformationState),
    setSpaceUsageGFAList: useSetRecoilState(spaceUsageGFAListState),
    setElectricityConsumptionList: useSetRecoilState(electricityConsumptionListState),
    setHeatConsumptionList: useSetRecoilState(heatConsumptionListState),
    setCoolingSystem: useSetRecoilState(coolingSystemState),
    setHeatingSystem: useSetRecoilState(heatingSystemState),
    setLightingSubSystemList: useSetRecoilState(lightingSubSystemListState),
    setEnvelopFacade: useSetRecoilState(envelopFacadeState),
    setSolarPanelSystemList: useSetRecoilState(solarPanelSystemListState),
    setAddingBuildingProgressState: useSetRecoilState(addingBuildingProgressState),
  }

  const setBuildingData = (building) => {
    recoilSetters.setGeneralBuildingInformation(building?.generalBuildingInformation)
    recoilSetters.setBuildingActivity(building?.buildingActivity)
    recoilSetters.setSpaceUsageGFAList(building?.spaceUsageGFAList)
    recoilSetters.setElectricityConsumptionList(building?.electricityConsumptionList)
    recoilSetters.setHeatConsumptionList(building?.heatConsumptionList)
    if (building?.coolingSystem) recoilSetters.setCoolingSystem(building?.coolingSystem)
    if (building?.heatingSystem) recoilSetters.setHeatingSystem(building?.heatingSystem)
    recoilSetters.setLightingSubSystemList(building?.lightingSubSystemList)
    recoilSetters.setEnvelopFacade(building?.envelopFacade)
    recoilSetters.setSolarPanelSystemList(building?.solarPanelSystemList)
    recoilSetters.setAddingBuildingProgressState(100)
  }

  const resetDefaults = () => {
    recoilSetters.setGeneralBuildingInformation(defaultGeneralBuildingInformationState)
    recoilSetters.setBuildingActivity(defaultBuildingActivityState)
    recoilSetters.setSpaceUsageGFAList(defaultSpaceUsageGFAListState)
    recoilSetters.setElectricityConsumptionList(defaultElectricityConsumptionListState)
    recoilSetters.setHeatConsumptionList(defaultHeatConsumptionListState)
    recoilSetters.setCoolingSystem(defaultCoolingSystemState)
    recoilSetters.setHeatingSystem(defaultHeatingSystemState)
    recoilSetters.setLightingSubSystemList(defaultLightingSubSystemListState)
    recoilSetters.setEnvelopFacade(defaultEnvelopFacadeState)
    recoilSetters.setSolarPanelSystemList(defaultSolarPanelSystemListState)
    recoilSetters.setAddingBuildingProgressState(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const building = await getBuildingByIdForEditing(id)
        setBuildingData(building)
      } else {
        resetDefaults()
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route path={`/`} element={<AskQuestion />} exact />
          <Route path={`search-building`} element={<SearchBuilding />} />
          <Route path={`general-information`} element={<GeneralInformation />} />
          <Route path={`activity`} element={<Activity />} />
          <Route path={`electricity-consumption`} element={<ElectricityConsumption />} />

          <Route path={`heat-consumption`} element={<HeatConsumption />} />

          <Route path={`hvac`} element={<HVAC />} />
          <Route path={`lighting`} element={<Lighting />} />
          <Route path={`envelope-facade`} element={<EnvelopFacade />} />
          <Route path={`renewable-energy`} element={<RenewableEnergy />} />
          <Route path={`adding-building-successfully`} element={<AddingBuildingSuccessfully />} />
        </Routes>
      </div>
    </>
  )
}

export default AddingBuilding