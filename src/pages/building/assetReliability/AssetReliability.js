import React from 'react'
import AssetHealth from './components/AssetHealth'
import PotentialFaultRisks from './components/PotentialFaultRisks1'
import CurrentSubSystemHealth from './components/CurrentSubSystemHealth'
import PotentialFaultList from './components/PotentialFaultsList'
import MaintenanceBudget from './components/MaintenanceBudget'
import MaintenanceBudgetBySubSystem from './components/MaintenanceBudgetBySubSystem'
import styled from 'styled-components'

const AssetReliabilityWrapper = styled.div`
  margin-bottom: 50px;
`

const TheSecondWrapper = styled.div`
  margin-bottom: 50px;
`

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
    maintenanceBudget: [
      {
        id: 'used',
        label: 'Used',
        value: 236850,
        color: '#87972f',
        remaining: 77691
      },
      {
        id: 'remaining',
        label: 'Remaining',
        value: 77691,
        color: '#ecedef',
        remaining: 77691
      }
    ],
    maintenanceBudgetBySubSystem: [
      {
        id: 0,
        subSystem: 'cooling',
        used: 5000,
        accrued: 1300,
        allocated: 7300,
      },
      {
        id: 1,
        subSystem: 'heating',
        used: 3000,
        accrued: 5100,
        allocated: 6500
      },
      {
        id: 2,
        subSystem: 'lighting',
        used: 3100,
        accrued: 200,
        allocated: 4300,
      },
      {
        id: 3,
        subSystem: 'mechanical ventilation',
        used: 5900,
        accrued: 900,
        allocated: 7200,
      },{
        id:4,
        subSystem: 'facility envelope',
        used: 4000,
        accrued: 5900,
        allocated: 4300,
      },{
        id: 5,
        subSystem: 'renewables',
        used: 1800,
        accrued: 500,
        allocated: 3100
      },
      {
        id: 6,
        subSystem: 'others',
        used: 2100,
        accrued: 300,
        allocated: 3100,
      },
    ]

  }

  return (
    <AssetReliabilityWrapper>
      
      <AssetHealth/>
      
      <TheSecondWrapper className="d-flex mb-5 justify-content-lg-center justify-content-xl-between flex-wrap">
        <PotentialFaultRisks data={data.listOfPotentialFaults}/>
        <CurrentSubSystemHealth data={data.currentSubSystemHealth}/>
      </TheSecondWrapper>

      <PotentialFaultList data={data.listOfPotentialFaults}/>

      <div className="row">
        <div className="col-12 col-sm-8 col-xl-4 mb-4">
          <MaintenanceBudget data={data.maintenanceBudget}/>
        </div>
        <div className="col-12 col-xl-8 mb-4">
          <MaintenanceBudgetBySubSystem data={data.maintenanceBudgetBySubSystem}/>
        </div>
      </div>

    </AssetReliabilityWrapper>
  )

}

export default AssetReliability
