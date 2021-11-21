/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import { line } from 'd3-shape'
import styled from 'styled-components'
// import { monotoneX } from 'd3-shape/src/curve/monotone'
import { ResponsiveBar } from '@nivo/bar'
import {
  coolingSVG,
  envelopeSVG,
  heatingSVG,
  lightingSVG,
  mechVentSVG,
  plugLoadSVG,
  renewableSVG
} from 'SvgConstants'
import { useTranslation } from 'react-i18next'

const lineColor = '#636c2e'

const MaintenanceBudgetBySubSystemWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px 40px 30px 30px;
`

const MaintenanceBudgetBySubSystemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const Legend = styled.ul`
  width: 100%;
  margin-bottom: 0;
  li {
    list-style-type: none;
    font-size: 12px;
    line-height: 12px;
    vertical-align: center;
    margin-right: 2rem;
  }
`

const LegendBox = styled.span`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'var(--bs-primary)'};
  border-radius: ${props => props.borderRadius ? props.borderRadius : '50%;'};
  width: ${props => props.weight ? props.weight : '12px'};
  height: ${props => props.height ? props.height : '12px'};
  display: inline-block;
  line-height: 12px;
  margin-right: 6px;
  vertical-align: ${props => props.verticleAlign ? props.verticleAlign : 'bottom'};
`

const ResponsiveBarWrapper = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 100px;
`

const MaintenanceBudgetBySubSystem = ({ data }) => {
  const keys = ['used', 'accrued']
  const keysEN = ['used', 'accrued']
  const keysDE = ['verwendet', 'erwachsen']


  const [chartKeys, setChartKey] = useState(keys)
  const { t, i18n } = useTranslation('assetReliability')


  useEffect(() => {

    if(i18n.language === 'en') {
      setChartKey(keysEN)
    } else {
      setChartKey(keysDE)
    }

  }, [i18n.language])


  const commonProps = {

    margin: { top: 0, right: 0, bottom: 0, left: 20 },
    data: data,
    indexBy: 'id',
    keys: chartKeys,
    padding: 0.75,
    enableLabel: false,
    groupMode: 'stacked'
  }

  const Line = ({ bars, xScale, yScale }) => {
    const lineGenerator = line()
      .x(bar => {
        if (bar.data.id !== t('used')) { return null }

        return xScale(bar.data.index) + bar.width / 2
      })
      .y(bar => {
        if (bar.data.id !== t('used')) { return null }

        return yScale(bar.data.data[t('allocated')])
      })//.curve(monotoneX)

    const pathString = lineGenerator(bars).replaceAll('L0,0', '')

    return (
      <>
        <path
          d={pathString}
          fill='none'
          stroke={lineColor}
          strokeWidth={2.5}
          strokeDasharray='18'
          style={{ pointerEvents: 'none' }}
        />

        {
          bars.map(bar => {
            if (bar.data.id !== t('accrued')) { return null }
            return (
              <>
                {/* <text x={xScale(bar.data.index) + bar.width / 2} y={yScale(bar.data.data.allocated)}></text> */}
                <circle
                  key={bar.key}
                  cx={xScale(bar.data.index) + bar.width / 2}
                  cy={yScale(bar.data.data[t('allocated')])}
                  r={4}
                  fill='white'
                  stroke={lineColor}
                  style={{ pointerEvents: 'none' }}
                />
              </>
            )
          })
}
      </>
    )
  }

  const CustomTick = tick => {
    const x = 18
    const y = 50
    const item = data.find(i => i.id === tick.value)

    const icon = (subSystem) => {
      let imgX = 0
      let imgY = 0

      switch (subSystem) {
        case t('cooling'):
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {coolingSVG()}
            </g>
          )

        case t('heating'):
          imgX = 10
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {heatingSVG()}
            </g>
          )

        case t('mechanical ventilation'):
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {mechVentSVG()}
            </g>
          )

        case t('lighting'):
          imgX = 6
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {lightingSVG()}
            </g>
          )
        case t('facility envelope'):
          imgX = -8
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {envelopeSVG()}
            </g>
          )

        case t('renewables'):
          imgX = -5
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {renewableSVG()}
            </g>
          )

        case t('others'):
          imgX = 3
          imgY = 3
          return (
            <g transform={`translate(${imgX}, ${imgY})`}>
              {plugLoadSVG()}
            </g>
          )

        default:
          return ''
      }
    }

    return (
      <g transform={`translate(${tick.x - 18},${tick.y + 6})`}>

        {icon(item.subSystem)}

        <text
          transform={`translate(${x},${y})`}
          textAnchor='middle'
          dominantBaseline='middle'
          style={{
            fill: '#333',
            fontSize: 10
          }}
        >
          {item.subSystem}
        </text>
      </g>
    )
  }

  return (
    <MaintenanceBudgetBySubSystemWrapper>
      <MaintenanceBudgetBySubSystemTitle>{t('Maintenance Budget By Sub-System')}</MaintenanceBudgetBySubSystemTitle>
      <ResponsiveBarWrapper>
        <ResponsiveBar
          {...commonProps}
          colors={['#87972f', '#d3dca1', '#636c2e']}
          layers={[
            'grid', 'axes', 'bars', 'markers', 'legends', Line
          ]}
          borderRadius={1}
          axisBottom={{
            renderTick: CustomTick
          }}
        />
      </ResponsiveBarWrapper>
      <Legend className='d-flex justify-content-center'>
        <li><LegendBox backgroundColor='#87972f' />{t('Used')}</li>
        <li><LegendBox backgroundColor='#d3dca1' />{t('Accrued')}</li>
        <li><LegendBox backgroundColor='#636c2e' height='3px' weight='20px' borderRadius='20%' verticleAlign='middle' />{t('Allocated')}
        </li>
      </Legend>

    </MaintenanceBudgetBySubSystemWrapper>
  )
}

export default MaintenanceBudgetBySubSystem
