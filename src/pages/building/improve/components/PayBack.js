/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { coolingSVG, heatingSVG, lightingSVG, openingsSVG, wallSVG } from 'SvgConstants'
import { useTranslation } from 'react-i18next'
import coolingImg from 'assets/images/cooling.svg'
import openingsImg from 'assets/images/openings.svg'
import lightingImg from 'assets/images/lighting.svg'
import heatingImg from 'assets/images/heating.svg'
import wallImg from 'assets/images/wall.svg'
import ImprovementMeasurePopup from 'pages/building/improve/components/ImprovementMeasurePopup'
import UrlButton from 'components/UrlButton'

const PayBackWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 550px
`

const PayBackTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
`


const PayBack = ({ data, setResult }) => {
  const { t, i18n } = useTranslation('improvement')

  const payBackData = data.map(item => {

    return {
      id: t(item.measures),
      data: [
        {
          x: +(item.internalRateOfReturn.toFixed(2)),
          y: +(item.paybackPeriod.toFixed(2)),
          subSystem: item.subSystem,
          ...item,
        }],
    }
  })

  const [dataSource, setDataSource] = useState(payBackData)

  useEffect(() => {
    const payBackData = data.map(item => {

      return {
        id: t(item.measures),
        data: [
          {
            x: +(item.internalRateOfReturn.toFixed(2)),
            y: +(item.paybackPeriod.toFixed(2)),
            subSystem: item.subSystem,
            ...item,
          }],
      }
    })

    setDataSource(payBackData)
  }, [i18n.language, data])

  const commonProps = {
    // width: 790,
    // height: 470,
    margin: { top: 34, right: 30, bottom: 70, left: 50 },
    nodeSize: 20,
    useMesh: true,
    blendMode: 'multiply',
    xFormat: d => `${d}%`,
    yFormat: d => `${d} Yr`,
    axisBottom: {
      format: d => `${d} %`,
      legend: t('Internal Rate of Return (%)'),
      legendOffset: 40,
    },
    axisLeft: {
      format: d => `${d} Yr`,
      legend: t('Simple Payback (Yr)'),
      legendOffset: -50,
    },
    data: dataSource,
    tooltip: ({ node }) => (
      <div
        style={{
          color: node.color,
          background: '#333',
          padding: '12px 16px',
          fontSize: '13px',
        }}
      >
        <strong>{node.serieId}</strong>
        <br/>
        Internal Rate of Return: <strong>{node.formattedX}</strong>
        <br/>
        Simple Payback: <strong>{node.formattedY}</strong>
      </div>
    ),
  }

  const CustomNode = ({
    node,
    x,
    y,
  }) => {
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

  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})

  const handleClose = (isChanged, result) => {

    if (isChanged && setResult !== undefined) {
      // setPopUpResult({ ...result })]
      setResult({ ...result })
    }
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const openPopup = (data) => {
    setPopupProps(data)
    handleShow()
  }

  const handleClick = (node, event) => {
    let imgSrc
    // let width
    switch (node.data.subSystem) {
      case 'Cooling':
        imgSrc = coolingImg
        // width = 30
        break
      case 'Openings':
        imgSrc = openingsImg
        // width = 45
        break
      case 'Lighting':
        imgSrc = lightingImg
        // width = 25
        break
      case 'Heating':
        imgSrc = heatingImg
        // width = 20
        break
      case 'Walls':
        imgSrc = wallImg
        // width = 40
        break
      default:
        imgSrc = ''
        // width = 25
        break
    }
    openPopup({
      icon: imgSrc,
      measures: node.serieId,
      investmentCost: node.data.investmentCost,
      energyCostSavings: node.data.energyCostSavings,
      energySavings: node.data.energySavings,
      paybackPeriod: node.data.paybackPeriod,
      co2EmissionsAvoided: node.data.co2EmissionsAvoided,
      internalRateOfReturn: node.data.internalRateOfReturn,
      usagePercent: node.data.usagePercent,
    })
  }

  return (
    <PayBackWrapper>
      <div className="d-flex justify-content-between">
        <PayBackTitle>{t('Payback')}</PayBackTitle>
        <UrlButton url="improve-payback" textWidth='45ch'/>
      </div>
      <ResponsiveScatterPlot
        {...commonProps}
        colors={{ scheme: 'set2' }}
        nodeSize={32}
        nodeComponent={CustomNode}
        onClick={handleClick}
      />
      {show && <ImprovementMeasurePopup data={popUpProps} handleClose={handleClose} show={true}/>}
    </PayBackWrapper>
  )
}

export default PayBack
