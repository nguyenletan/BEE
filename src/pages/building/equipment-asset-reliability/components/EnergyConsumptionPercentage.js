import React from 'react'
import styled from 'styled-components'
import PercentagePieChart from './PercentagePieChart'

const Wrapper = styled.div`

`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 1rem;
`

const EnergyConsumptionPercentage = () => {

  const data = {
    equipmentGroup: [
      {
        id: 'used',
        label: 'Used',
        value: 23685,
        color: '#87972f',
        remaining: 77691,
      },
      {
        id: 'remaining',
        label: 'Remaining',
        value: 77691,
        color: '#ecedef',
        remaining: 77691,
      },
    ],
    subSystem: [
      {
        id: 'used',
        label: 'Used',
        value: 8850,
        color: '#87972f',
        remaining: 77691,
      },
      {
        id: 'remaining',
        label: 'Remaining',
        value: 77691,
        color: '#ecedef',
        remaining: 77691,
      },
    ],
    building: [
      {
        id: 'used',
        label: 'Used',
        value: 31850,
        color: '#87972f',
        remaining: 77691,
      },
      {
        id: 'remaining',
        label: 'Remaining',
        value: 77691,
        color: '#ecedef',
        remaining: 77691,
      },
    ],
  }
  return (
    <Wrapper>
      <h5 className="mb-5">Energy Consumption %</h5>
      <Row>
        <Label>of Equipment Group</Label>
        <PercentagePieChart
          data={data.equipmentGroup}
        />
      </Row>

      <Row>
        <Label>of Sub-system</Label>
        <PercentagePieChart
          data={data.subSystem}
        />
      </Row>

      <Row>
        <Label>of Building</Label>
        <PercentagePieChart
          data={data.building}
        />
      </Row>
    </Wrapper>
  )

}

export default EnergyConsumptionPercentage