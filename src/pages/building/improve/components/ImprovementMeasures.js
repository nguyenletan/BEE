/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import styled from 'styled-components'

import openingsImg from 'assets/images/openings.svg'
import coolingImg from 'assets/images/cooling.svg'
import lightingImg from 'assets/images/lighting.svg'
import heatingImg from 'assets/images/heating.svg'
import wallImg from 'assets/images/wall.svg'
import { useTranslation } from 'react-i18next'
import { formatNumber } from 'Utilities'

import ImprovementMeasurePopup from 'pages/building/improve/components/ImprovementMeasurePopup'

const ImprovementMeasuresWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  background-color: #fcfcfc;
`

const ImprovementMeasuresTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
`

const ImprovementMeasuresTable = styled.table`
  border-top: none;
  font-size: 0.9rem;

  th {
    font-weight: 500;
    text-align: center;
    border: none !important;
    vertical-align: middle !important;
  }

  thead tr {

    border-bottom: 1px solid #eaeaea;
  }

  tbody tr {
    //line-height: 72px;
    height: 81px;
    //line-height: 36px;
    border-bottom: 1px solid #eaeaea;
    vertical-align: center;
  }

  td {
    text-transform: capitalize;
    border: none;
    text-align: center;
    vertical-align: center;
  }
`
const FirstTh = styled.th`
  text-align: left !important;
`
const FirstTd = styled.td`
  text-align: left !important;
  display: flex;
  align-items: center;
`

const Image = styled.img`

`

const ImprovementMeasuresTableWrapper = styled.div`
  height: 350px;
  overflow: auto;
`

const ImageWrapper = styled.span`
  width: 45px;
  text-align: center;
  margin-right: 5px;
  display: inline-block;
`

const InfoButton = styled.button`
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
`

const ImprovementMeasures = ({ data, setResult }) => {
  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})
  const { t } = useTranslation('improvement')

  const handleClose = (isChanged, result) => {
    if (isChanged) {
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

  const rows = data.map(item => {
    let imgSrc
    let width
    switch (item.subSystem) {
      case 'Cooling':
        imgSrc = coolingImg
        width = 30
        break
      case 'Openings':
        imgSrc = openingsImg
        width = 45
        break
      case 'Lighting':
        imgSrc = lightingImg
        width = 25
        break
      case 'Heating':
        imgSrc = heatingImg
        width = 20
        break
      case 'Walls':
        imgSrc = wallImg
        width = 40
        break
      default:
        imgSrc = ''
        width = 25
        break
    }
    return (
      <tr key={item.measures}>
        <FirstTd>
          <ImageWrapper><Image src={imgSrc} alt={item.measures} width={width}/></ImageWrapper>
          {t(item.measures)}
        </FirstTd>
        <td width="18%">{formatNumber(item.investmentCost)}</td>
        <td width="12%">{formatNumber(item.energySavings)}</td>
        <td width="12%">{formatNumber(item.energyCostSavings)}</td>
        <td width="12%">{item.paybackPeriod.toFixed(4)}</td>
        <td width="12%">{formatNumber(item.co2EmissionsAvoided)}</td>
        <td width="10%">
          <InfoButton
            className="btn btn-primary btn-sm"
            onClick={() => openPopup({
              icon: imgSrc,
              measures: item.measures,
              investmentCost: item.investmentCost,
              energyCostSavings: item.energyCostSavings,
              energySavings: item.energySavings,
              paybackPeriod: item.paybackPeriod,
              co2EmissionsAvoided: item.co2EmissionsAvoided,
              internalRateOfReturn: item.internalRateOfReturn,
              usagePercent: item.usagePercent,
            })}
          >
            {t('Info')}
          </InfoButton>
        </td>
      </tr>
    )
  })

  return (
    <ImprovementMeasuresWrapper>
      <ImprovementMeasuresTitle>{t('Improvement Measures')}</ImprovementMeasuresTitle>
      <ImprovementMeasuresTable className="table">
        <thead>
        <tr>
          <FirstTh>{t('MEASURES')}</FirstTh>
          <th width="18%">{t('INVESTMENT COST')}<br/>({t('$')})</th>
          <th width="12%">{t('ENERGY SAVINGS')}<br/>({t('MWH/YR')})</th>
          <th width="12%">{t('ENERGY COST SAVINGS')}<br/>({t('$/YR')})</th>
          <th width="12%">{t('PAYBACK PERIOD')}<br/>({t('YR')})</th>
          <th width="12%">{t('CO2 EMISSIONS AVOIDED')}<br/>({t('TONS/YR')})</th>
          <th width="10%"/>
        </tr>
        </thead>
      </ImprovementMeasuresTable>
      <ImprovementMeasuresTableWrapper>
        <ImprovementMeasuresTable className="table">
          <tbody>
          {rows}
          </tbody>
        </ImprovementMeasuresTable>
      </ImprovementMeasuresTableWrapper>

      {show && <ImprovementMeasurePopup data={popUpProps} handleClose={handleClose} show={true}/>}
    </ImprovementMeasuresWrapper>

  )
}

export default ImprovementMeasures
