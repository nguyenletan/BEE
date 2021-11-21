import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'

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
  font-size: ${props => props.fontSize ? props.fontSize : '0.85rem'};
  margin-bottom: 0;
  margin-top: 30px;
`

const Label = styled.label`
  text-transform: capitalize;
`

const BreakDown = (props) => {
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
    hasArcLabels
  } = props

  const { t, i18n } = useTranslation(['buildingPerformance', 'improvement'])

  const [dataSource, setDataSource] = useState(data)

  useEffect(() => {
    const tmp = deepClone(data)
    for (let item of tmp) {
      item.id = t(item.id, { ns: 'buildingPerformance' })
    }
    setDataSource(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, i18n.language])

  const commonProperties = {
    margin: { top: 40, right: 20, bottom: 20, left: 20 },
    data: dataSource,
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
          y={centerY + 10}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '20px',
            fontWeight: '700',
          }}
        >
          {t('Used', { ns: 'buildingPerformance' })}
        </text>}
      </>
    )
  }

  const list = data.map(x => <li className="d-flex justify-content-between" key={x.id}>
    <Label style={{ fontSize: informationFontSize }}>{t(x.id, {ns: 'buildingPerformance'})}:</Label>
    <span style={{ fontSize: informationFontSize }}>{x.value}</span>
  </li>)

  return (
    <BreakDownBlock marginRight={marginRight}>
      <BreakDownTitle>{t(title, {ns: 'improvement'})}</BreakDownTitle>
      <BreakDownSubTitle>{t(subTitle, {ns: 'improvement'})}</BreakDownSubTitle>
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
              {/*{t(subTitle, {ns: "improvement"})}*/}
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
          layers={[
            'arcs',
            hasArcLabels !== false ? 'arcLabels' : '',
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

export default BreakDown
