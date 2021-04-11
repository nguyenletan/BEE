import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'

const BreakDownBlock = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 20px 0;
  margin-right: ${props => props.marginRight ? props.marginRight : '30px'};
  width: 100%;
`

const ResponsivePieWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height};
`

const BreakDownTitle = styled.h4`
  font-size: .8rem;
  margin-bottom: 0;
  text-align: center;
  padding: 0 20px;
  min-height: 1.8rem;
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
  font-size: ${props => props.fontSize ? props.fontSize : '0.85rem'};
  margin-bottom: 0;
`

const Label = styled.label`
  text-transform: capitalize;
`

const SmallBreakDown = (props) => {
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
    noCenterText
  } = props

  const commonProperties = {

    margin: { top: 20, right: 0, bottom: 0, left: 0 },
    data: data,
    animate: true,
  }

  const chartHeight = hasDescription ? "250px" : "125px"

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
        </text>
        }
      </>
    )
  }

  const list = data.map(x => <li className="d-flex justify-content-between" key={x.id}>
    <Label fontSize={informationFontSize}>{x.id}:</Label>
    <span fontSize={informationFontSize}>{x.value}%</span>
  </li>)

  return <BreakDownBlock marginRight={marginRight}>
    <BreakDownTitle>{title}</BreakDownTitle>
    {subTitle ?? (<BreakDownSubTitle>{subTitle}</BreakDownSubTitle>)}
    <ResponsivePieWrapper height={chartHeight}>
      <ResponsivePie {...commonProperties}
                     innerRadius={innerRadius ?? 0.82}
                     fit={true}
                     startAngle={startAngle ?? -120}
                     colors={{ datum: 'data.color' }}
                     tooltipFormat={value => `${value + '%'}`}
        //radialLabel={LabelComponent}
                     radialLabelsLinkColor={{
                       from: 'color',
                     }}
                     radialLabelsLinkHorizontalLength={10}
                     radialLabelsTextXOffset={3}
                     radialLabelsLinkStrokeWidth={2}
                     radialLabelsTextColor={{
                       from: 'color',
                       modifiers: [['darker', 1.2]],
                     }}
                     enableSliceLabels={false}
                     enableRadialLabels={enableRadialLabels ?? true}
                     layers={['slices', 'sliceLabels', 'radialLabels', 'legends', isCenteredPercentage === true ? CenteredPercentage : '']}
      />
    </ResponsivePieWrapper>
    {
      hasDescription && <Ul>
        {list}
      </Ul>
    }

  </BreakDownBlock>
}

export default SmallBreakDown