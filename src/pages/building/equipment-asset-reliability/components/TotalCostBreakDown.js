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
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      value: 13,
      color: '#acbf42',
    },
    {
      id: 'parts',
      label: 'Parts',
      value: 27,
      color: '#d5dfa3',
    },
  ]

  return (
    <Wrapper>
      <h5>Total Cost Breakdown</h5>

      <TotalBreakDownPieChart
        title=""
        startAngle={-0}
        data={data}
        innerRadius={0.65}
        marginRight="0px"
        hasDescription
      />
    </Wrapper>
  )

}

export default TotalCostBreakDown