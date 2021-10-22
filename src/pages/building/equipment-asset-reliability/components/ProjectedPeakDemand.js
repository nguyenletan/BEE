import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { line } from 'd3-shape'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const ProjectedPeakDemand = () => {
  // const points = {
  //   '07-Oct': 2,
  //    '14-Oct': 1,
  //   '21-Oct': 1
  // }
  let depreciationData = [
    {
      id: 'Book Value',
      //hard code or dummy data
      data: [
        { x: 'Jan 2020', y: 10100 },
        { x: 'Feb 2020', y: 15000 },
        { x: 'Mar 2020', y: 22000 },
        { x: 'Apr 2020', y: 27000 },
        { x: 'May 2020', y: 29500 },
        { x: 'Jun 2020', y: 32000 },
        { x: 'Jul 2020', y: 31200 },
        { x: 'Aug 2020', y: 32300 },
        { x: 'Sep 2020', y: 32800 },
        { x: 'Oct 2020', y: 35000 },
        { x: 'Nov 2020', y: 37000 },
        { x: 'Dec 2020', y: 45000 },
      ],
    }
  ]

  const Line = ({ series, innerHeight, margin }) => {
    // let data0
    // for (let i = 0; i < series[0]?.data.length; i++) {
    //   console.log(series[0]?.data[i].data.x)
    //   if (series[0]?.data[i].data.x >= currentAge) {
    //     data0 = series[0]?.data[i]
    //     break
    //   }
    // }
    //
    // const x = data0?.position?.x
    //
    return (
      <>
        {/*<text x={x - 40} y="-5" className="small">Current Age</text>*/}
        <text x={260} y="-5" className="small" strokeWidth={1} stroke="#87972f">2 Potential Issues</text>
        <text x={460} y="-5" className="small" strokeWidth={1} stroke="#87972f">1 Potential Issue</text>
        <text x={660} y="-5" className="small" strokeWidth={1} stroke="#87972f">1 Potential Issue</text>
        {/*<line*/}
        {/*  x1={x} y1={0} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"*/}
        {/*  strokeWidth={1}*/}
        {/*/>*/}

        <line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
        <line x1="500" y1="10" x2="500" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
        <line x1="700" y1="10" x2="700" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
      </>
    )
  }

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    data: depreciationData,
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
      legend: 'KWh',
      legendOffset: -60,
      legendPosition: 'middle',
    },

    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', Line],

  }

  return (
    <Wrapper>
      <h5>Projected Peak Demand (kW)</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default ProjectedPeakDemand