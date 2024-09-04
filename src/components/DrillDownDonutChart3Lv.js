import React, { useEffect, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
import { deepClone, formatNumber, getColorPattern } from 'Utilities'
import { breakDownLevelState, breakdownState, consumptionBreakdownState, isBreakDownDrillDownState, selectedSubBreakdownState } from 'atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Item, Menu, useContextMenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Popover from '@mui/material/Popover'

const BreakDownBlock = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
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
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.85rem')};
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
const ColorBlock = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: ${(props) => props.bgColor};
  margin-right: 0.5em;
`

const ContextMenu = styled.div`
  padding: 10px;
  background-color: #f9f3f2;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
    color: var(--bs-primary);
    font-size: 0.9rem;
  }
  span {
    font-weight: bold;
  }
`

const DrillDownDonutChart3Lv = (props) => {
  const {
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

  const [selectedSubBreakdown, setSelectedSubBreakdown] = useRecoilState(selectedSubBreakdownState)
  const [isBreakDownDrillDown, setIsBreakDownDrillDown] = useRecoilState(isBreakDownDrillDownState)
  const [breakDownLevel, setBreakDownLevel] = useRecoilState(breakDownLevelState)
  const breakdownSt = useRecoilValue(breakdownState)
  const setConsumptionBreakdownSt = useSetRecoilState(consumptionBreakdownState)
  const [selectedBreakdownItemMenuItem, setSelectedBreakdownItemMenuItem] = useState()
  const [equipmentId, setEquipmentId] = useState()
  const { t, i18n } = useTranslation('buildingPerformance')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)

  const handleCloseContextMenu = () => {
    setAnchorEl(null)
    setIsOpenContextMenu(false)
  }

  const dataSource = useMemo(() => {
    const tmp = deepClone(data)
    return tmp.map((item) => ({ ...item, id: t(item.id) }))
  }, [data, t])

  const commonProperties = {
    margin: { top: 40, right: 20, bottom: 20, left: 20 },
    data: dataSource,
    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'startAngle',
    activeOuterRadiusOffset: 4,
  }

  const chartHeight = hasDescription ? '250px' : '150px'

  const { id } = useParams()

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
        {!noCenterText && (
          <text
            x={centerX}
            y={centerY + 15}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: valueFontSize ?? '24px',
              fontWeight: '700',
            }}
          >
            t('Used')
          </text>
        )}
      </>
    )
  }

  const SubCategoryName = ({ centerX, centerY }) => {
    if (selectedSubBreakdown === 'mechanical ventilation') {
      return (
        <>
          <text
            x={centerX}
            y={centerY - 12}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: valueFontSize ?? '16px',
              stroke: dataSource[0]?.color ?? '#5F5283',
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
              stroke: dataSource[0]?.color ?? '#5F5283',
            }}
          >
            Ventilation
          </text>
        </>
      )
    }
    return (
      selectedSubBreakdown && (
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: valueFontSize ?? '18px',
            textTransform: 'capitalize',
            stroke: dataSource[0]?.color ?? '#5F5283',
          }}
        >
          {selectedSubBreakdown}
        </text>
      )
    )
  }

  const handleClick = useCallback(
    (node, event) => {
      if (node.data?.subBreakdown) {
        setBreakDownLevel((prevLevel) => prevLevel + 1)
        setSelectedSubBreakdown(node.id)
        setIsBreakDownDrillDown(true)
        setConsumptionBreakdownSt(node.data.subBreakdown)
      } else if (breakDownLevel === 2) {
        setEquipmentId(node?.data.equipmentId)
        setSelectedBreakdownItemMenuItem({
          name: node.label,
          id: node.label,
        })
        setAnchorEl(event.currentTarget)
        setIsOpenContextMenu(true)
      }
    },
    [breakDownLevel, setBreakDownLevel, setSelectedSubBreakdown, setIsBreakDownDrillDown, setConsumptionBreakdownSt]
  )

  const handleBackBtn = useCallback(() => {
    setSelectedSubBreakdown(null)
    setIsBreakDownDrillDown(false)
    setBreakDownLevel(0)
    setConsumptionBreakdownSt(breakdownSt.consumptionBreakdown)
  }, [setSelectedSubBreakdown, setIsBreakDownDrillDown, setBreakDownLevel, setConsumptionBreakdownSt, breakdownSt.consumptionBreakdown])

  const getValue = useCallback(
    (value, title) => {
      const formatters = {
        [t('Consumption Breakdown')]: (v) => formatNumber(v / 1000, 2, 'MWh'),
        [t('Cost Breakdown')]: (v) => formatNumber(v * 0.23, 2, t('$')),
        default: (v) => formatNumber(v * 0.000208, 2, t('Ton')),
      }
      return (formatters[title] || formatters.default)(value)
    },
    [t]
  )

  const list = useMemo(
    () =>
      dataSource.map((x, index) => {
        const colors = getColorPattern(isBreakDownDrillDown ? 1 : 0)
        return (
          <li className="d-flex justify-content-between" key={x.id}>
            <span className="d-flex">
              <ColorBlock bgColor={colors[index]} />
              <Label fontSize={informationFontSize}>{x.id}:</Label>
            </span>
            <Value fontSize={informationFontSize}>{getValue(x.consumption, title)}</Value>
          </li>
        )
      }),
    [dataSource, isBreakDownDrillDown, informationFontSize, getValue, title]
  )

  return (
    <BreakDownBlock marginRight={marginRight}>
      <div className="d-flex justify-content-between">
        <div>
          <BreakDownTitle>{t(title)}</BreakDownTitle>
          {subTitle ?? <BreakDownSubTitle>{t(subTitle)}</BreakDownSubTitle>}
        </div>
        <div>
          {isBreakDownDrillDown === true && (
            <button className="btn btn-sm btn-outline-primary" onClick={handleBackBtn}>
              {t('Reset')}
            </button>
          )}
        </div>
      </div>
      <Popover
        id="context-menu"
        open={isOpenContextMenu}
        anchorEl={anchorEl}
        onClose={handleCloseContextMenu}
        anchorOrigin={{
          vertical: 'middle',
          horizontal: 'left',
        }}
      >
        {selectedBreakdownItemMenuItem && (
          <ContextMenu>
            <Link to={`/building/${id}/asset-reliability/equipment/${equipmentId}/${selectedSubBreakdown}`}>
              {t('Go to Asset Reliability')} - <span>{selectedBreakdownItemMenuItem?.name}</span>
            </Link>
          </ContextMenu>
        )}
      </Popover>

      <ResponsivePieWrapper height={chartHeight}>
        <ResponsivePie
          {...commonProperties}
          innerRadius={innerRadius ?? 0.55}
          fit
          startAngle={startAngle ?? -120}
          colors={getColorPattern(isBreakDownDrillDown ? 1 : 0)}
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
          arcLabel={function (e) {
            return e.value + '%'
          }}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['brighter', 3]],
          }}
          // enableSliceLabels={false}
          // enableRadialLabels={enableRadialLabels ?? true}
          onClick={(node, event) => handleClick(node, event)}
          layers={['arcs', 'arcLabels', 'legends', SubCategoryName, isCenteredPercentage === true ? CenteredPercentage : '']}
        />
      </ResponsivePieWrapper>
      {hasDescription && <Ul>{list}</Ul>}
    </BreakDownBlock>
  )
}

export default DrillDownDonutChart3Lv
