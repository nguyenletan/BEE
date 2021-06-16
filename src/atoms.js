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