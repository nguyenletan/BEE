import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 62px;
  height: 62px;
`

const PercentagePieChart = ({ data }) => {
  const commonProperties = {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    data: data,
    animate: true,
    activeOuterRadiusOffset: 4,
  }

  const CenteredPercentage = ({ dataWithArc, centerX, centerY }) => {
    const total = dataWithArc[0].value + dataWithArc[1].value
    const percentage = (dataWithArc[0].value / total) * 100

    const percentageYPosition = 0

    return (
      <text
        x={centerX}
        y={centerY + percentageYPosition}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '14px',
          fontWeight: '400',
        }}
      >
        {percentage.toFixed(1)} %
      </text>
    )
  }

  return (
    <Wrapper>
      <ResponsivePie
        {...commonProperties}
        innerRadius={0.88}

        startAngle={0}
        colors={{ datum: 'data.color' }}
        tooltip={({ datum: { id, value, color } }) => (
          <div
            style={{
              padding: 8,
              color: '#f9f3f2',
              fontSize: '15px',
              background: '#37363785',
            }}
          >
            {id}: {value} %
          </div>
        )}

        enableSliceLabels={true}
        enableRadialLabels={true}
        layers={[
          'arcs',
          'legends',
          CenteredPercentage]}
      />
    </Wrapper>
  )
}

export default PercentagePieChart