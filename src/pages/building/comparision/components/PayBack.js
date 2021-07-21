import React from 'react'
import styled from 'styled-components'
import { ScatterPlot } from '@nivo/scatterplot'
import { coolingSVG, heatingSVG, lightingSVG, openingsSVG, wallSVG } from '../../../../SvgConstants'

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
  const payBackData = data.map(item => {
    return {
      id: item.measures,
      data: [{
        x: item.internalRateOfReturn,
        y: item.paybackPeriod,
        subSystem: item.subSystem
      }]
    }
  })

  const commonProps = {
    width: 790,
    height: 470,
    margin: { top: 24, right: 30, bottom: 40, left: 50 },
    nodeSize: 10,
    blendMode: 'multiply',
    xFormat: d => `${d}%`,
    yFormat: d => `${d} Yr`,
    axisBottom: {
      format: d => `${d} %`,
      legend: 'Internal Rate of Return (%)',
      legendOffset: 40
    },
    axisLeft: {
      format: d => `${d} Yr`,
      legend: 'Simple Payback (Yr)',
      legendOffset: -50
    },
    data: payBackData
  }

  const CustomNode = ({
    node,
    x,
    y
  }) => {
    switch (node.data.subSystem) {
      case 'Cooling':
        return (
          <g transform={`translate(${x},${y})`}>
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
          <g transform={`translate(${x},${y})`}>
            {lightingSVG()}
          </g>
        )
      case 'Openings':
        return (
          <g transform={`translate(${x},${y})`}>
            {openingsSVG()}
          </g>
        )
      case 'Walls':
        return (
          <g transform={`translate(${x},${y})`}>
            {wallSVG()}
          </g>
        )
      default:
        return null
    }
  }

  return (
    <PayBackWrapper>
      <PayBackTitle>Payback</PayBackTitle>
      <ScatterPlot
        {...commonProps}
        colors={{ scheme: 'set2' }}
        nodeSize={32}
        renderNode={CustomNode}
      />
    </PayBackWrapper>
  )
}

export default PayBack
