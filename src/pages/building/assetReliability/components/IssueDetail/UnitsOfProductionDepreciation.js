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

const UnitsOfProductionDepreciation = () => {
  const data = [
    {
      id: 'Standard Depreciation',

      data: [
        {
          y: 1500000,
          x: 0
        },
        {
          y: 1439250,
          x: 1
        },
        {
          y: 1347750,
          x: 2
        },
        {
          y: 1236750,
          x: 3
        },
        {
          y: 1146000,
          x: 4
        },
        {
          y: 1064250,
          x: 5
        },
        {
          y: 978000,
          x: 6
        },
        {
          y: 888000,
          x: 7
        },
        {
          y: 795000,
          x: 8
        },
        {
          y: 708000,
          x: 9
        },
        {
          y: 604500,
          x: 10
        },
        {
          y: 504750,
          x: 11
        },
        {
          y: 461250,
          x: 12
        },
        {
          y: 399750,
          x: 13
        },
        {
          y: 357750,
          x: 14
        },
        {
          y: 307500,
          x: 15
        },
        {
          y: 234000,
          x: 16
        },
        {
          y: 161250,
          x: 17
        },
        {
          y: 95250,
          x: 18
        },
        {
          y: 42000,
          x: 19
        },
        {
          y: 0,
          x: 20
        }
      ]
    },
    {
      id: 'Condition Based Depreciation',

      data: [
        {
          y: 1500000,
          x: 0
        },
        {
          y: 1380882,
          x: 1
        },
        {
          y: 1296176,
          x: 2
        },
        {
          y: 1171765,
          x: 3
        },
        {
          y: 1079118,
          x: 4
        },
        {
          y: 953824,
          x: 5
        },
        {
          y: 855882,
          x: 6
        },
        {
          y: 748235,
          x: 7
        },
        {
          y: 615882,
          x: 8
        },
        {
          y: 509118,
          x: 9
        },
        {
          y: 401471,
          x: 10
        },
        {
          y: 279706,
          x: 11
        },
        {
          y: 187059,
          x: 12
        },
        {
          y: 68824,
          x: 13
        },
        {
          y: 34412,
          x: 14
        },
        {
          y: 17206,
          x: 15
        },
        {
          y: 8603,
          x: 16
        },
        {
          y: 0,
          x: 17
        }
      ]
    }

  ]

  const Line = ({ series, innerHeight }) => {
    const data0 = series[0]?.data.filter(d => d.data.x === 17)
    const x = data0[0]?.position?.x

    return (
      <>
        <text x={x - 30} y='0' className='small'>Current Age</text>
        <line x1={x} y1={8} x2={x} y2={innerHeight} stroke='#5F5283' strokeDasharray='8' strokeWidth={1} />
      </>
    )
  }

  const commonProperties = {

    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: ['#BA5657', '#87972f'],
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
        translateX: -60,
        translateY: -40,
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
    ],
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', Line]
  }

  return (
    <Wrapper>
      <Title>Units Of Production Depreciation</Title>

      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}

          yScale={{
            type: 'linear',
            stacked: false
          }}
        />

      </ChartWrapper>
    </Wrapper>
  )
}

export default UnitsOfProductionDepreciation
