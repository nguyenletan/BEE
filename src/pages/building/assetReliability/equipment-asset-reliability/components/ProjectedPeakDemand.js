/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { getProjectPeakDemand } from 'api/EquipmentAPI'
import { useAuth } from 'AuthenticateProvider'
import { getMonthName } from 'Utilities'
import { EuiRange } from '@elastic/eui'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const Wrapper = styled.div``
const ChartWrapper = styled.div`
  height: 350px;
`
const NumberOfDaysWrapper = styled.div`
  width: 400px;
`
const NumberOfDaysLabel = styled.div`
  width: 150px;
  font-size: 0.9rem;
`

const DEFAULT_NUMBER_OF_DAYS = 14

const ProjectedPeakDemand = ({ equipmentId }) => {
  const { user } = useAuth()
  const [chartData, setChartData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS)
  const { t, i18n } = useTranslation(['equipmentAssetReliability', 'common'])

  const convertRawDataToChartData = useCallback(
    (rawData) => {
      const processedData = rawData.map((d) => ({
        x: `${t(getMonthName(d.month), { ns: 'common' })} ${d.day}`,
        y: +d.average.toFixed(2),
      }))
      const dataSource = [{ id: 'ProjectPeakDemand', data: processedData }]
      setChartData(dataSource)
      setFilteredData(dataSource)
    },
    [t]
  )

  const getProjectPeakDemandInfo = useCallback(async () => {
    const idToken = await user.getIdToken()
    const data = await getProjectPeakDemand(equipmentId, DEFAULT_NUMBER_OF_DAYS, idToken)
    convertRawDataToChartData(data)
  }, [equipmentId, user, convertRawDataToChartData])

  useEffect(() => {
    getProjectPeakDemandInfo()
  }, [equipmentId, i18n.language])

  const Line = ({ series, innerHeight, margin }) => {
    return (
      <>
        {/*<text x={x - 40} y="-5" className="small">Current Age</text>*/}
        <text x={260} y="-5" className="small" strokeWidth={1} stroke="#87972f">
          {t('2 Potential Problems')}
        </text>
        <text x={460} y="-5" className="small" strokeWidth={1} stroke="#87972f">
          {t('1 Potential Problems')}
        </text>
        <text x={660} y="-5" className="small" strokeWidth={1} stroke="#87972f">
          {t('1 Potential Problems')}
        </text>
        {/*<line*/}
        {/*  x1={x} y1={0} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"*/}
        {/*  strokeWidth={1}*/}
        {/*/>*/}

        <line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1} />
        <line x1="500" y1="10" x2="500" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1} />
        <line x1="700" y1="10" x2="700" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1} />
      </>
    )
  }

  const commonProperties = {
    margin: { top: 30, right: 20, bottom: 25, left: 40 },
    data: filteredData,
    animate: true,
    colors: ['#87972f'],
    enableSlices: false,
    enableGridX: false,
    enableGridY: true,
    enablePoints: true,
    pointBorderWidth: 5,
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
      legendOffset: -40,
      legendPosition: 'middle',
    },

    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', Line],
  }

  const onChange = useCallback(
    (e) => {
      const newNumberOfDays = parseInt(e.target.value, 10)
      setNumberOfDays(newNumberOfDays)
      setFilteredData([
        {
          ...chartData[0],
          data: chartData[0].data.slice(0, newNumberOfDays + 1),
        },
      ])
    },
    [chartData]
  )

  return (
    <Wrapper>
      <div className="d-flex justify-content-between mb-5">
        <h5>{t('Projected Peak Demand (kW)')}</h5>
        <NumberOfDaysWrapper className="d-flex justify-content-between">
          <NumberOfDaysLabel htmlFor="number-of-next-days">{t('Number of days')}:</NumberOfDaysLabel>
          <EuiRange
            id="number-of-next-days"
            min={0}
            max={DEFAULT_NUMBER_OF_DAYS}
            step={1}
            showTicks
            value={numberOfDays}
            onChange={onChange}
            aria-label="Number of Next Days"
          />
        </NumberOfDaysWrapper>
      </div>
      <ChartWrapper>
        <ResponsiveLine {...commonProperties} />
      </ChartWrapper>
    </Wrapper>
  )
}

export default React.memo(ProjectedPeakDemand)
