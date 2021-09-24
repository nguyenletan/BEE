import { atom, selector } from 'recoil'
import _ from 'lodash'

export const spaceUsageGFAListState = atom({
  key: 'spaceUsageGFA',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: 'New Usage',
      typeId: '',
      percentage: '',
      climateControlId: '',
      fanTypeId: '',
      hasReheatRecovery: false,
    }],
})

export const totalPercentageOfSpaceUsageGFAListState = selector({
  key: 'totalPercentageOfSpaceUsageGFAList',
  get: ({ get }) => {
    const spaceUsageGFAList = get(spaceUsageGFAListState)
    return _.sumBy(spaceUsageGFAList, (item) => {
      if (item && typeof item.percentage === 'number') {
        return item.percentage
      }
      return 0
    })
  },
})

export const lightingSubSystemListState = atom({
  key: 'lightingSubSystemList',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: 'Fitting ',
      indoorLightingSystemTypeId: '',
      percentage: '',
    }],
})

export const totalPercentageOfLightingSubSystemListState = selector({
  key: 'totalPercentageOfLightingSubSystemList',
  get: ({ get }) => {
    const lightingSubSystemList = get(lightingSubSystemListState)
    return _.sumBy(lightingSubSystemList, (item) => {
      if (item && typeof +item.percentage === 'number') {
        return +item.percentage
      }
      return 0
    })
  },
})

export const solarPanelSystemListState = atom({
  key: 'solarPanelSystemList',
  default: [
    {
      id: parseInt(_.uniqueId()),
      title: 'System',
      installedCapacity: '',
      trackingTypeId: '',
      inclineAngle: 0,
      unknownInclineAngle: false,
      orientationAngle: 0,
      unknownOrientationAngle: false,
      systemLoss: 14,
      pvTechChoiceId: '',
      mountingTypeId: '',
    }],
})

export const electricityConsumptionListState = atom({
  key: 'electricityConsumption',
  default: [
    {
      id: parseInt(_.uniqueId()),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      value: '',
      cost: '',
    }],
})

export const generalBuildingInformationState = atom({
  key: 'generalBuildingInformation',
  default: {
    propId: null,
    id: null,
    buildingName: '',
    address: '',
    city: '',
    state: '',
    countryCode: '',
    postalCode: '',
    suburb: null,
    location: null,
    storeysAboveGround: '',
    storeysBelowGround: '',
    grossInteriorArea: '',
    grossInteriorAreaUnit: 'm2',
    netUsableArea: '',
    netUsableAreaUnit: 'm2',
    avgInternalFloorToCeilingHeight: '',
    avgInternalFloorToCeilingHeightUnit: 'm',
    buildingOrientedId: '',
    constructionPeriodValue: '',
    sustainabilityRatingSchemeId: null,
    sustainabilityRatingId: null,
    useTypeId: '',
    buildingPhoto: null,
    hasMajorRefurbishmentOrExtensionsDone: false,
    latestYearForRefurbishmentOrExtension: null,
  },
})

export const coolingSystemState = atom({
  key: 'coolingSystem',
  default: {
    hasCoolingSystem: false,
    coolingSystemTypeId: '',
    compressorTypeId: '',
    refrigerantTypeId: '',
    chillerEnergySourceTypeId: '',
  },
})

export const heatingSystemState = atom({
  key: 'heatingSystem',
  default: {
    hasHeatingSystem: false,
    heatingSystemTypeId: '',
    heaterTypeId: '',
    heaterEnergySourceTypeId: '',

  },
})

export const envelopFacadeState = atom({
  key: 'envelopFacade',
  default: {
    id: parseInt(_.uniqueId()),
    externalWindowToWallRatio: 0.7,
    externalRoofInsulationTypeId: '',
    externalWallInsulationTypeId: '',
    externalWindowInsulationTypeId: '',
    externalGroundFloorInsulationTypeId: 5,
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

export const energyPerformanceGroupByState = atom({
  key: 'energyPerformanceGroupBy',
  default: 'month',
})

export const addingBuildingProgressState = atom({
  key: 'addingBuildingProgress',
  default: 0,
})

export const isDisplayPerformanceFilterState = atom({
  key: 'isDisplayPerformanceFilter',
  default: true
})