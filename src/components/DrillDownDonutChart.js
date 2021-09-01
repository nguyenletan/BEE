import React, { useState } from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'

const BreakDownBlock = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
  margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
  width: 100%;

`

const ResponsivePieWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height};
`

const BreakDownTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 900;
  margin-bottom: 0;
`

const BreakDownSubTitle = styled.p`
  color: var(--gray);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0;
`
const Ul = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  font-size: ${props => props.fontSize ? props.fontSize : '0.85rem'};
  margin-bottom: 0;
  margin-top: 30px;

  li {
    padding-top: 0.5em;
  }
`

const Label = styled.label`
  text-transform: capitalize;
  font-size: 1.1rem;
`

const Value = styled.label`
  font-size: 1.1rem;
`

const DrillDownDonutChart = (props) => {
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

  const [dataSource, setDataSource] = useState(data)
  const [isDrillDown, setIsDrillDown] = useState(false)
  const [selectedSubBreakdown, setSelectedSubBreakdown] = useState(null)

  const commonProperties = {
    margin: { top: 40, right: 20, bottom: 20, left: 20 },
    data: dataSource,
    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'startAngle',
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

  const SubCategoryName = ({ centerX, centerY }) => {

    if (selectedSubBreakdown === 'mechanical ventilation') {
      return <>
        <text
          x={centerX}
          y={centerY - 12}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '16px',
            stroke: dataSource[0].color ?? '#5F5283'
          }}
        >
          Mechanical
        </text>
        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '16px',
            stroke: dataSource[0].color ?? '#5F5283'
          }}
        >
          Ventilation
        </text>
      </>
    }
    return (
      selectedSubBreakdown && <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: valueFontSize ?? '18px',
          textTransform: 'capitalize',
          stroke: dataSource[0].color ?? '#5F5283'
        }}
      >
        {selectedSubBreakdown}
      </text>

    )
  }

  const handleClick = (e) => {
    console.log(e)
    console.log(data)
    if (e.data?.subBreakdown) {
      setSelectedSubBreakdown(e.id)
      setDataSource(e.data.subBreakdown)
      setIsDrillDown(true)
    }

  }

  const handleBackToOverallClick = () => {
    setSelectedSubBreakdown(null)
    setDataSource(data)
    setIsDrillDown(false)
  }

  const list = dataSource.map(x => <li className="d-flex justify-content-between" key={x.id}>
    <Label fontSize={informationFontSize}>{x.id}:</Label>
    <Value fontSize={informationFontSize}>{x.value}%</Value>
  </li>)

  return (
    <BreakDownBlock marginRight={marginRight}>
      <div className="d-flex justify-content-between">
        <div>
          <BreakDownTitle>{title}</BreakDownTitle>
          {subTitle ?? (<BreakDownSubTitle>{subTitle}</BreakDownSubTitle>)}
        </div>
        <div>
          {isDrillDown &&
          <button className="btn btn-sm btn-outline-primary" onClick={handleBackToOverallClick}>Back</button>}
        </div>
      </div>
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
              {id}: {value} %
            </div>
          )}
          arcLabel={function (e) {return e.value + '%'}}
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
          onClick={handleClick}
          layers={[
            'arcs',
            'arcLabels',
            'arcLinkLabels',
            'legends',
            SubCategoryName,
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

export default DrillDownDonutChart
