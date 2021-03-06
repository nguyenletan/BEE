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
  font-size: 2rem;
  text-align: center;
  margin: auto;
  line-height: 3rem;
  color: var(--primary);
`

const PotentialSavings = ({data}) => {

  const PotentialSavingItems = data.saving.map(item => (
    <PotentialSavingItem key={item.title} className="d-flex flex-column">
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
          <BuildingEnergyPerformance improved={data.energyPerformance.improved}/>
          <CO2EmissionsPerformance improved={data.CO2EmissionsPerformance.improved}/>
        </div>
      </div>

    </PotentialSavingsWrapper>
  )

}

export default PotentialSavings