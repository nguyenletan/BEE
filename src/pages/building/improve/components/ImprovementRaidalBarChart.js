import React from 'react'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 400px;
  height: 400px;
  margin: 50px auto 0;
`

const Title = styled.h4`
  font-size: 1.2em;
  margin: 0 auto 25px;
`

const ImprovementRaidalBarChart = ({ title, data }) => {

  const commonProps = {
    data: data,
    padding: 0.5,
    cornerRadius: 2,
    enableTracks: true,
    margin: { top: 0, right: 0, bottom: 80, left: 0 },
    radialAxisStart: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
    circularAxisOuter: { tickSize: 5, tickPadding: 12, tickRotation: 0 },
    colors: ({ id, data }) => {
      if(data.x === 'Min(0%)') {
        return '#d5dfa3'
      }
      if (data.x.includes('Before')) {
        return '#d5dfa3'
      }
      if(data.x.includes('After')) {
        return '#acbf42'
      }
      return '#636c2e'
    },
    legends: [{
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 95,
        translateY: -20,
        itemsSpacing: 6,
        itemDirection: 'left-to-right',
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'square',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ],
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <ResponsiveRadialBar {...commonProps}/>
    </Wrapper>
  )
}

export default ImprovementRaidalBarChart