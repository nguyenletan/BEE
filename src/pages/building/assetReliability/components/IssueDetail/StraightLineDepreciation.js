import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { line } from 'd3-shape'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px;
  min-width: 420px;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const ChartWrapper = styled.div`
  height: 350px;
`

const StraightLineDepreciation = () => {
  const data = [
    {
      'id': 'Standard Depreciation',

      'data': [
        {
          'y': 1500000,
          'x': 0
        },
        {
          'y': 1425000,
          'x': 1
        },
        {
          'y': 1350000,
          'x': 2
        },
        {
          'y': 1275000,
          'x': 3
        },
        {
          'y': 1200000,
          'x': 4
        },
        {
          'y': 1125000,
          'x': 5
        },
        {
          'y': 1050000,
          'x': 6
        },
        {
          'y': 975000,
          'x': 7
        },
        {
          'y': 900000,
          'x': 8
        },
        {
          'y': 825000,
          'x': 9
        },
        {
          'y': 750000,
          'x': 10
        },
        {
          'y': 675000,
          'x': 11
        },
        {
          'y': 600000,
          'x': 12
        },
        {
          'y': 525000,
          'x': 13
        },
        {
          'y': 450000,
          'x': 14
        },
        {
          'y': 375000,
          'x': 15
        },
        {
          'y': 300000,
          'x': 16
        },
        {
          'y': 225000,
          'x': 17
        },
        {
          'y': 150000,
          'x': 18
        },
        {
          'y': 75000,
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
          'y': 1411765,
          'x': 1
        },
        {
          'y': 1323529,
          'x': 2
        },
        {
          'y': 1235294,
          'x': 3
        },
        {
          'y': 1147059,
          'x': 4
        },
        {
          'y': 1058824,
          'x': 5
        },
        {

          'y': 970588,
          'x': 6
        },
        {
          'y': 882353,
          'x': 7
        },
        {
          'y': 794118,
          'x': 8
        },
        {
          'y': 705882,
          'x': 9
        },
        {
          'y': 617647,
          'x': 10
        },
        {
          'y': 529412,
          'x': 11
        },
        {
          'y': 441176,
          'x': 12
        },
        {
          'y': 352941,
          'x': 13
        },
        {
          'y': 264706,
          'x': 14
        },
        {
          'y': 176471,
          'x': 15
        },
        {
          'y': 88235,
          'x': 16
        },
        {
          'y': 0,
          'x': 17
        }
      ]
    },

  ]


  const Line = () => {
    return (
      <>
        <text x="200" y="0" className="small">Current Age</text>
        <line x1="236" y1="10" x2="236" y2="285" stroke="#5F5283" strokeDasharray="8" strokeWidth={1}/>
      </>
    )
  }

  const commonProperties = {

    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: [ '#BA5657', '#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints:false,
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
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', Line],
    legends: [
        {
          anchor: 'top middle',
          direction: 'row',
          justify: false,
          translateX: -20,
          translateY: -45,
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

  console.log(data)
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

export default StraightLineDepreciation