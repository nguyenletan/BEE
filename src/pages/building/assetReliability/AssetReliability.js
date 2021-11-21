import React from 'react'

import styled from 'styled-components'

import AssetReliabilityMain from './AssetReliabilityMain'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import IssueDetail from './IssueDetail'
import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from 'atoms'
import EquipmentAssetReliability from 'pages/building/assetReliability/equipment-asset-reliability/EquipmentAssetReliability'


const AssetReliabilityWrapper = styled.div`
  margin-bottom: 50px;
`

const AssetReliability = () => {
  const data = {
    listOfPotentialFaults: [
      {
        id: 0,
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
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
        subSystem: 'Mechanical Ventilation',
        asset: 'Carpark Fan 1',
        fault: 'Motor Winding',
        potentialDownTime: 23,
        sparePartsLeadTime: 19,
        estimatedTimeToFailure: 9,
        likelihood: 1,
        impact: 2
      }
    ],
    currentSubSystemHealth: {
      data: [{
        name: 'Cooling',
        value: 55
      },
        {
          name: 'Heating',
          value: 95
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
    maintenanceBudgetBySubSystemEN: [
      {
        id: 0,
        subSystem: 'cooling',
        used: 5000,
        accrued: 1300,
        allocated: 7300
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
        allocated: 4300
      },
      {
        id: 3,
        subSystem: 'mechanical ventilation',
        used: 5900,
        accrued: 900,
        allocated: 7200
      },
      {
        id: 4,
        subSystem: 'facility envelope',
        used: 4000,
        accrued: 5900,
        allocated: 4300
      },
      {
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
        allocated: 3100
      }
    ],
    maintenanceBudgetBySubSystemDE: [
      {
        id: 0,
        subSystem: 'kühlung',
        verwendet: 5000,
        erwachsen: 1300,
        zugewiesen: 7300
      },
      {
        id: 1,
        subSystem: 'heizung',
        verwendet: 3000,
        erwachsen: 5100,
        zugewiesen: 6500
      },
      {
        id: 2,
        subSystem: 'beleuchtung',
        verwendet: 3100,
        erwachsen: 200,
        zugewiesen: 4300
      },
      {
        id: 3,
        subSystem: 'mechanische lüftung',
        verwendet: 5900,
        erwachsen: 900,
        zugewiesen: 7200
      },
      {
        id: 4,
        subSystem: 'dach- und fach',
        verwendet: 4000,
        erwachsen: 5900,
        zugewiesen: 4300
      },
      {
        id: 5,
        subSystem: 'erneuerbare energie',
        verwendet: 1800,
        erwachsen: 500,
        zugewiesen: 3100
      },
      {
        id: 6,
        subSystem: 'sonstige elektr. systeme',
        verwendet: 2100,
        erwachsen: 300,
        zugewiesen: 3100
      }
    ]
  }

  const { path } = useRouteMatch()
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)

  setIsDisplayPerformanceFilter(false)


  return (
    <AssetReliabilityWrapper>

      <Switch>
        <Route exact path={`${path}/`}>
          <AssetReliabilityMain data={data} />
        </Route>
        <Route path={`${path}/issue/:id`}>
          <IssueDetail data={data.listOfPotentialFaults} />
        </Route>
        <Route path={`${path}/equipment/:equipmentId/:subBreakdownName`}>
          <EquipmentAssetReliability />
        </Route>
      </Switch>

    </AssetReliabilityWrapper>
  )
}

export default AssetReliability
