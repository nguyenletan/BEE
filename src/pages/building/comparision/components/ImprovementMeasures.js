import React, { useState } from 'react'
import styled from 'styled-components'

import Slider from '@material-ui/core/Slider'
import openingsImg from '../../../../assets/images/openings.svg'
import coolingImg from '../../../../assets/images/cooling.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { LinkExternalIcon, XCircleIcon } from '@primer/octicons-react'
import { withStyles } from '@material-ui/core'

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
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
`

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;
  color: var(--primary);
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
    line-height: 16px;
  }
`

const PopupIcon = styled.img`
  color: var(--primary);
  margin-right: 2rem;
  width: 55px;

`

const PopupValueWrapper = styled.div`
  width: 250px;
  margin-right: 1rem;
`

const PopupValue = styled.span`
  font-size: 2.75rem;
  color: var(--primary);
  vertical-align: text-top;
`

const MeasureName = styled.span`
  font-size: 1rem;
  font-weight: 600;
`

const RangeWrapper = styled.div`

`

const PopupBodyInnerWrapper = styled.div`
  font-size: .9rem;

  .col {
    line-height: 2.5rem;
  }

  .col-value {
    color: var(--primary);
  }
`

const PrettoSlider = withStyles({
  root: {
    color: '#87972f',
    height: 6,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#87972f',
    //border: '2px solid currentColor',
    marginTop: -7,
    marginLeft: -10,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 3px)',
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  rail: {
    height: 6,
    borderRadius: 3,
  },
})(Slider)

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 100,
    label: '100%',
  },
]

const valuetext = (value) => {
  return `${value}°%`
}

const ImprovementMeasures = ({ data }) => {

  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const openPopup = (data) => {
    setPopupProps(data)
    console.log('openPopup')
    handleShow()
  }

  const Popup = (props) => {
    const { icon, measure } = props?.data
    const [value, setValue] = React.useState(60)
    const [showSlider, setShowSlider] = useState(false)

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    return (
      <Modal show={show} onHide={handleClose} size="lg">

        <Modal.Header>
          <Container className="mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <PopupTitle>Improve Performance</PopupTitle>
              <HeaderGroupButton>
                <HeaderButton className="mr-4" onClick={() => {
                  if (showSlider === false) {
                    setShowSlider(true)
                  } else {
                    handleClose()
                  }
                }}>
                  <LinkExternalIcon size={16} className="mr-1"/><span>{showSlider ? 'Save' : 'Edit'}</span>
                </HeaderButton>
                <HeaderButton className="" onClick={handleClose}>
                  <XCircleIcon size={16} className="mr-1"/><span>Close</span>
                </HeaderButton>
              </HeaderGroupButton>
            </div>

            <div className="d-flex">
              <PopupIcon src={icon} alt={measure}/>
              <PopupValueWrapper className="d-flex flex-column justify-content-start align-items-start">
                <PopupValue>{value}%</PopupValue>
                <MeasureName>{measure}</MeasureName>
              </PopupValueWrapper>
              <RangeWrapper className="d-flex flex-column justify-content-end w-75">
                <PrettoSlider
                  disabled={!showSlider}
                  marks={marks}
                  valueLabelDisplay="auto"
                  aria-label="LED replacement slider"
                  defaultValue={60}
                  getAriaValueText={valuetext}
                  onChange={handleChange}
                  step={1}/>
              </RangeWrapper>
            </div>
          </Container>
        </Modal.Header>

        <Modal.Body>
          <PopupBodyInnerWrapper className="container my-2">
            <Row>
              <Col xs={8} sm={4} className="col">Annual Energy Savings</Col>
              <Col xs={4} sm={2} className="col col-value">123.6 MWh</Col>
              <Col xs={8} sm={4} className="col">Investment Cost</Col>
              <Col xs={4} sm={2} className="col col-value">$ 37,000</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">Annual Energy Cost Savings</Col>
              <Col xs={4} sm={2} className="col col-value">$ 19,300 / yr</Col>
              <Col xs={8} sm={4} className="col">Simple Payback</Col>
              <Col xs={4} sm={2} className="col col-value">2 yr</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">Annual CO2 Emissions Avoided</Col>
              <Col xs={4} sm={2} className="col col-value">57 Tons/yr</Col>
              <Col xs={8} sm={4} className="col">Internal Rate of Return</Col>
              <Col xs={4} sm={2} className="col col-value">27%</Col>
            </Row>
          </PopupBodyInnerWrapper>
        </Modal.Body>
      </Modal>
    )
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
          {item.measures}
        </FirstTd>
        <td>{item.investmentCost}</td>
        <td>{item.energySavings}</td>
        <td>{item.energyCostSavings}</td>
        <td>{item.paybackPeriod}</td>
        <td>{item.co2EmissionsAvoided}</td>
        <td>
          <InfoButton className="btn btn-primary btn-sm"
                      onClick={() => openPopup({
                        icon: imgSrc,
                        measure: item.measures
                      })}>
            Info
          </InfoButton>
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

      <Popup data={popUpProps}/>
    </ImprovementMeasuresWrapper>

  )
}

export default ImprovementMeasures