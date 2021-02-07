import React from 'react'
import styled from 'styled-components'
import PotentialFaultRiskBlock from './PotentialFaultRiskBlock'

const PotentialFaultRiskWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px 40px 30px 30px;
  margin-right: 40px;
`

const PotentialFaultRiskTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`


const PotentialFaultRiskSubTopTitle = styled.h4`
  width: 100%;
  font-size: 1.05rem;
  font-weight: 600;
  text-align: center;
  margin: 0 auto 1rem;
`

const PotentialFaultRiskSubLeftTitle = styled.aside`
  margin-right: 60px;
  width: 10px;
  display: block;
  position: relative;
  h4 {
    /* Abs positioning makes it not take up vert space */
    position: absolute;
    top: 60%;
    left: 0;

    /* Border is the new background */
    background: none;

    /* Rotate from top left corner (not default) */
    transform-origin: 0 0;
    transform: rotate(270deg);
    width: 100%;
    font-size: 1.05rem;
    font-weight: 600;
  }
`

const PotentialFaultRiskRow = styled.div`
  flex-wrap: nowrap;
`

const PotentialFaultRisks = ({ data }) => {

  const likelihoodList = data.map(item => item.likelihood)
  const impactList = data.map(item => item.impact)

  const riskMatrix = []
  for (let i = 0; i < 5; i++) {
    riskMatrix[i] = []
    for (let j = 0; j < 5; j++) {
      riskMatrix[i][j] = 0
    }
  }

  for (let i = 0; i < likelihoodList.length; i++) {
    riskMatrix[likelihoodList[i] - 1][impactList[i] - 1] += 1
  }

  // console.log(riskMatrix)
  const rows = riskMatrix.map((row, idx) => {

    const inactiveColorMatrix = [
      ['#d8debf', '#d8debf', '#f7e7cb', '#f7e7cb', '#f7e7cb'],
      ['#d8debf', '#f7e7cb', '#f7e7cb', '#f2c4c3', '#f2c4c3'],
      ['#f7e7cb', '#f7e7cb', '#f2c4c3', '#f2c4c3', '#f2c4c3'],
      ['#f7e7cb', '#f2c4c3', '#f2c4c3', '#f2c4c3', '#d1c3f2'],
      ['#f7e7cb', '#f2c4c3', '#f2c4c3', '#d1c3f2', '#d1c3f2'],
    ]

    const activeColorMatrix = [
      ['#87972f', '#87972f', '#edb857', '#edb857', '#edb857'],
      ['#87972f', '#edb857', '#edb857', '#db4404', '#db4404'],
      ['#edb857', '#edb857', '#db4404', '#db4404', '#db4404'],
      ['#edb857', '#db4404', '#db4404', '#db4404', '#703ddc'],
      ['#edb857', '#db4404', '#db4404', '#703ddc', '#703ddc'],
    ]

    const cols = row.map((col, index) => {
        const color = col > 0 ? activeColorMatrix[idx][index] : inactiveColorMatrix[idx][index]

        return (
          <PotentialFaultRiskBlock key={index} color={color} value={col}/>
        )
      }
    )
    let indexColTitle = ''
    switch (idx) {
      case 0:
        indexColTitle = 'Rare'
        break
      case 1:
        indexColTitle = 'Unlikely'
        break
      case 2:
        indexColTitle = 'Possible'
        break
      case 3:
        indexColTitle = 'Likely'
        break
      case 4:
        indexColTitle = 'Almost Certain'
        break
      default:
        break
    }
    return (
      <PotentialFaultRiskRow className="row" key={idx}>
        <PotentialFaultRiskBlock key={indexColTitle} isIndexCol={true} value={indexColTitle}/>
        {cols}
      </PotentialFaultRiskRow>)
  })

  return (
    <PotentialFaultRiskWrapper>

      <PotentialFaultRiskTitle>Potential Fault Risks</PotentialFaultRiskTitle>
      <PotentialFaultRiskSubTopTitle>Impact</PotentialFaultRiskSubTopTitle>
      <div className="d-flex">
        <PotentialFaultRiskSubLeftTitle><h4>Likelihood</h4></PotentialFaultRiskSubLeftTitle>
        <div>
          <PotentialFaultRiskRow className="row">
            <PotentialFaultRiskBlock key="" isIndexCol={true} height={40} value=""/>
            <PotentialFaultRiskBlock key="Negligible" isHeader={true} value="Negligible"/>
            <PotentialFaultRiskBlock key="Minor" isHeader={true} value="Minor"/>
            <PotentialFaultRiskBlock key="Moderate" isHeader={true} value="Moderate"/>
            <PotentialFaultRiskBlock key="Major" isHeader={true} value="Major"/>
            <PotentialFaultRiskBlock key="Critical" isHeader={true} value="Critical"/>
          </PotentialFaultRiskRow>
          {rows}
        </div>
      </div>
    </PotentialFaultRiskWrapper>
  )
}

export default PotentialFaultRisks