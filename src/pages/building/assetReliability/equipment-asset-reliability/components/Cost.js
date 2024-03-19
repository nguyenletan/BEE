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

const Cost = () => {

  let costDataEN = [
    {
      id: 'Maintenance',
      //hard code or dummy data
      data: [
        { x: 2007, y: 50000 },
        { x: 2008, y: 120000 },
        { x: 2009, y: 250000 },
        { x: 2010, y: 300000 },
        { x: 2011, y: 320000 },
        { x: 2012, y: 520000 },
        { x: 2013, y: 370000 },
        { x: 2014, y: 570000 },
        { x: 2015, y: 600000 },
        { x: 2016, y: 620000 },
        { x: 2017, y: 670000 },
        { x: 2018, y: 700000 },
        { x: 2019, y: 720000 },
        { x: 2020, y: 750000 },
        { x: 2021, y: 770000 },

      ],
    },
    {
      id: 'Parts',
      //hard code or dummy data
      data: [
        { x: 2007, y: 70000 },
        { x: 2008, y: 100000 },
        { x: 2009, y: 125000 },
        { x: 2010, y: 130000 },
        { x: 2011, y: 172000 },
        { x: 2012, y: 252000 },
        { x: 2013, y: 237000 },
        { x: 2014, y: 307000 },
        { x: 2015, y: 360000 },
        { x: 2016, y: 362000 },
        { x: 2017, y: 407000 },
        { x: 2018, y: 370000 },
        { x: 2019, y: 472000 },
        { x: 2020, y: 475000 },
        { x: 2021, y: 527000 },

      ],
    },
    {
      id: 'Energy',
      //hard code or dummy data
      data: [
        { x: 2007, y: 150000 },
        { x: 2008, y: 220000 },
        { x: 2009, y: 250000 },
        { x: 2010, y: 350000 },
        { x: 2011, y: 420000 },
        { x: 2012, y: 550000 },
        { x: 2013, y: 670000 },
        { x: 2014, y: 770000 },
        { x: 2015, y: 800000 },
        { x: 2016, y: 820000 },
        { x: 2017, y: 870000 },
        { x: 2018, y: 770000 },
        { x: 2019, y: 820000 },
        { x: 2020, y: 850000 },
        { x: 2021, y: 970000 },

      ],
    },
  ]
  let costDataDE = [
    {
      id: 'Instandhaltung',
      //hard code or dummy data
      data: [
        { x: 2007, y: 50000 },
        { x: 2008, y: 120000 },
        { x: 2009, y: 250000 },
        { x: 2010, y: 300000 },
        { x: 2011, y: 320000 },
        { x: 2012, y: 520000 },
        { x: 2013, y: 370000 },
        { x: 2014, y: 570000 },
        { x: 2015, y: 600000 },
        { x: 2016, y: 620000 },
        { x: 2017, y: 670000 },
        { x: 2018, y: 700000 },
        { x: 2019, y: 720000 },
        { x: 2020, y: 750000 },
        { x: 2021, y: 770000 },

      ],
    },
    {
      id: 'Ersatzteile',
      //hard code or dummy data
      data: [
        { x: 2007, y: 70000 },
        { x: 2008, y: 100000 },
        { x: 2009, y: 125000 },
        { x: 2010, y: 130000 },
        { x: 2011, y: 172000 },
        { x: 2012, y: 252000 },
        { x: 2013, y: 237000 },
        { x: 2014, y: 307000 },
        { x: 2015, y: 360000 },
        { x: 2016, y: 362000 },
        { x: 2017, y: 407000 },
        { x: 2018, y: 370000 },
        { x: 2019, y: 472000 },
        { x: 2020, y: 475000 },
        { x: 2021, y: 527000 },

      ],
    },
    {
      id: 'Elektrische Energie',
      //hard code or dummy data
      data: [
        { x: 2007, y: 150000 },
        { x: 2008, y: 220000 },
        { x: 2009, y: 250000 },
        { x: 2010, y: 350000 },
        { x: 2011, y: 420000 },
        { x: 2012, y: 550000 },
        { x: 2013, y: 670000 },
        { x: 2014, y: 770000 },
        { x: 2015, y: 800000 },
        { x: 2016, y: 820000 },
        { x: 2017, y: 870000 },
        { x: 2018, y: 770000 },
        { x: 2019, y: 820000 },
        { x: 2020, y: 850000 },
        { x: 2021, y: 970000 },

      ],
    },
  ]

  const { t, i18n } = useTranslation('equipmentAssetReliability')

  const [costData, setCostData] = useState(costDataEN)

  useEffect(() => {
    if(i18n.language === 'en') {
      setCostData(costDataEN)
    } else {
      setCostData(costDataDE)
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
        translateX: 20,
        translateY: -50,
        itemsSpacing: 2,
        itemWidth: 140,
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
    data: costData,
    animate: true,
    colors: ['#3D511B','#87972f','#B9D787'],
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
      legendOffset: -65,
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
      <h5>{t('Cost ($)')}</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default Cost
