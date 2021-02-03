import React, { Fragment } from 'react'
import { line } from 'd3-shape'
import styled from 'styled-components'
import { monotoneX } from 'd3-shape/src/curve/monotone'
import { Bar } from "@nivo/bar";

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

  const commonProps = {
    width: 800,
    height: 340,
    margin: { top: 20, right: 0, bottom: 60, left: 20 },
    data: data,
    indexBy: 'id',
    keys,
    padding: 0.8,
    enableLabel: false,
    groupMode: 'stacked'
  }

  const Line = ({ bars, xScale, yScale }) => {
    // let i = 0
    // let j = 0
    // let k = 0
    const lineGenerator = line()
      .x(bar => {

        // console.log('bar: ')
        // console.log(bar)
        // console.log(i)

        if(bar.data.id !== 'accrued')
           return null

        return xScale(bar.data.index) + bar.width / 2})
      .y(bar => {
        //console.log(bar.data.data.allocated)

        if(bar.data.id !== 'accrued')
          return null

        // console.log(++k)
        // console.log('bar.data.data.allocated:' + bar.data.data.allocated)
        return yScale(bar.data.data.allocated)
      }).curve(monotoneX)

    //console.log(lineGenerator(bars))

    return (
      <Fragment>
        <path
          d={lineGenerator(bars)}
          fill="none"
          stroke={lineColor}
          strokeWidth={2}
          strokeDasharray="18"
          style={{ pointerEvents: "none" }}
        />

        {
          bars.map(bar => {
            ///j++;
            // console.log('j: ', j)
            // console.log(bar)
            if(bar.data.id !== 'used')
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
                style={{ pointerEvents: "none" }}
              />
            </>
        )})}
      </Fragment>
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
        borderRadius={2}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 60,
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