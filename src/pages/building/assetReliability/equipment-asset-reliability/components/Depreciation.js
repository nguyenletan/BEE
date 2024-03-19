/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const Depreciation = () => {
  const currentAge = 16
  let depreciationData = [
    {
      id: 'Book Value',
      //hard code or dummy data
      data: [
        { x: 0, y: 500000 },
        { x: 1, y: 475000 },
        { x: 2, y: 450000 },
        { x: 3, y: 425000 },
        { x: 4, y: 400000 },
        { x: 5, y: 375000 },
        { x: 6, y: 350000 },
        { x: 7, y: 325000 },
        { x: 8, y: 300000 },
        { x: 9, y: 275000 },
        { x: 10, y: 250000 },
        { x: 11, y: 225000 },
        { x: 12, y: 200000 },
        { x: 13, y: 175000 },
        { x: 14, y: 150000 },
        { x: 15, y: 125000 },
        { x: 16, y: 100000 },
        { x: 17, y: 75000 },
        { x: 18, y: 50000 },
        { x: 19, y: 25000 },
        { x: 20, y: 0 },

      ],
    },
    {
      id: 'Condition Value',
      //hard code or dummy data
      data: [
        { x: 0, y: 500000 },
        { x: 1, y: 490000 },
        { x: 2, y: 470000 },
        { x: 3, y: 450000 },
        { x: 4, y: 417000 },
        { x: 5, y: 405000 },
        { x: 6, y: 353000 },
        { x: 7, y: 350000 },
        { x: 8, y: 322000 },
        { x: 9, y: 250000 },
        { x: 10, y: 232000 },
        { x: 11, y: 192000 },
        { x: 12, y: 175000 },
        { x: 13, y: 150020 },
        { x: 14, y: 132000 },
        { x: 15, y: 100200 },
        { x: 16, y: 75200 },
        { x: 17, y: 41000 },
        { x: 18, y: 0 }
      ],
    },
  ]

  const { t, i18n } = useTranslation('equipmentAssetReliability')

  const [data, setData] = useState(depreciationData)

  useEffect(() => {
    const tmp = deepClone(depreciationData)
    for(let item of tmp) {
      item.id = t(item.id)
    }

    setData(tmp)

  }, [i18n.language])

  const style = {
    dashed: {
      strokeDasharray: '12, 6',
      strokeWidth: 3
    },
    default: {
      strokeWidth: 3
    }
  }


  const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => {
        if (id === 'Condition Value') {
          const data1 = data.filter(d => d.data.x <= 16)
          const data2 = data.filter(d => d.data.x >= 16)

          return (
            <>
              <path
                key={id}
                d={lineGenerator(
                  data1.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y)
                  }))
                )}
                fill='none'
                stroke={color}
                style={style.default}
              />
              <path
                key={id}
                d={lineGenerator(
                  data2.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y)
                  }))
                )}
                fill='none'
                stroke={color}
                style={style.dashed}
              />
            </>
          )
        } else {
          return (
            <path
              key={id}
              d={lineGenerator(
                data.map(d => ({
                  x: xScale(d.data.x),
                  y: yScale(d.data.y)
                }))
              )}
              fill='none'
              stroke={color}
              style={style.default}
            />
          )
        }
      }
    )
  }

  const Line = ({ series, innerHeight, margin }) => {
    let data0
    for (let i = 0; i < series[0]?.data.length; i++) {
      //console.log(series[0]?.data[i].data.x)
      if (series[0]?.data[i].data.x >= currentAge) {
        data0 = series[0]?.data[i]
        break
      }
    }

    const x = data0?.position?.x

    return (
      <>
        <text x={x - 40} y="-5" className="small">{t('Current Age')}</text>
        <line
          x1={x} y1={0} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"
          strokeWidth={1}
        />
        {/*<line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>*/}
      </>
    )
  }

  const commonProperties = {
    margin: { top: 30, right: 10, bottom: 35, left: 55 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: 40,
        translateY: -55,
        itemsSpacing: 2,
        itemWidth: 125,
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
    data: data,
    animate: true,
    colors: ['#3D511B', '#87972f'],
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
      legend: t('Asset Value $'),
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
    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair',  'points', 'slices', 'mesh', 'legends', Line, DashedLine],

  }

  return (
    <Wrapper>
      <h5>{t('Depreciation')}</h5>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default Depreciation
