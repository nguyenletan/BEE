import React from 'react'
import styled from 'styled-components'
import openingsImg from '../../../../assets/images/openings.svg'
import coolingImg from '../../../../assets/images/cooling.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'

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
    font-weight: 600;
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
  border-radius: 15px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
`

const ImprovementMeasures = ({ data }) => {
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
        <FirstTd><ImageWrapper><Image src={imgSrc} alt={item.measures} width={width}/></ImageWrapper>{item.measures}
        </FirstTd>
        <td>{item.investmentCost}</td>
        <td>{item.energySavings}</td>
        <td>{item.energyCostSavings}</td>
        <td>{item.paybackPeriod}</td>
        <td>{item.co2EmissionsAvoided}</td>
        <td>
          <InfoButton className="btn btn-primary btn-sm">Info</InfoButton>
        </td>
      </tr>
    )
  })

  return (
    <ImprovementMeasuresWrapper>
      <ImprovementMeasuresTitle>Improvement Measures</ImprovementMeasuresTitle>
      <ImprovementMeasuresTable className="table">
        <thead>
        <tr>
          <FirstTh>MEASURES</FirstTh>
          <th>INVESTMENT COST<br/>($)</th>
          <th>ENERGY SAVINGS<br/>(MWH/YR)</th>
          <th>ENERGY COST<br/>SAVINGS ($/YR)</th>
          <th>PAYBACK PERIOD<br/>(YR)</th>
          <th>CO2 EMISSIONS<br/>AVOIDED (TONS/YR)</th>
          <th></th>
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
    </ImprovementMeasuresWrapper>

  )
}

export default ImprovementMeasures