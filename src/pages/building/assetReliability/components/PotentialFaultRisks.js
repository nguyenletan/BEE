import React from 'react'
import styled from 'styled-components'
import { ScatterPlot } from '@nivo/scatterplot'
import { coolingSVG, heatingSVG, lightingSVG, mechVentSVG, openingsSVG, wallSVG } from '../../../../SvgConstants'
import { area, curveMonotoneX } from 'd3-shape'

const PotentialFaultRiskWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 20px 60px 30px 60px;
  margin-bottom: 40px;
  margin-right: 30px;
`

const PotentialFaultRiskTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const PotentialFaultRisk = ({ data }) => {
  // data = [
  //     {
  //       measures: 'LED Replacement',
  //       subSystem: 'Lighting',
  //       investmentCost: 36000,
  //       energySavings: 74.3,
  //       energyCostSavings: 19300,
  //       co2EmissionsAvoided: 65,
  //       paybackPeriod: 2.7,
  //       internalRateOfReturn: 32
  //     },
  //     {
  //       measures: 'Chiller Unit Replacement',
  //       subSystem: 'Cooling',
  //       investmentCost: 234000,
  //       energySavings: 177.09,
  //       energyCostSavings: 46000,
  //       co2EmissionsAvoided: 154.92,
  //       paybackPeriod: 5.1,
  //       internalRateOfReturn: 21
  //     },
  //     {
  //       measures: 'Double Glaze Low-E Windows',
  //       subSystem: 'Openings',
  //       investmentCost: 103000,
  //       energySavings: 106.45,
  //       energyCostSavings: 27650,
  //       co2EmissionsAvoided: 93.12,
  //       paybackPeriod: 3.7,
  //       internalRateOfReturn: 21
  //     },
  //     {
  //       measures: 'Install Variable Speed Drive Pumps',
  //       subSystem: 'Cooling',
  //       investmentCost: 87000,
  //       energySavings: 70.37,
  //       energyCostSavings: 18277.31,
  //       co2EmissionsAvoided: 61.55,
  //       paybackPeriod: 4.76,
  //       internalRateOfReturn: 18
  //     },
  //     {
  //       measures: 'Install Air Distribution Control System',
  //       subSystem: 'Cooling',
  //       investmentCost: 132000,
  //       energySavings: 56.65,
  //       energyCostSavings: 14715,
  //       co2EmissionsAvoided: 49.56,
  //       paybackPeriod: 8.97,
  //       internalRateOfReturn: 14
  //     },
  //     {
  //       measures: 'Curtain Wall Insulation Blocks',
  //       subSystem: 'Walls',
  //       investmentCost: 39679,
  //       energySavings: 15.43,
  //       energyCostSavings: 4008,
  //       co2EmissionsAvoided: 13.5,
  //       paybackPeriod: 9.9,
  //       internalRateOfReturn: 3
  //     },
  //     {
  //       measures: 'Solar Film Installation',
  //       subSystem: 'Openings',
  //       investmentCost: 43200,
  //       energySavings: 23.56,
  //       energyCostSavings: 6200,
  //       co2EmissionsAvoided: 20.9,
  //       paybackPeriod: 6.96,
  //       internalRateOfReturn: 7
  //     },
  //     {
  //       measures: 'Electric Air Source Heat Pump (Boiler Replacement)',
  //       subSystem: 'Heating',
  //       investmentCost: 250000,
  //       energySavings: 255.6,
  //       energyCostSavings: 67260,
  //       co2EmissionsAvoided: 226.73,
  //       paybackPeriod: 3.72,
  //       internalRateOfReturn: 24
  //     },
  //     {
  //       measures: 'Install Heating Central Time Control',
  //       subSystem: 'Heating',
  //       investmentCost: 98000,
  //       energySavings: 128.42,
  //       energyCostSavings: 33793,
  //       co2EmissionsAvoided: 113.91,
  //       paybackPeriod: 2.9,
  //       internalRateOfReturn: 30
  //     }
  //   ]

  const payBackData = data.map(item => {
    return {
      id: item.asset,
      data: [{
        x: item.potentialDownTime,
        y: item.sparePartsLeadTime,
        subSystem: item.subSystem
      }]
    }
  })

  const width = 800
  const height = 350
  const marginBottom = 40
  const marginTop = 0
  const marginLeft = 0
  const marginRight = 0
  const areaHeight = ((height - (marginTop + marginBottom)) / 2)
  const areaWidth = ((width - (marginLeft + marginRight)) / 2) + 16

  const commonProps = {
    width: width,
    height: height,
    margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
    nodeSize: 10,
    blendMode: 'multiply',
    xFormat: d => `${d}%`,
    yFormat: d => `${d} Yr`,
    axisBottom: {
      format: d => `${d}`,
      legend: 'Potential Downtime (Weeks)',
      legendOffset: 40
    },
    axisLeft: {
      format: d => `${d}`,
      legend: 'Spare Parts Lead Time (Weeks)',
      legendOffset: -35
    },
    data: payBackData

  }

  const areaLayer = ({ nodes, xScale, yScale }) => {
    return (
      <g transform='translate(0,0)' className='Quadrant__Background' opacity={1}>
        <g>
          <rect x='0' y='0' width={areaWidth} height={areaHeight} fill='#f7e2d8' />
        </g>
        <g>
          <rect x={areaWidth} y='0' width={areaWidth} height={areaHeight} fill='#f5d7d7' />
        </g>
        <g>
          <rect x='0' y={areaHeight} width={areaWidth} height={areaHeight} fill='#e4e7d3' />
        </g>
        <g>
          <rect x={areaWidth} y={areaHeight} width={areaWidth} height={areaHeight} fill='#f7e2d5' />
        </g>

      </g>
    )
  }

  const customNode = ({
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
          <g transform={`translate(${x},${y - 36})`}>
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
      case 'Mechanical Ventilation':
        return (
          <g transform={`translate(${x},${y})`}>
            {mechVentSVG()}
          </g>
        )
      default:
        return null
    }
  }

  return (
    <PotentialFaultRiskWrapper>
      <PotentialFaultRiskTitle>Potential Fault Risks</PotentialFaultRiskTitle>
      <ScatterPlot
        {...commonProps}
        colors={{ scheme: 'set2' }}
        nodeSize={32}
        renderNode={customNode}
        layers={[
          'axes',
          areaLayer,
          'nodes',
          'markers',
          'mesh',
          'legends',
          'annotations'
        ]}
      />
    </PotentialFaultRiskWrapper>
  )
}

export default PotentialFaultRisk
