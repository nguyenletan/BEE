import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { useAuth } from 'AuthenticateProvider'
import { getEquipmentByIdAndGroupByYear } from 'api/EquipmentAPI'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Wrapper = styled.div``

const ChartWrapper = styled.div`
  height: 350px;
`

const Y_SCALE_CONFIG = { type: 'linear', stacked: false }
const CHART_COLOR = ['#87972f']
const CHART_LAYERS = ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']

const EnergyConsumption = ({ equipmentId }) => {
  const { t, i18n } = useTranslation('equipmentAssetReliability')
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)

  const convertRawDataToChartData = useCallback(
    (rawData) => {
      const minSum = Math.min(...rawData.map((d) => d.sum))
      const maxSum = Math.max(...rawData.map((d) => d.sum))
      setMinValue(minSum / 1.01)
      setMaxValue(maxSum * 1.01)
      const dataSource = [
        {
          id: t('Energy Consumption'),
          data: rawData.map(({ year, sum }) => ({ x: year, y: +sum.toFixed(2) })),
        },
      ]
      setData(dataSource)
    },
    [t]
  )

  const fetchData = useCallback(async () => {
    const idToken = await user.getIdToken()
    const rawData = await getEquipmentByIdAndGroupByYear(equipmentId, idToken)
    convertRawDataToChartData(rawData)
  }, [equipmentId, user, convertRawDataToChartData])

  const updateChartDataLanguage = useCallback(() => {
    setData((prevData) => prevData.map((item) => ({ ...item, id: t(item.id) })))
  }, [t])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    updateChartDataLanguage()
  }, [i18n.language, updateChartDataLanguage])

  const chartProperties = {
    margin: { top: 10, right: 0, bottom: 25, left: 40 },
    data,
    animate: true,
    colors: CHART_COLOR,
    enableSlices: 'x',
    enableGridX: false,
    enableGridY: true,
    enablePoints: true,
    lineWidth: 2,
    pointBorderWidth: 5,
    pointBorderColor: { from: 'serieColor' },
    pointColor: { theme: 'background' },
    isInteractive: true,
    yScale: { ...Y_SCALE_CONFIG, min: minValue, max: maxValue },
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
      legend: t('Year'),
      legendOffset: 36,
      legendPosition: 'middle',
    },
    layers: CHART_LAYERS,
  }

  return (
    <Wrapper>
      <h5>{t('Energy Consumption (mWh)')}</h5>
      <ChartWrapper>{data.length > 0 && <ResponsiveLine {...chartProperties} />}</ChartWrapper>
    </Wrapper>
  )
}

EnergyConsumption.propTypes = {
  equipmentId: PropTypes.string.isRequired,
}

export default EnergyConsumption
