import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 300px;
  height: 300px;
  margin: 50px auto;
`

const Title = styled.h4`
  font-size: 1.2em;
  margin-bottom: 25px;
`

const ImprovementBarChart = ({ title, data, unit }) => {

  const commonProps = {
    margin: { top: 0, right: 0, bottom: 30, left: 40 },
    padding: 0.2,
    groupMode: 'grouped',
    enableGridY: false,
    enableLabel: false,
    indexBy: 'name',
    keys: ['value'],
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
    borderRadius: 4,
    data: data,
    axisLeft: {
      format: value => {
        if(unit) {
          return value + ' ' + unit
        }
        return value
      }
    },
    colors: ({ id, data }) => {
      if(data.name === 'min(0%)') {
        return '#d5dfa3'
      }
      if (data.name.includes('before')) {
        return '#d5dfa3'
        //return '#acbf42'
      }
      if(data.name.includes('after')) {
        return '#acbf42'
        //return '#87972f'
      }
      return '#636c2e'
    },
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <ResponsiveBar {...commonProps}/>
    </Wrapper>
  )
}

export default ImprovementBarChart