import React, { useState } from 'react'
import styled from 'styled-components'
import PotentialFaultRiskBlock from './PotentialFaultRiskBlock'
import { Container, Modal } from 'react-bootstrap'
import { XIcon } from '@primer/octicons-react'
import coolingImg from '../../../../assets/images/cooling.svg'
import openingsImg from '../../../../assets/images/openings.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'
import mechanicalImg from '../../../../assets/images/mechanical-ventilation.svg'

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

const getRowTitle = (idxRow) => {
  switch (idxRow) {
    case 0:
      return 'Rare'
    case 1:
      return 'Unlikely'
    case 2:
      return 'Possible'
    case 3:
      return 'Likely'
    case 4:
      return 'Almost Certain'
    default:
      return ''
  }
}

const getColTitle = (idxCol) => {
  switch (idxCol) {
    case 0:
      return 'Negligible'
    case 1:
      return 'Minor'
    case 2:
      return 'Moderate'
    case 3:
      return 'Major'
    case 4:
      return 'Critical'
    default:
      return ''
  }
}

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
    const TypeListWrapper = styled.div`
      font-size: .9rem;
      margin-left: 10px;
    `
    const TypeItem = styled.div`
      margin-right: 2rem;
    `
    const Header = styled.h4`
      font-size: 1.2rem;
      margin-left: 10px;
      font-weight: 700;
      margin-bottom: 0;
    `
    const HeaderGroupButton = styled.div`

    `
    const HeaderButton = styled.a`
      color: var(--primary);
      font-weight: 600;
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }

      span {
        vertical-align: text-bottom;
        line-height: 24px;
      }
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
        case 'Mechanical Ventilation':
          imgSrc = mechanicalImg
          width =  40
          break
        default:
          imgSrc = ''
          width = 25
          break
      }

      return (
        <tr key={item.measures}>
          <FirstTd width="21%">
            <ImageWrapper><Image src={imgSrc} alt={item.measures} width={width}/></ImageWrapper>
            {item.subSystem}
          </FirstTd>
          <td width="15%">{item.fault}</td>
          <td width="19%">{item.asset}</td>
          <td width="12%">{item.potentialDownTime}</td>
          <td width="12%">{item.sparePartsLeadTime}</td>
          <td width="12%">{item.estimatedTimeToFailure}</td>
          <td>
            <InfoButton className="btn btn-primary btn-sm">Info</InfoButton>
          </td>
        </tr>
      )
    })

    return (
      <Modal show={showListFaultRisksModal} onHide={() => setShowListFaultRisksModal(false)} size="xl">
        <Modal.Header>
        <Container className="mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <Header>Potential Fault</Header>
              <HeaderGroupButton>
                <HeaderButton className="" onClick={() => {setShowListFaultRisksModal(false)}}>
                  <XIcon size={24} className="mr-0"/><span>Close</span>
                </HeaderButton>
              </HeaderGroupButton>
            </div>
  
          </Container>
          </Modal.Header>
        <Modal.Body>
          <Container className="mt-4">
            <TypeListWrapper className="d-flex">
              <TypeItem>Likelihood - <strong>{props.data?.likelihoodTitle}</strong></TypeItem>
              <TypeItem>Impact - <strong>{props.data?.impactTitle}</strong></TypeItem>
            </TypeListWrapper>
            <ImprovementMeasuresTable className="table">
              <thead>
                <tr>
                  <FirstTh width="21%">System</FirstTh>
                  <th width="15%">Fault</th>
                  <th width="19%">Asset</th>
                  <th width="12%">Potential<br/>Downtime (Days)</th>
                  <th width="12%">Spare Parts Lead <br/>Time (Days)</th>
                  <th width="12%">Estimated Time <br/>to Failure Days</th>
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
         </Container>
        </Modal.Body>
      </Modal>
    )
  }

  const onClick = (value, likelihood, impact) => {
    if (value === 0) {
      setShowMsgModal(true)
    } else if (value > 0) {
      setlistFaultRisksModalProps({
        likelihoodTitle: getRowTitle(likelihood - 1),
        impactTitle: getColTitle(impact - 1),
        list: data.filter(item => item.impact === impact && item.likelihood === likelihood)
      })
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
          <PotentialFaultRiskBlock key={index} color={color} value={col} onClick={() => onClick(col, idx + 1, index + 1)}/>
        )
      }
    )

    const indexRowTitle = getRowTitle(idx)

    return (
      <PotentialFaultRiskRow className="row" key={idx}>
        <PotentialFaultRiskBlock key={indexRowTitle} isIndexCol={true} value={indexRowTitle}/>
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