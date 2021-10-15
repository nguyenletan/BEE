import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'

const BreakDownBlock = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 0px;
  margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
  width: 100%;

`

const ResponsivePieWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height};
`

const BreakDownTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0;
`

const BreakDownSubTitle = styled.p`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 0;
`
const Ul = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  font-size: 1rem;
  margin-bottom: 0;
  margin-top: 30px;
`

const Label = styled.label`
  text-transform: capitalize;
`

const TotalBreakDownPieChart = (props) => {
  const {
    enableRadialLabels,
    valueFontSize,
    title,
    data,
    subTitle,
    startAngle,
    innerRadius,
    informationFontSize,
    isCenteredPercentage,
    marginRight,
    hasDescription,
    noCenterText,
  } = props

  const commonProperties = {
    margin: { top: 40, right: 20, bottom: 20, left: 20 },
    data: data,
    animate: true,
    activeOuterRadiusOffset: 4,
  }

  const chartHeight = hasDescription ? '250px' : '150px'

  const CenteredPercentage = ({ dataWithArc, centerX, centerY }) => {
    const total = dataWithArc[0].value + dataWithArc[1].value
    const percentage = (dataWithArc[0].value / total) * 100

    const percentageYPosition = !noCenterText ? -15 : +0

    return (
      <>
        <text
          x={centerX}
          y={centerY + percentageYPosition}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '24px',
            fontWeight: '700',
          }}
        >
          {percentage.toFixed(1)} %
        </text>
        {!noCenterText && <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '24px',
            fontWeight: '700',
          }}
        >
          Used
        </text>}
      </>
    )
  }

  const list = data.map(x => <li className="d-flex justify-content-between" key={x.id}>
    <Label fontSize={informationFontSize}>{x.id}:</Label>
    <span fontSize={informationFontSize}>{x.value}</span>
  </li>)

  return (
    <BreakDownBlock marginRight={marginRight}>
      <BreakDownTitle>{title}</BreakDownTitle>
      {subTitle ?? (<BreakDownSubTitle>{subTitle}</BreakDownSubTitle>)}
      <ResponsivePieWrapper height={chartHeight}>
        <ResponsivePie
          {...commonProperties}
          innerRadius={innerRadius ?? 0.55}
          fit
          startAngle={startAngle ?? -120}
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
              {id}: {value}
            </div>
          )}
          arcLabel={function (e) {return e.value}}
          radialLabelsLinkColor={{
            from: 'color',
          }}
          radialLabelsLinkHorizontalLength={10}
          radialLabelsTextXOffset={3}
          radialLabelsLinkStrokeWidth={2}
          arcLinkLabelsThickness={3}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 3]] }}
          radialLabelsTextColor={{
            from: 'color',
            modifiers: [['brighter', 1.2]],
          }}
          enableSliceLabels={true}
          enableRadialLabels={enableRadialLabels ?? true}
          layers={[
            'arcs',
            //'arcLabels',
            'arcLinkLabels',
            'legends',
            isCenteredPercentage === true ? CenteredPercentage : '']}
        />
      </ResponsivePieWrapper>
      {
        hasDescription && <Ul>
          {list}
        </Ul>
      }

    </BreakDownBlock>
  )
}

export default TotalBreakDownPieChart
