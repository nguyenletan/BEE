import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { line } from 'd3-shape'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const Depreciation = () => {
  const currentAge = 16
  let depreciationData = [
    {
      id: 'Book Value',
      //hard code or dummy data
      data: [
        { x: 0, y: 500000 },
        { x: 1, y: 470000 },
        { x: 2, y: 450000 },
        { x: 3, y: 420000 },
        { x: 4, y: 380000 },
        { x: 5, y: 350000 },
        { x: 6, y: 320000 },
        { x: 7, y: 310000 },
        { x: 8, y: 280000 },
        { x: 9, y: 160000 },
        { x: 10, y: 125000 },
        { x: 11, y: 92000 },
        { x: 12, y: 81000 },
        { x: 13, y: 72000 },
        { x: 14, y: 58000 },
        { x: 15, y: 29000 },
        { x: 16, y: 15000 },
        { x: 17, y: 8000 },
        { x: 18, y: 4000 },
        { x: 19, y: 1000 },
        { x: 20, y: 0 },

      ],
    },
    {
      id: 'Condition Value',
      //hard code or dummy data
      data: [
        { x: 0, y: 550000 },
        { x: 1, y: 520000 },
        { x: 2, y: 500000 },
        { x: 3, y: 450000 },
        { x: 4, y: 425000 },
        { x: 5, y: 415000 },
        { x: 6, y: 413000 },
        { x: 7, y: 403000 },
        { x: 8, y: 392000 },
        { x: 9, y: 372000 },
        { x: 10, y: 352000 },
        { x: 11, y: 322000 },
        { x: 12, y: 302000 },
        { x: 13, y: 312000 },
        { x: 14, y: 292000 },
        { x: 15, y: 188200 },
        { x: 16, y: 125200 },
        { x: 17, y: 85000 },
        { x: 18, y: 22000 },
        { x: 19, y: 18200 },
        { x: 20, y: 0 },
      ],
    },
  ]

  const style = {
    dashed: {
      strokeDasharray: '12, 6',
      strokeWidth: 3
    },
    default: {
      strokeWidth: 3
    }
  }


  const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => {
        if (id === 'Condition Value') {
          const data1 = data.filter(d => d.data.x <= 16)
          const data2 = data.filter(d => d.data.x >= 16)

          return (
            <>
              <path
                key={id}
                d={lineGenerator(
                  data1.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y)
                  }))
                )}
                fill='none'
                stroke={color}
                style={style.default}
              />
              <path
                key={id}
                d={lineGenerator(
                  data2.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y)
                  }))
                )}
                fill='none'
                stroke={color}
                style={style.dashed}
              />
            </>
          )
        } else {
          return (
            <path
              key={id}
              d={lineGenerator(
                data.map(d => ({
                  x: xScale(d.data.x),
                  y: yScale(d.data.y)
                }))
              )}
              fill='none'
              stroke={color}
              style={style.default}
            />
          )
        }
      }
    )
  }

  const Line = ({ series, innerHeight, margin }) => {
    let data0
    for (let i = 0; i < series[0]?.data.length; i++) {
      console.log(series[0]?.data[i].data.x)
      if (series[0]?.data[i].data.x >= currentAge) {
        data0 = series[0]?.data[i]
        break
      }
    }

    const x = data0?.position?.x

    return (
      <>
        <text x={x - 40} y="-5" className="small">Current Age</text>
        <line
          x1={x} y1={0} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"
          strokeWidth={1}
        />
        {/*<line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>*/}
      </>
    )
  }

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: 40,
        translateY: -55,
        itemsSpacing: 2,
        itemWidth: 125,
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
    data: depreciationData,
    animate: true,
    colors: ['#3D511B', '#87972f'],
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
      legend: 'Asset Value $',
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
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair',  'points', 'slices', 'mesh', 'legends', Line, DashedLine],

  }

  return (
    <Wrapper>
      <h5>Depreciation</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default Depreciation