import React from 'react'
import styled from 'styled-components'
import openingsImg from '../../../../assets/images/opening.png'
import coolingImg from '../../../../assets/images/cooling.svg'
import lightingImg from '../../../../assets/images/lighting.svg'

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
    height: 3rem;
    border-bottom: 1px solid #eaeaea;
  }

  tbody tr {
    line-height: 122px;
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

const improvementMeasuresData = [
  {
    measures: 'LED Replacement',
    investmentCost: 36000,
    energySavings: 74.3,
    energyCostSavings: 19300,
    paybackPeriod: 2.7,
    co2EmissionsAvoided: 65
  },
  {
    measures: 'chiller unit replacement',
    investmentCost: 234000,
    energySavings: 177.09,
    energyCostSavings: 46000,
    paybackPeriod: 5.1,
    co2EmissionsAvoided: 154.92
  },
  {
    measures: 'double glaze lowe windows',
    investmentCost: 103000,
    energySavings: 106.45,
    energyCostSavings: 27650,
    paybackPeriod: 3.7,
    co2EmissionsAvoided: 93.12
  }
]

const ImprovementMeasures = () => {
  const rows = improvementMeasuresData.map(item => {
    let imgSrc = lightingImg
    let width = 60
    switch (item.measures) {
      case 'chiller unit replacement':
        imgSrc = coolingImg
        width = 30
        break
      case 'double glaze lowe windows':
        imgSrc = openingsImg
        width = 45
        break
      default:
        imgSrc = lightingImg
        width = 25
        break

    }
    return (
      <tr>
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
        <tbody>
        {rows}
        </tbody>
      </ImprovementMeasuresTable>
    </ImprovementMeasuresWrapper>

  )
}

export default ImprovementMeasures