import React, { Fragment } from 'react'
import { line } from 'd3-shape'
import styled from 'styled-components'
//import { monotoneX } from 'd3-shape/src/curve/monotone'
import { Bar } from '@nivo/bar'
import {
  coolingSVG,
  envelopeSVG,
  heatingSVG,
  lightingSVG,
  mechVentSVG,
  plugLoadSVG,
  renewableSVG
} from '../../../../SvgConstants'

const lineColor = '#636c2e'

const MaintenanceBudgetBySubSystemWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px 40px 30px 30px;
  margin-right: 40px;
`

const MaintenanceBudgetBySubSystemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const MaintenanceBudgetBySubSystem = ({ data }) => {
  const keys = ['used', 'accrued']
  console.log(data)
  const commonProps = {
    width: 800,
    height: 350,
    margin: { top: 0, right: 0, bottom: 80, left: 20 },
    data: data,
    indexBy: 'id',
    keys,
    padding: 0.75,
    enableLabel: false,
    groupMode: 'stacked'
  }

  const Line = ({ bars, xScale, yScale }) => {

    const lineGenerator = line()
      .x(bar => {


        if (bar.data.id !== 'used')
          return null

        return xScale(bar.data.index) + bar.width / 2
      })
      .y(bar => {


        if (bar.data.id !== 'used')
          return null

        return yScale(bar.data.data.allocated)
      })//.curve(monotoneX)

    // console.log(lineGenerator(bars))
    // console.log(x)
    // console.log(y)

    //console.log(lineGenerator)
    let pathString = lineGenerator(bars).replaceAll('L0,0', '');


    return (
      <Fragment>
        <path
          d={pathString}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeDasharray="18"
          style={{ pointerEvents: 'none' }}
        />

        {
          bars.map(bar => {
            if (bar.data.id !== 'accrued')
              return null
            return (
              <>
                {/*<text x={xScale(bar.data.index) + bar.width / 2} y={yScale(bar.data.data.allocated)}></text>*/}
                <circle
                  key={bar.key}
                  cx={xScale(bar.data.index) + bar.width / 2}
                  cy={yScale(bar.data.data.allocated)}
                  r={4}
                  fill="white"
                  stroke={lineColor}
                  style={{ pointerEvents: 'none' }}
                />
              </>
            )
          })}
      </Fragment>
    )
  }


  const CustomTick = tick => {
    const x = 18
    const y = 50
    const item = data.find(i => i.id === tick.value)

    const icon = (subSystem) => {
      let imgX = 0
      let imgY = 0
      switch (subSystem) {
        case 'cooling':
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
            {coolingSVG()}
          </g>)

        case 'heating':
          imgX = 10
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
            {heatingSVG()}
          </g>)

        case 'mechanical ventilation':
          return (<g transform={`translate(${imgX}, ${imgY})`}>
            {mechVentSVG()}
          </g>)

        case 'lighting':
          imgX = 6
          return (<g transform={`translate(${imgX}, ${imgY})`}>
            {lightingSVG()}
          </g>)

        case 'facility envelope':
          imgX = -8
          return (<g transform={`translate(${imgX}, ${imgY})`}>
            {envelopeSVG()}
          </g>)

        case 'renewables':
          imgX = -5
          return (<g transform={`translate(${imgX}, ${imgY})`}>
            {renewableSVG()}
          </g>)

        case 'others':
          imgX = 3
          imgY = 3
          return (<g transform={`translate(${imgX}, ${imgY})`}>
            {plugLoadSVG()}
          </g>)

        default:
          return ''
      }
    }

    return (
      <g transform={`translate(${tick.x - 18},${tick.y + 6})`}>

        {icon(item.subSystem)}

        <text
          transform={`translate(${x},${y})`}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: '#333',
            fontSize: 10,
          }}
        >
          {item.subSystem}
        </text>
      </g>
    )
  }

  return (
    <MaintenanceBudgetBySubSystemWrapper>
      <MaintenanceBudgetBySubSystemTitle>Maintenance Budget By Sub-System</MaintenanceBudgetBySubSystemTitle>
      <Bar
        {...commonProps}
        colors={['#87972f', '#d3dca1', '#636c2e']}
        layers={[
          'grid', 'axes', 'bars', 'markers', 'legends', Line
        ]}
        borderRadius={1}
        axisBottom={{
          renderTick: CustomTick,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 95,
            itemsSpacing: 2,
            itemWidth: 92,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </MaintenanceBudgetBySubSystemWrapper>
  )
}

export default MaintenanceBudgetBySubSystem