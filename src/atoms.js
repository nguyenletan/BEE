import { atom } from 'recoil'
import _ from 'lodash'

export const spaceUsageGFAListState = atom({
  key: 'spaceUsageGFA',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: `New Usage`,
      typeId: 1,
      percentage: 1,
      climateControlId: 1,
      fanTypeId: 1,
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
      trackingTypeId: 0,
      inclineAngel: 0,
      orientationAngle: 0,
      systemLoss: 14,
      pvTechChoiceId: 0,
      mountingTypeId: 0,
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
    coolingSystemTypeId: 1,
    compressorTypeId: 1,
    refrigerantTypeId: 1,
    chillerEnergySourceTypeId: 1,
  },
})

export const heatingSystemState = atom({
  key: 'heatingSystem',
  default: {
    id: parseInt(_.uniqueId()),
    hasHeatingSystem: false,
    heatingSystemTypeId: 1,
    heaterTypeId: 1,
    heaterEnergySourceTypeId: 1,

  },
})

export const envelopFacadeState = atom({
  key: 'envelopFacade',
  default: {
    id: parseInt(_.uniqueId()),
    externalWindowToWallRatio: 0.7,
    externalRoofInsulationTypeId: 0,
    externalWallInsulationTypeId: 0,
    externalWindowInsulationTypeId: 0,
    externalGroundFloorInsulationTypeId: 0,
  },
})

export const buildingActivityState = atom({
  key: 'buildingActivity',
  default: [
    {
      id: 0,
      name: 'Sunday',
      codeName: 'sunday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 1,
      name: 'Monday',
      codeName: 'monday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 2,
      name: 'Tuesday',
      codeName: 'tuesday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 3,
      name: 'Wednesday',
      codeName: 'wednesday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 4,
      name: 'Thursday',
      codeName: 'thursday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 5,
      name: 'Friday',
      codeName: 'friday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 6,
      name: 'Saturday',
      codeName: 'saturday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
    {
      id: 7,
      name: 'Public Holiday',
      codeName: 'publicHoliday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
      isEnable: false,
    },
  ],
})

export const addingBuildingProgressState = atom({
  key: 'addingBuildingProgress',
  default: 0,
})
