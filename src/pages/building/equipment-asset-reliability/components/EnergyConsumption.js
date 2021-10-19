/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { useAuth } from '../../../../AuthenticateProvider'
import { getEnergyConsumptionEquipmentByIdAndDatePeriod } from '../../../../api/EquipmentAPI'
import _ from 'lodash'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const EnergyConsumption = (props) => {

  const { equipmentId, startDate, endDate } = props
  const { user } = useAuth()
  const [data, setData] = useState([])
  // let data = [
  //   {
  //     id: 'Energy Consumption',
  //     //hard code or dummy data
  //     data: [
  //       { x: 2007, y: 205 },
  //       { x: 2008, y: 320 },
  //       { x: 2009, y: 555 },
  //       { x: 2010, y: 450 },
  //       { x: 2011, y: 680 },
  //       { x: 2012, y: 720 },
  //       { x: 2013, y: 777 },
  //     ],
  //   },
  // ]

  const convertRawDataToChartData = (rawData) => {
    console.log(rawData)
    const groupByYear = Object.entries(_.groupBy(rawData, 'year'))
    console.log(groupByYear)
    setData(groupByYear.map(g => {
      return {
        id: g[0],
        data: g[1].map(d => {
          return {
            x: d.day,
            y: +d.sum.toFixed(2),
          }
        }),
      }
    }))
  }

  const getEnergyConsumptionEquipmentByIdAndDatePeriodInfo = async () => {
    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getEnergyConsumptionEquipmentByIdAndDatePeriod(equipmentId, startDate, endDate, idToken)
    convertRawDataToChartData(tmp)
  }

  useEffect(() => {
    getEnergyConsumptionEquipmentByIdAndDatePeriodInfo()
    //TS
  }, [equipmentId, startDate, endDate])

  /*const commonProperties = {
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

  }*/

  const commonProperties = {
    margin: { top: 0, right: 0, bottom: 0, left: 20 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: 50,
        translateY: -40,
        itemsSpacing: 2,
        itemWidth: 100,
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
    sliceTooltip: ({ slice }) => {
      // console.log(slice)
      return (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                color: point.serieColor,
                padding: '3px 0',
              }}
            >
              <strong>{point.data.xFormatted}: </strong> {point.data.yFormatted} mWh
            </div>
          ))}
        </div>
      )
    },
    enableArea: true,
    areaOpacity: 0.07,
    colors: { scheme: 'category10' },
    data: data,
    animate: true,
    axisBottom: false,
    enableSlices: false,
    useMesh: true,
    enableGridX: false,
    enablePoints: false,
    pointSize: 10,
    yScale: {
      type: 'linear',
        stacked: false,
      },
    // pointBorderWidth: 2,
    // pointBorderColor:{ from: 'serieColor' },
    // pointColor: { theme: 'background' },
    isInteractive: true,
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