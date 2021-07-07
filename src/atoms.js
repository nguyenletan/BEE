import { atom } from 'recoil'
import _ from 'lodash'

export const spaceUsageGFAListState = atom({
  key: 'spaceUsageGFA',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: `New Usage`,
      typeId: 0,
      percentage: 0,
      climateControlId: 0,
      fanTypeId: 0,
      hasReheatRecovery: false,
    }],
})

export const lightingSubSystemListState = atom({
  key: 'lightingSubSystemList',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: 'Fitting ',
      indoorLightingSystemTypeId: 0,
      percentage: 0,
    }],
})

export const solarPanelSystemListState = atom({
  key: 'solarPanelSystemList',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: 'System',
      installedCapacity: 0,
      trackingType: 0,
      inclineAngel: 0,
      orientationAngle: 0,
      systemLoss: 14,
      pvTechChoiceId: 0,
      mountingType: 0,
    }],
})

export const electricityConsumptionListState = atom({
  key: 'electricityConsumption',
  default: [
    {
      id: parseInt(_.uniqueId()),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      value: 0,
      cost: 0,
    }],
})

export const generalBuildingInformationState = atom({
  key: 'generalBuildingInformation',
  default: null,
})

export const coolingSystemState = atom({
  key: 'coolingSystem',
  default: {
    id: parseInt(_.uniqueId()),
    hasCoolingSystem: false,
    coolingSystemTypeId: 0,
    compressorTypeId: 0,
    refrigerantTypeId: 0,
    chillerEnergySourceTypeId: 0
  }
})

export const heatingSystemState = atom({
  key: 'heatingSystem',
  default: {
    id: parseInt(_.uniqueId()),
    hasHeatingSystem: false,
    heaterSystemTypeId: 0,
    heaterTypeId: 0,
    heaterEnergySourceTypeId: 0
  }
})

export const buildingActivityState = atom({
  key: 'buildingActivity',
  default: [],
})

export const addingBuildingProgressState = atom({
  key: 'addingBuildingProgress',
  default: 0,
})
