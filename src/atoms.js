import { atom, selector } from 'recoil'
import _ from 'lodash'
import moment from 'moment'

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
      title: null,
      indoorLightingSystemTypeId: '',
      percentage: 0,
      numberOfBulbs: 0,
      wattRatingOfBulb: 0,
      lumensOfBulb: 0,
      numberOfDaysUsedPerWeek: 0,
      numberOfHoursUsedPerDay: 0,
      totalWatt: 0,
    }],
})

export const lightingSubSystemListSelectorState = selector({
  key: 'lightingSubSystemListSelector',
  get: ({ get }) => {
    const lightingSubSystemList = get(lightingSubSystemListState)

    const totalOfBulbs = _.sumBy(lightingSubSystemList, (item) => {
      if (item && typeof +item.numberOfBulbs === 'number') {
        return (+item.numberOfBulbs)
      }
      return 0
    })
    const result = []
      for (let lightingSubSystem of lightingSubSystemList) {
        let efficacy = 0
        let percentage = 0
        let watt = lightingSubSystem.numberOfBulbs * lightingSubSystem.wattRatingOfBulb
        if(totalOfBulbs > 0) {
          percentage = (lightingSubSystem.numberOfBulbs / totalOfBulbs) * 100
        }
        if(lightingSubSystem.lumensOfBulb > 0) {
          efficacy = (watt / lightingSubSystem.lumensOfBulb)
        }
        result.push({ totalWatt: watt, percentage: +percentage.toFixed(2), efficacy: +efficacy.toFixed(2) })
      }

    return result
  },
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

export const totalWattOfLightingSubSystemListState = selector({
  key: 'totalWattOfLightingSubSystemList',
  get: ({ get }) => {
    const lightingSubSystemList = get(lightingSubSystemListState)
    return _.sumBy(lightingSubSystemList, (item) => {
      if (item && typeof +item.wattRatingOfBulb === 'number' && typeof +item.numberOfBulbs === 'number') {
        return (+item.wattRatingOfBulb) * (+item.numberOfBulbs)
      }
      return 0
    })
  },
})

export const totalEfficacyOfLightingSubSystemListState = selector({
  key: 'totalEfficacyOfLightingSubSystemList',
  get: ({ get }) => {
    const lightingSubSystemList = get(lightingSubSystemListState)
    return _.sumBy(lightingSubSystemList, (item) => {
      if (item && typeof +item.wattRatingOfBulb === 'number' && typeof +item.lumensOfBulb === 'number') {
        if(+item.lumensOfBulb > 0)
        return +((+item.wattRatingOfBulb) / (+item.lumensOfBulb)).toFixed(2)
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
  default: true,
})

export const originalConsumptionBreakdownState = atom({
  key: 'originalConsumptionBreakdown',
  default: null,
})

export const breakdownState = atom({
  key: 'breakdown',
  default: null,
})

export const consumptionBreakdownState = atom({
  key: 'consumptionBreakdown',
  default: null,
})

export const isBreakDownDrillDownState = atom({
  key: 'isBreakDownDrillDown',
  default: false,
})

export const breakDownLevelState = atom({
  key: 'breakDownLevelState',
  default: 0,
})

export const selectedSubBreakdownState = atom({
  key: 'selectedSubBreakdown',
  default: null,
})

export const energyPerformanceStartTimeState = atom({
  key: 'energyPerformanceStartTime',
  default: moment().subtract(1, 'y'),
})

export const energyPerformanceEndTimeState = atom({
  key: 'energyPerformanceEndTime',
  default: moment(),
})

export let totalAnnualSavingState = atom({
  key: 'totalAnnualSavingState',
  default: []
})

export const getTotalValueAnnualEnergySavings = selector({
  key: 'getTotalValueAnnualEnergySavings',
  get: ({get}) => {
    let arr = get(totalAnnualSavingState)
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
      total += arr[i].energySavings;
    }
    return total
  },
});

export const getTotalInvestmentCost = selector({
  key: 'getTotalInvestmentCost',
  get: ({get}) => {
    let arr = get(totalAnnualSavingState)
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
      total += arr[i].investmentCost;
    }
    return total
  },
});

export const getTotalSimplePayback = selector({
  key: 'getTotalSimplePayback',
  get: ({get}) => {
    let arr = get(totalAnnualSavingState)
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
      total += arr[i].simplePayback;
    }
    return total
  },
});

export const getTotalIRR = selector({
  key: 'getTotalIRR',
  get: ({get}) => {
    let arr = get(totalAnnualSavingState)
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
      if(!isNaN(arr[i].IRR)) {
        total += arr[i].IRR;
      }
    }
    return total
  },
});

export const getTotalPercentageOfLEDReplacement = selector({
  key: 'getTotalPercentageOfLEDReplacement',
  get: ({get}) => {
    let arr = get(totalAnnualSavingState)
    let total = 0;
    let numberOfReplacingBulbs = 0;
    let numberOfOldBulbs = 0;
    for(let i = 0; i < arr.length; i++) {
      if(!isNaN(arr[i].numberOfReplacingBulbs) && !isNaN(arr[i].numberOfOldBulbs)) {
        numberOfReplacingBulbs += arr[i].numberOfReplacingBulbs;
        numberOfOldBulbs += arr[i].numberOfOldBulbs;
      }
    }
    if(numberOfOldBulbs > 0) {
      total = numberOfReplacingBulbs * 100 / numberOfOldBulbs;
    }
    return total
  },
});


// export const improveMeasuresPopupState = atom({
//   key: 'improveMeasuresPopup',
//   default: {
//     isShow: false,
//
//   }
// })