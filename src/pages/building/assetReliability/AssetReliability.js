import React from 'react'
import AssetHealth from './components/AssetHealth'
import PotentialFaultRisks from './components/PotentialFaultRisks1'
import CurrentSubSystemHealth from './components/CurrentSubSystemHealth'
import PotentialFaultList from './components/PotentialFaultsList'

const AssetReliability = () => {

  const data = {
    listOfPotentialFaults: [
      {
        subSystem: 'Cooling',
        asset: 'Chiller 1 - Compressor',
        fault: 'Motor Winding',
        potentialDownTime: 21,
        sparePartsLeadTime: 23,
        estimatedTimeToFailure: 4,
        likelihood: 5,
        impact: 5
      },
      {
        subSystem: 'Mechanical Ventilation',
        asset: 'Carpark Fan 4',
        fault: 'Worn Bearings',
        potentialDownTime: 5,
        sparePartsLeadTime: 6,
        estimatedTimeToFailure: 34,
        likelihood: 1,
        impact: 1
      },
      {
        subSystem: 'Heating',
        asset: 'Pump 2',
        fault: 'Shalft Alignment',
        potentialDownTime: 12,
        sparePartsLeadTime: 1,
        estimatedTimeToFailure: 12,
        likelihood: 3,
        impact: 4
      },
      {
        subSystem: 'Cooling',
        asset: 'CHW Pump 2',
        fault: 'Broken Rotor Bar',
        potentialDownTime: 24,
        sparePartsLeadTime: 23,
        estimatedTimeToFailure: 19,
        likelihood: 2,
        impact: 4
      },
      {
        subSystem: 'Cooling',
        asset: 'Cooling Tower 1 - Fan',
        fault: 'Worn Bearings',
        potentialDownTime: 10,
        sparePartsLeadTime: 4,
        estimatedTimeToFailure: 21,
        likelihood: 2,
        impact: 4
      },
      {
        subSystem: 'Heating',
        asset: 'Air Source Heat Pump 1 - Fan',
        fault: 'Worn Bearings',
        potentialDownTime: 9,
        sparePartsLeadTime: 0,
        estimatedTimeToFailure: 14,
        likelihood: 3,
        impact: 3
      },
      {
        subSystem: 'Mechanical Ventilation',
        asset: 'Carpark Fan 1',
        fault: 'Motor Winding',
        potentialDownTime: 23,
        sparePartsLeadTime: 19,
        estimatedTimeToFailure: 9,
        likelihood: 1,
        impact: 2
      },
    ],
    currentSubSystemHealth: {
      data: [{
        name: 'Cooling',
        value: 55,
      },
        {
          name: 'Heating',
          value: 95,
        },
        {
          name: 'Mechanical Ventilation',
          value: 71
        }
      ],
      keys: ['value']
    },

  }

  return <div>
    <AssetHealth/>
    <div className="d-flex mb-4" >
      <PotentialFaultRisks data={data.listOfPotentialFaults}/>
      <CurrentSubSystemHealth data={data.currentSubSystemHealth}/>
    </div>

    <PotentialFaultList data={data.listOfPotentialFaults}/>
  </div>

}

export default AssetReliability