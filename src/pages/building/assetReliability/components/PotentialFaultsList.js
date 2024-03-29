import React from 'react'
import styled from 'styled-components'
import openingsImg from '../../../../assets/images/openings.svg'
import coolingImg from '../../../../assets/images/cooling.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'
import mechVentImg from '../../../../assets/images/mechanical-ventilation.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

  th {
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    border: none !important;
    vertical-align: middle !important;
  }

  thead tr {

    border-bottom: 1px solid #eaeaea;
  }

  tbody tr {
    line-height: 100px;
    border-bottom: 1px solid #eaeaea;
  }

  td {
    text-transform: capitalize;
    border: none;
    text-align: center;
    font-size: 0.8rem;
  }
`
const FirstTh = styled.th`
  text-align: left !important
`
const FirstTd = styled.td`
  text-align: left !important;
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
  a {
    color: white !important;
  }
`

const PotentialFaultList = ({ data }) => {
  const { t } = useTranslation('assetReliability')
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
      case 'Mechanical Ventilation':
        imgSrc = mechVentImg
        width = 40
        break
      default:
        imgSrc = ''
        width = 25
        break
    }
    return (
      <tr key={item.asset}>
        <FirstTd><ImageWrapper><Image src={imgSrc} alt={item.subSystem} width={width} /></ImageWrapper>{t(item.subSystem)}
        </FirstTd>
        <td width='18%'>{t(item.asset)}</td>
        <td width='12%'>{t(item.fault)}</td>
        <td width='12%'>{item.potentialDownTime}</td>
        <td width='12%'>{item.sparePartsLeadTime}</td>
        <td width='15%'>{item.estimatedTimeToFailure}</td>
        <td width='10%'>
          <InfoButton className='btn btn-primary btn-sm'><Link to={'issue/' + item.id}>Info</Link></InfoButton>
        </td>
      </tr>
    )
  })

  return (
    <ImprovementMeasuresWrapper>
      <ImprovementMeasuresTitle>{t('Improvement Measures')}</ImprovementMeasuresTitle>
      <ImprovementMeasuresTable className='table'>
        <thead>
          <tr>
            <FirstTh>{t('Sub-System')}</FirstTh>
            <th width='18%'>{t('Asset')}</th>
            <th width='12%'>{t('Fault')}</th>
            <th width='12%'>{t('Potential Downtime')}</th>
            <th width='12%'>{t('Spare Parts Lead Time')}</th>
            <th width='15%'>{t('Estimated Time To Failure')}</th>
            <th width='10%'></th>
          </tr>
        </thead>
      </ImprovementMeasuresTable>
      <ImprovementMeasuresTableWrapper>
        <ImprovementMeasuresTable className='table'>
          <tbody>
            {rows}
          </tbody>
        </ImprovementMeasuresTable>
      </ImprovementMeasuresTableWrapper>
    </ImprovementMeasuresWrapper>

  )
}

export default PotentialFaultList
