/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import _ from 'lodash'
import { useAuth } from 'AuthenticateProvider'
import { getEquipmentByIdAndGroupByYear } from 'api/EquipmentAPI'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const EnergyConsumption = (props) => {

  const { equipmentId } = props
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
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
    setMinValue(_.minBy(rawData, 'sum').sum / 1.01)
    setMaxValue(_.maxBy(rawData, 'sum').sum * 1.01)
    const dataSource = [
      {
        id: 'energy consumption',
        data: rawData.map(d => {
          return {
            x: d.year,
            y: +d.sum.toFixed(2),
          }
        }),
      }]
    setData(dataSource)
  }

  const getEquipmentByIdAndGroupByYearInfo = async () => {
    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getEquipmentByIdAndGroupByYear(equipmentId, idToken)
    convertRawDataToChartData(tmp)
  }

  useEffect(() => {
    getEquipmentByIdAndGroupByYearInfo()
    //TS
  }, [equipmentId])

  const commonProperties = {
    margin: { top: 0, right: 0, bottom: 0, left: 40 },
    data,
    animate: true,
    colors: ['#87972f'],
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints: true,
    lineWidth: 2,
    pointBorderWidth: 5,
    pointBorderColor: { from: 'serieColor' },
    pointColor: { theme: 'background' },
    isInteractive: true,
    yScale: {
      type: 'linear',
      stacked: false,
      min: minValue,
      max: maxValue,
    },
    curve: 'linear',
    axisLeft: {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'mWh',
      legendOffset: -55,
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