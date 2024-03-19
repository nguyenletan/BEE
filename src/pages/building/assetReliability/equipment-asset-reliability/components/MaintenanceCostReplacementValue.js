/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const MaintenanceCostReplacementValue = () => {

  let dataEN = [
    {
      id: 'Maintenance Cost vs Replacement Value',
      //hard code or dummy data
      data: [
        { x: 2007, y: 5 },
        { x: 2008, y: 12 },
        { x: 2009, y: 25 },
        { x: 2010, y: 30 },
        { x: 2011, y: 32 },
        { x: 2012, y: 52 },
        { x: 2013, y: 37 },
        { x: 2014, y: 57 },
        { x: 2015, y: 60 },
        { x: 2016, y: 62 },
        { x: 2017, y: 67 },
        { x: 2018, y: 70 },
        { x: 2019, y: 72 },
        { x: 2020, y: 75 },
        { x: 2021, y: 77 },

      ],
    },
  ]
  let dataDE = [
    {
      id: 'Wartungskosten vs. Wiederbeschaffungswert',
      //hard code or dummy data
      data: [
        { x: 2007, y: 5 },
        { x: 2008, y: 12 },
        { x: 2009, y: 25 },
        { x: 2010, y: 30 },
        { x: 2011, y: 32 },
        { x: 2012, y: 52 },
        { x: 2013, y: 37 },
        { x: 2014, y: 57 },
        { x: 2015, y: 60 },
        { x: 2016, y: 62 },
        { x: 2017, y: 67 },
        { x: 2018, y: 70 },
        { x: 2019, y: 72 },
        { x: 2020, y: 75 },
        { x: 2021, y: 77 },

      ],
    },
  ]

  const { t, i18n } = useTranslation('equipmentAssetReliability')

  const [data, setData] = useState(dataEN)

  useEffect(() => {
    if(i18n.language === 'en') {
      setData(dataEN)
    } else {
      setData(dataDE)
    }
  }, [i18n.language])

  const commonProperties = {
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
      max: 100
    },
    curve: 'linear',
    axisLeft: {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '%',
      legendOffset: -45,
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
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends'],

  }

  return (
    <Wrapper>
      <h5>{t('Maintenance Cost vs Replacement Value (%)')}</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default MaintenanceCostReplacementValue
