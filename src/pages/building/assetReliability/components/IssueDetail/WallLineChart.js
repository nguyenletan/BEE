import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { line } from 'd3-shape'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px;

`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const ChartWrapper = styled.div`
  height: 350px;
`

const WallLineChart = ({title}) => {
  const data = [
    {
      'id': 'Current0',

      'data': [
        {
          'y': 750000,
          'x': -5
        },
        {
          'y': 850000,
          'x': -4
        },
        {
          'y': 960000,
          'x': -3
        },
        {
          'y': 1095000,
          'x': -2
        },
        {
          'y': 1200000,
          'x': -1
        },
        {
          'y': 1325000,
          'x': 0
        },

      ]
    },

    {
      'id': 'Current1',

      'data': [

        {
          'y': 1500000,
          'x': 1
        },
        {
          'y': 1605000,
          'x': 2
        },
        {
          'y': 1750000,
          'x': 3
        },
        {
          'y': 1825000,
          'x': 4
        },
        {
          'y': 1900000,
          'x': 5
        },


      ]
    },
    {
      'id': 'Replacement',

      'data': [
        {
          'y': 300000,
          'x': 1
        },
        {
          'y': 405000,
          'x': 2
        },
        {
          'y': 501000,
          'x': 3
        },
        {
          'y': 582000,
          'x': 4
        },
        {
          'y': 690000,
          'x': 5
        },


      ]
    },
  ]

  const styleById = {
    Current1: {
      strokeDasharray: '12, 6',
      strokeWidth: 3,
    },
    default: {
      strokeWidth: 3,
    }
  }



  const Line = () => {
    return (
      <>
        <text x="250" y="0" className="small">Warranty</text>
        <line x1="253" y1="10" x2="253" y2="285" stroke="#87972f" strokeDasharray="3" strokeWidth={1}/>
        <line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
      </>
    )
  }

  const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => (
      <path
        key={id}
        d={lineGenerator(
          data.map(d => ({
            x: xScale(d.data.x),
            y: yScale(d.data.y),
          }))
        )}
        fill="none"
        stroke={color}
        style={styleById[id] || styleById.default}
      />
    ))
  }

  const commonProperties = {

    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: ['#f47560', '#f47560', '#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints:false,
    curve: 'natural',
    layers: ['grid', 'markers', 'areas', 'slices', 'points', 'axes', 'legends','crosshair','mesh', Line, DashedLine]

  }

  return (
    <Wrapper>
      <Title>{title}</Title>

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

export default WallLineChart
