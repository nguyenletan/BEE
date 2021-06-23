import { atom } from 'recoil'
import _ from 'lodash'


export const spaceUsageGFAListState = atom({
  key: 'spaceUsageGFA',
  default: [{
      id: _.uniqueId(),
      title: 'Usage',
      GFA: '',
      climateControl: '0',
      fanType: '',
      hasReheatRecovery: '',
    }],
})

export const lightingSubSystemListState = atom({
  key: 'lightingSubSystemList',
  default: [{
    id: _.uniqueId(),
    title: 'Usage',
    indoorLightingSystemType: '',
    percentage: 0,
  }],
})

export const electricityConsumptionListState = atom({
  key: 'electricityConsumption',
  default: [{
    id: _.uniqueId(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    value: 0,
    cost: 0,
  }],
})


