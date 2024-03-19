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

const Reliability = () => {

  let reliabilityDataEN = [
    {
      id: 'Mean Time to Repair',
      //hard code or dummy data
      data: [
        { x: 2007, y: 50000 },
        { x: 2008, y: 52000 },
        { x: 2009, y: 55000 },
        { x: 2010, y: 58000 },
        { x: 2011, y: 62000 },
        { x: 2012, y: 63000 },
        { x: 2013, y: 67000 },
        { x: 2014, y: 67400 },
        { x: 2015, y: 70000 },
        { x: 2016, y: 72000 },
        { x: 2017, y: 73700 },
        { x: 2018, y: 77000 },
        { x: 2019, y: 81720 },
        { x: 2020, y: 97500 },
        { x: 2021, y: 107000 },

      ],
    },
    {
      id: 'Mean Time Between Failure',
      //hard code or dummy data
      data: [
        { x: 2007, y: 700000 },
        { x: 2008, y: 650000 },
        { x: 2009, y: 625000 },
        { x: 2010, y: 630000 },
        { x: 2011, y: 572000 },
        { x: 2012, y: 552000 },
        { x: 2013, y: 537000 },
        { x: 2014, y: 507000 },
        { x: 2015, y: 460000 },
        { x: 2016, y: 362000 },
        { x: 2017, y: 340700 },
        { x: 2018, y: 237000 },
        { x: 2019, y: 247200 },
        { x: 2020, y: 175000 },
        { x: 2021, y: 152700 },
      ],
    },
  ]
  let reliabilityDataDE = [
    {
      id: 'Mittlere Reparaturzeit',
      //hard code or dummy data
      data: [
        { x: 2007, y: 50000 },
        { x: 2008, y: 52000 },
        { x: 2009, y: 55000 },
        { x: 2010, y: 58000 },
        { x: 2011, y: 62000 },
        { x: 2012, y: 63000 },
        { x: 2013, y: 67000 },
        { x: 2014, y: 67400 },
        { x: 2015, y: 70000 },
        { x: 2016, y: 72000 },
        { x: 2017, y: 73700 },
        { x: 2018, y: 77000 },
        { x: 2019, y: 81720 },
        { x: 2020, y: 97500 },
        { x: 2021, y: 107000 },

      ],
    },
    {
      id: 'Mittlere Zeit zwischen Ausfällen',
      //hard code or dummy data
      data: [
        { x: 2007, y: 700000 },
        { x: 2008, y: 650000 },
        { x: 2009, y: 625000 },
        { x: 2010, y: 630000 },
        { x: 2011, y: 572000 },
        { x: 2012, y: 552000 },
        { x: 2013, y: 537000 },
        { x: 2014, y: 507000 },
        { x: 2015, y: 460000 },
        { x: 2016, y: 362000 },
        { x: 2017, y: 340700 },
        { x: 2018, y: 237000 },
        { x: 2019, y: 247200 },
        { x: 2020, y: 175000 },
        { x: 2021, y: 152700 },
      ],
    },
  ]

  const { t, i18n } = useTranslation('equipmentAssetReliability')

  const [reliabilityData, setReliabilityData] = useState(reliabilityDataEN)

  useEffect(() => {
    if(i18n.language === 'en') {
      setReliabilityData(reliabilityDataEN)
    } else {
      setReliabilityData(reliabilityDataDE)
    }
  }, [i18n.language])

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: -0,
        translateY: -35,
        itemsSpacing: 2,
        itemWidth: 195,
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
    data: reliabilityData,
    animate: true,
    colors: ['#87972f', '#3D511B'],
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
      legend: t('$'),
      legendOffset: -60,
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
      <h5>{t('Reliability (Hours)')}</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default Reliability
