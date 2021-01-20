import React from 'react'
import styled from 'styled-components'
import BuildingEnergyPerformance from './BuildingEnergyPerformance'
import CO2EmissionsPerformance from './CO2EmissionsPerformance'

const PotentialSavingsWrapper = styled.div`
  margin-bottom: 40px;
  margin-top: 40px;
`
const PotentialSavingsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 30px;
`

const PotentialSavingItem = styled.li`
  width: 165px;
  min-height: 158px;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 10px;
  list-style-type: none;
  margin-bottom: 25px;
`

const PotentialSavingItemTitle = styled.h4`
  font-size: 0.85rem;
  text-align: center;
  height: 2rem;
`

const PotentialSavingItemValue = styled.h4`
  font-size: 3rem;
  text-align: center;
  margin: auto;

  color: var(--primary);
`


const potentialSavingsData = {
  saving:
    [
      {
        title: 'Annual Energy Savings',
        unit: 'MWh',
        value: -618
      },
      {
        title: 'Annual Energy Cost Savings',
        unit: '$1000',
        value: -68.2
      },
      {
        title: 'Annual CO2 Emissions Avoided',
        unit: 'Tons',
        value: -189
      },
      {
        title: 'Investment Cost',
        unit: '$1000',
        value: 460
      },
      {
        title: 'Simple Payback',
        unit: 'Years',
        value: 6.7
      },
      {
        title: 'Energy Usage Intensity Reduction',
        unit: 'kWh/m2/yr',
        value: -23.8
      }
    ]
}

const PotentialSavings = () => {
  const PotentialSavingItems = potentialSavingsData.saving.map(item => (
    <PotentialSavingItem key={item.title}>
    <PotentialSavingItemTitle>{item.title} ({item.unit})</PotentialSavingItemTitle>
    <PotentialSavingItemValue>{item.value}</PotentialSavingItemValue>
  </PotentialSavingItem>))

  return (
    <PotentialSavingsWrapper className="row">
      <div className="col-5">
        <PotentialSavingsTitle>Potential Savings</PotentialSavingsTitle>
        <div className="d-flex justify-content-between flex-wrap">
          {PotentialSavingItems}
        </div>
      </div>

      <div className="col-7">
        <div className="d-flex">
          <BuildingEnergyPerformance/>
          <CO2EmissionsPerformance/>
        </div>
      </div>

    </PotentialSavingsWrapper>
  )

}

export default PotentialSavings