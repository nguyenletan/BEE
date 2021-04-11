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

const WallLineChart = ({ data, title, noWall }) => {

  const style = {
    dashed: {
      strokeDasharray: '12, 6',
      strokeWidth: 3,
    },
    default: {
      strokeWidth: 3,
    }
  }

  const Square = (props) => {
    const { series, innerHeight } = props
    console.log(series)
    const data0 = series[0]?.data.filter(d => d.data.x === 0)
    const data1 = series[0]?.data.filter(d => d.data.x === 1)



    const x = data0[0]?.position?.x
    const width = data1[0]?.position?.x - data0[0]?.position?.x
    return (
      <>
        <rect x={x} y="15" width={width} height={innerHeight - 15} rx="0" fill="#87972f" fillOpacity="0.2"/>
      </>
    )
  }

  const Line = ({ series, innerHeight, margin }) => {
    const data0 = series[0]?.data.filter(d => d.data.x === 0)
    const x = data0[0]?.position?.x
    const y1 = data0[0]?.position?.y

    return (
      <>
        <text x={x} y="0" className="small">Warranty</text>
        <line x1={x} y1={y1 - (margin.top + margin.bottom) - 5} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"
              strokeWidth={1}/>
        {/*<line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>*/}
      </>
    )
  }

  const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {

    return series.map(({ id, data, color }) => {

        if (id === 'Current') {
          const data1 = data.filter(d => d.data.x <= 0)
          const data2 = data.filter(d => d.data.x >= 0)

          return (
            <>
              <path
                key={id}
                d={lineGenerator(
                  data1.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y),
                  }))
                )}
                fill="none"
                stroke={color}
                style={style.default}
              />
              <path
                key={id}
                d={lineGenerator(
                  data2.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y),
                  }))
                )}
                fill="none"
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
                  y: yScale(d.data.y),
                }))
              )}
              fill="none"
              stroke={color}
              style={style.default}
            />
          )
        }
      }
    )
  }

  const layers = !noWall
    ? ['grid', 'markers', 'areas', 'slices', 'points', 'axes', 'legends', 'crosshair', 'mesh', Line, DashedLine, Square]
    : ['grid', 'markers', 'areas', 'slices', 'points', 'axes', 'legends', 'crosshair', 'mesh', Line, DashedLine]

  const commonProperties = {

    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data,
    animate: true,
    colors: ['#373637', '#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints: false,
    curve: 'natural',
    layers: layers,
    legends: [
      {
        anchor: 'top-left',
        direction: 'row',
        justify: false,
        translateX: -55,
        translateY: -40,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 120,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
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
    axisBottom: {
      format: value =>
        `${value} Yr`,
    }
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
