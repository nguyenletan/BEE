/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ScatterPlot } from '@nivo/scatterplot'
import { coolingSVG, heatingSVG, lightingSVG, openingsSVG, wallSVG } from 'SvgConstants'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'

const PayBackWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 20px;
`

const PayBackTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
`

const PayBack = ({ data }) => {
  const { t, i18n } = useTranslation('improvement')

  const payBackData = data.map(item => {
    return {
      id: t(item.measures),
      data: [{
        x: item.internalRateOfReturn,
        y: item.paybackPeriod,
        subSystem: item.subSystem
      }]
    }
  })

  const [dataSource, setDataSource] = useState(payBackData)

  useEffect(() => {
    const tmp = deepClone(dataSource)

    for (let item of tmp) {
      item.id = t(item.id)
    }
    setDataSource(tmp)

  }, [i18n.language, data])


  const commonProps = {
    width: 790,
    height: 470,
    margin: { top: 24, right: 30, bottom: 40, left: 50 },
    nodeSize: 20,
    blendMode: 'multiply',
    xFormat: d => `${d}%`,
    yFormat: d => `${d} Yr`,
    axisBottom: {
      format: d => `${d} %`,
      legend: t('Internal Rate of Return (%)'),
      legendOffset: 40
    },
    axisLeft: {
      format: d => `${d} Yr`,
      legend: t('Simple Payback (Yr)'),
      legendOffset: -50
    },
    data: dataSource
  }

  const CustomNode = ({
    node,
    x,
    y
  }) => {
    console.log(node)
    console.log(x)
    switch (node.data.subSystem) {
      case 'Cooling':
        return (
          <g transform={`translate(${node.x},${node.y})`}>
            {coolingSVG()}
          </g>
        )
      case 'Heating':
        return (
          <g transform={`translate(${x},${y})`}>
            {heatingSVG()}
          </g>
        )
      case 'Lighting':
        return (
          <g transform={`translate(${node.x},${node.y})`}>
            {lightingSVG()}
          </g>
        )
      case 'Openings':
        return (
          <g transform={`translate(${node.x},${node.y})`}>
            {openingsSVG()}
          </g>
        )
      case 'Walls':
        return (
          <g transform={`translate(${node.x},${node.y})`}>
            {wallSVG()}
          </g>
        )
      default:
        return null
    }
  }

  return (
    <PayBackWrapper>
      <PayBackTitle>{t('Payback')}</PayBackTitle>
      <ScatterPlot
        {...commonProps}
        colors={{ scheme: 'set2' }}
        nodeSize={32}
        nodeComponent={CustomNode}
      />
    </PayBackWrapper>
  )
}

export default PayBack
