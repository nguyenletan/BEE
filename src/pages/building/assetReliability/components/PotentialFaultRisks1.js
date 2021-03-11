import React, { useState } from 'react'
import styled from 'styled-components'
import PotentialFaultRiskBlock from './PotentialFaultRiskBlock'
import { Modal } from 'react-bootstrap'
import coolingImg from '../../../../assets/images/cooling.svg'
import openingsImg from '../../../../assets/images/openings.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'

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

  const [showMsgModal, setShowMsgModal] = useState(false)
  const [showListFaultRisksModal, setShowListFaultRisksModal] = useState(false)
  const [listFaultRisksModalProps, setlistFaultRisksModalProps] = useState({})

  const MsgModal = () => {
    return (
      <Modal show={showMsgModal} onHide={() => setShowMsgModal(false)} size="md">

        <Modal.Body>
          <div className="text-center text-warning">No Fault Risk on this cell</div>
        </Modal.Body>
      </Modal>
    )

  }

  const ListFaultRisksModal = (props) => {
    console.log(props)

    const ImprovementMeasuresTableWrapper = styled.div`
      height: 350px;
      overflow: auto;
      font-size: .9rem;
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
        line-height: 2rem;
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
      border-radius: 20px;
      padding-left: 18px;
      padding-right: 18px;
      text-transform: uppercase;
    `

    const rows =  props.data?.list?.map(item => {
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
          <FirstTd width="15%">
            <ImageWrapper><Image src={imgSrc} alt={item.measures} width={width}/></ImageWrapper>
            {item.subSystem}
          </FirstTd>
          <td width="16%">{item.fault}</td>
          <td width="18%">{item.asset}</td>
          <td width="14%">{item.potentialDownTime}</td>
          <td width="14%">{item.sparePartsLeadTime}</td>
          <td width="14%">{item.estimatedTimeToFailure}</td>
          <td>
            <InfoButton className="btn btn-primary btn-sm">Info</InfoButton>
          </td>
        </tr>
      )
    })

    return (
      <Modal show={showListFaultRisksModal} onHide={() => setShowListFaultRisksModal(false)} size="xl">

        <Modal.Body>
          <ImprovementMeasuresTable className="table">
            <thead>
              <tr>
                <FirstTh width="15%">System</FirstTh>
                <th width="16%">Fault</th>
                <th width="18%">Asset</th>
                <th width="14%">Potential<br/>Downtime (Days)</th>
                <th width="14%">Spare Parts Lead <br/>Time (Days)</th>
                <th width="14%">Estimated Time <br/>to Failure Days</th>
                <th>Details</th>
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
        </Modal.Body>
      </Modal>
    )

  }



  const onClick = (value, likelihood, impact) => {
    console.log('impact: ' + impact)
    console.log('likelihood: ' + likelihood)

    if (value === 0) {
      setShowMsgModal(true)
    } else if (value > 0) {
      //console.log(data.filter(item => item.impact === impact && item.likelihood === likelihood))
      setlistFaultRisksModalProps({list: data.filter(item => item.impact === impact && item.likelihood === likelihood)})

      setShowListFaultRisksModal(true)
    }
  }

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

  const setOfListFaultRisksForModal =  new Set()


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
        if(col === 1) {
          setOfListFaultRisksForModal.add(data[idx])
        }
        return (
          <PotentialFaultRiskBlock key={index} color={color} value={col} onClick={() => onClick(col, idx + 1, index + 1)}/>
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
    <PotentialFaultRiskWrapper className="mb-4">

      <PotentialFaultRiskTitle>Potential Fault Risks</PotentialFaultRiskTitle>
      <PotentialFaultRiskSubTopTitle>Impact</PotentialFaultRiskSubTopTitle>
      <div className="d-flex">
        <PotentialFaultRiskSubLeftTitle><h4>Likelihood</h4></PotentialFaultRiskSubLeftTitle>
        <div>
          <PotentialFaultRiskRow className="row">
            <PotentialFaultRiskBlock key="empty" isIndexCol={true} height={40} value=""/>
            <PotentialFaultRiskBlock key="Negligible" isHeader={true} value="Negligible"/>
            <PotentialFaultRiskBlock key="Minor" isHeader={true} value="Minor"/>
            <PotentialFaultRiskBlock key="Moderate" isHeader={true} value="Moderate"/>
            <PotentialFaultRiskBlock key="Major" isHeader={true} value="Major"/>
            <PotentialFaultRiskBlock key="Critical" isHeader={true} value="Critical"/>
          </PotentialFaultRiskRow>
          {rows}
        </div>
      </div>
      <MsgModal/>
      <ListFaultRisksModal data={listFaultRisksModalProps}/>
    </PotentialFaultRiskWrapper>
  )
}

export default PotentialFaultRisks