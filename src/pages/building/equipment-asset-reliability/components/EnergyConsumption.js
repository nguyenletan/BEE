import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const EnergyConsumption = () => {
  const data = [
    {
      id: 'Energy Consumption',
      //hard code or dummy data
      data: [
        { x: 2007, y: 205 },
        { x: 2008, y: 320 },
        { x: 2009, y: 555 },
        { x: 2010, y: 450 },
        { x: 2011, y: 680 },
        { x: 2012, y: 720 },
        { x: 2013, y: 777 },
      ],
    },
  ]

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: ['#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints: false,
    lineWidth: 3,
    yScale: {
      type: 'linear',
      stacked: false,
    },
    curve: 'linear',
    axisLeft: {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'mWh',
      legendOffset: -45,
      legendPosition: 'middle',
    },
    axisBottom: {
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Year',
      legendOffset: 36,
      legendPosition: 'middle',
    },
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends'],

  }

  return (
    <Wrapper>
      <h5>Energy Consumption (mWh)</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )
}

export default EnergyConsumption