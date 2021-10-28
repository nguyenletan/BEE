/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { line } from 'd3-shape'
import { getProjectPeakDemand } from 'api/EquipmentAPI'
import { useAuth } from 'AuthenticateProvider'
import { getMonthName } from 'Utilities'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const ProjectedPeakDemand = (props) => {
  // const points = {
  //   '07-Oct': 2,
  //    '14-Oct': 1,
  //   '21-Oct': 1
  // }


  const { equipmentId } = props
  const { user } = useAuth()
  const [depreciationData, setDepreciationData] = useState([])


  const convertRawDataToChartData = (rawData) => {
    const dataSource = [
      {
        id: 'ProjectPeakDemand',
        data: rawData.map(d => {
          return {
            x: getMonthName(d.month) + ' ' + d.day,
            y: +d.average.toFixed(2),
          }
        }),
      }]
    setDepreciationData(dataSource)
  }

  const getProjectPeakDemandInfo =  async () => {
    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getProjectPeakDemand(equipmentId, 14, idToken)
    convertRawDataToChartData(tmp)
  }

  useEffect(() => {
    getProjectPeakDemandInfo()
    //TS
  }, [equipmentId])

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
    enableSlices: false,
    enableGridX: false,
    enableGridY: true,
    enablePoints: true,
    pointBorderWidth: 4,
    pointBorderColor: { from: 'serieColor' },
    pointColor: { theme: 'background' },
    isInteractive: true,
    useMesh: true,

    lineWidth: 2,
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