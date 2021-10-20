import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const Reliability = () => {

  let reliabilityData = [
    {
      id: 'Mean Time Between Failure',
      //hard code or dummy data
      data: [
        { x: 2007, y: 500000 },
        { x: 2008, y: 420000 },
        { x: 2009, y: 450000 },
        { x: 2010, y: 300000 },
        { x: 2011, y: 220000 },
        { x: 2012, y: 230000 },
        { x: 2013, y: 170000 },
        { x: 2014, y: 174000 },
        { x: 2015, y: 160000 },
        { x: 2016, y: 152000 },
        { x: 2017, y: 137000 },
        { x: 2018, y: 127000 },
        { x: 2019, y: 117200 },
        { x: 2020, y: 107500 },
        { x: 2021, y: 97000 },

      ],
    },
    {
      id: 'Mean Time to Repair',
      //hard code or dummy data
      data: [
        { x: 2007, y: 700000 },
        { x: 2008, y: 650000 },
        { x: 2009, y: 625000 },
        { x: 2010, y: 630000 },
        { x: 2011, y: 572000 },
        { x: 2012, y: 552000 },
        { x: 2013, y: 537000 },
        { x: 2014, y: 507000 },
        { x: 2015, y: 460000 },
        { x: 2016, y: 362000 },
        { x: 2017, y: 340700 },
        { x: 2018, y: 237000 },
        { x: 2019, y: 247200 },
        { x: 2020, y: 175000 },
        { x: 2021, y: 152700 },
      ],
    },
  ]

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: -0,
        translateY: -55,
        itemsSpacing: 2,
        itemWidth: 155,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
    data: reliabilityData,
    animate: true,
    colors: ['#3D511B','#87972f'],
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
      legend: '$',
      legendOffset: -60,
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
      <h5>Reliability (Hours)</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default Reliability