import React from 'react'
import styled from 'styled-components'
import TotalBreakDownPieChart from './TotalBreakDownPieChart'

const Wrapper = styled.div`

`

const TotalCostBreakDown = () => {

  const data = [
    {
      id: 'energy',
      label: 'Energy',
      value: 40,
      color: '#87972f',
      pureValue:  400000
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      value: 23,
      color: '#acbf42',
      pureValue: 230000
    },
    {
      id: 'parts',
      label: 'Parts',
      value: 27,
      color: '#d5dfa3',
      pureValue: 270000
    },
  ]

  return (
    <Wrapper>
      <h5>Total Cost Breakdown</h5>

      <TotalBreakDownPieChart
        title=""
        startAngle={-0}
        data={data}
        innerRadius={0.55}
        marginRight="0px"
        hasDescription
      />
    </Wrapper>
  )

}

export default TotalCostBreakDown