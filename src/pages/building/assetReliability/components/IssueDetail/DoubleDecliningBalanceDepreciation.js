import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px;
  min-width: 420px;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const ChartWrapper = styled.div`
  height: 350px;
`

const DoubleDecliningBalanceDepreciation = () => {
  const data = [
    {
      'id': 'Standard Depreciation',

      'data': [
        {
          'y': 1500000,
          'x': 0
        },
        {
          'y': 1462500,
          'x': 1
        },
        {
          'y': 1398000,
          'x': 2
        },
        {
          'y': 1302000,
          'x': 3
        },
        {
          'y': 1240500,
          'x': 4
        },
        {
          'y': 1145250,
          'x': 5
        },
        {
          'y': 1095000,
          'x': 6
        },
        {
          'y': 993750,
          'x': 7
        },
        {
          'y': 893250,
          'x': 8
        },
        {
          'y': 799500,
          'x': 9
        },
        {
          'y': 742500,
          'x': 10
        },
        {
          'y': 630000,
          'x': 11
        },
        {
          'y': 560250,
          'x': 12
        },
        {
          'y': 474000,
          'x': 13
        },
        {
          'y': 429750,
          'x': 14
        },
        {
          'y': 386250,
          'x': 15
        },
        {
          'y': 333750,
          'x': 16
        },
        {
          'y': 255750,
          'x': 17
        },
        {
          'y': 189750,
          'x': 18
        },
        {
          'y': 132750,
          'x': 19
        },
        {
          'y': 0,
          'x': 20
        },
      ]
    },
    {
      'id': 'Condition Based Depreciation',

      'data': [
        {
          'y': 1500000,
          'x': 0
        },
        {
          'y': 1412647,
          'x': 1
        },
        {
          'y': 1290882,
          'x': 2
        },
        {
          'y': 1237941,
          'x': 3
        },
        {
          'y': 1132059,
          'x': 4
        },
        {
          'y': 1058824,
          'x': 5
        },
        {
          'y': 1059706,
          'x': 6
        },
        {
          'y': 940588,
          'x': 7
        },
        {
          'y': 894706,
          'x': 8
        },
        {
          'y': 786176,
          'x': 9
        },
        {
          'y': 726176,
          'x': 10
        },
        {
          'y': 675882,
          'x': 11
        },
        {
          'y': 562941,
          'x': 12
        },
        {
          'y': 480000,
          'x': 13
        },
        {
          'y': 370588,
          'x': 14
        },
        {
          'y': 323824,
          'x': 15
        },
        {
          'y': 213529,
          'x': 16
        },
        {
          'y': 103235,
          'x': 17
        },
        {
          'y': 0,
          'x': 17
        }
      ]
    },

  ]

  const commonProperties = {

    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: [ '#BA5657', '#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints: false,
    curve: 'natural',
    axisLeft: {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Asset Value ($)',
      legendOffset: -65,
      legendPosition: 'middle'
    },
    axisBottom: {
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Equipment Age (Yrs)',
      legendOffset: 36,
      legendPosition: 'middle'
    },
    legends: [
      {
        anchor: 'top middle',
        direction: 'row',
        justify: false,
        translateX: -20,
        translateY: -35,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 200,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 10,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]
  }

  return (
    <Wrapper>
      <Title>Straight Line Depreciation</Title>

      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}

          yScale={{
            type: 'linear',
            stacked: false,
          }}
        />

      </ChartWrapper>
    </Wrapper>
  )

}

export default DoubleDecliningBalanceDepreciation