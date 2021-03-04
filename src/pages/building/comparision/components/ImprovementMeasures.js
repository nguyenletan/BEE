import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '@material-ui/core/Input'
import Slider from '@material-ui/core/Slider'
import openingsImg from '../../../../assets/images/openings.svg'
import coolingImg from '../../../../assets/images/cooling.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import wallImg from '../../../../assets/images/wall.svg'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { LinkExternalIcon, XCircleIcon } from '@primer/octicons-react'
import IRR from '../../../../IRR'
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
  visibility: ${props => props.show === false ? 'hidden' : 'visible'};
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

const ImprovementMeasures = ({ data, setResult }) => {
  let isChanged = false
  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})
  //const [popUpResult, setPopUpResult] = useState({})

  const handleClose = (isChanged, result) => {
    console.log(result)
    if(isChanged) {
      //setPopUpResult({ ...result })
      setResult({...result})
    }
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const openPopup = (data) => {
    setPopupProps(data)
    handleShow()
  }

  const Popup = (props) => {


    const calculateIRRValue = (firstValue, secondValue, loopTime = 20) => {
      const IRRvalues = new Array(loopTime - 1)
      for (let i = 0; i < IRRvalues.length; i++) {
        IRRvalues[i] = secondValue
      }

      let internalRateOfReturn = IRR([firstValue, ...IRRvalues])
      if (internalRateOfReturn !== '#NUM!') {
        internalRateOfReturn = +internalRateOfReturn.toFixed(2) * 100
      }
      return internalRateOfReturn
    }

    const { icon, measure } = props?.data

    const [showSlider, setShowSlider] = useState(false)
    const [detailValue, setDetailValue] = useState({
      investmentCost: props.data.investmentCost,
      energyCostSavings: props.data.energyCostSavings,
      energySavings: props.data.energySavings,
      paybackPeriod: props.data.paybackPeriod,
      co2EmissionsAvoided: props.data.co2EmissionsAvoided,
      internalRateOfReturn: calculateIRRValue(-props.data.investmentCost, props.data.energyCostSavings, 20)
    })
    const [value, setValue] = React.useState(detailValue.internalRateOfReturn)

    const handleSliderChange = (event, newValue) => {
      setValue(newValue)
    }

    const saveHandle = () => {
      const investmentCost = (60000 * value / 100)
      const energyCostSavings = (32167 * value / 100)
      console.log('saveHandle')
      setDetailValue({
        ...detailValue, ...{
          energySavings: +(123.8 * value / 100).toFixed(2),
          investmentCost: investmentCost,
          energyCostSavings: energyCostSavings,
          co2EmissionsAvoided: +(108.3 * value / 100).toFixed(2),
          paybackPeriod: value > 0 ? +(investmentCost / energyCostSavings).toFixed(2) : 0,
          internalRateOfReturn: value > 0 ? calculateIRRValue(-investmentCost, energyCostSavings, 20) : 0
        }
      })
      isChanged = true
    }

    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleBlur = () => {
      if (value < 0) {
        setValue(0)
      } else if (value > 100) {
        setValue(100)
      }
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
                    saveHandle()
                  }
                }}>
                  <LinkExternalIcon size={16} className="mr-1"/><span>{showSlider ? 'Save' : 'Edit'}</span>
                </HeaderButton>
                <HeaderButton className="" onClick={() => {handleClose(isChanged, detailValue)}}>
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
              <RangeWrapper className="d-flex justify-content-between w-100  align-items-center" show={showSlider}>
                <PrettoSlider
                  className="mr-4"
                  marks={marks}
                  valueLabelDisplay="auto"
                  aria-label="LED replacement slider"
                  defaultValue={60}
                  getAriaValueText={valuetext}
                  onChange={handleSliderChange}
                  value={value}
                  step={1}/>
                <Input
                  style={{ 'margin-top': '-30px' }}
                  className="ml-2"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={value}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </RangeWrapper>
            </div>
          </Container>
        </Modal.Header>

        <Modal.Body>
          <PopupBodyInnerWrapper className="container my-2">
            <Row>
              <Col xs={8} sm={4} className="col">Annual Energy Savings</Col>
              <Col xs={4} sm={2} className="col col-value">{detailValue.energySavings} MWh</Col>
              <Col xs={8} sm={4} className="col">Investment Cost</Col>
              <Col xs={4} sm={2} className="col col-value">${detailValue.investmentCost}</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">Annual Energy Cost Savings</Col>
              <Col xs={4} sm={2} className="col col-value">${detailValue.energyCostSavings} / yr</Col>
              <Col xs={8} sm={4} className="col">Simple Payback</Col>
              <Col xs={4} sm={2} className="col col-value">{detailValue.paybackPeriod} yr</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">Annual CO2 Emissions Avoided</Col>
              <Col xs={4} sm={2} className="col col-value">{detailValue.co2EmissionsAvoided} Tons/yr</Col>
              <Col xs={8} sm={4} className="col">Internal Rate of Return</Col>
              <Col xs={4} sm={2} className="col col-value">{detailValue.internalRateOfReturn} %</Col>
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
        <td width="18%">{item.investmentCost}</td>
        <td width="12%">{item.energySavings}</td>
        <td width="12%">{item.energyCostSavings}</td>
        <td width="12%">{item.paybackPeriod}</td>
        <td width="12%">{item.co2EmissionsAvoided}</td>
        <td width="10%">
          <InfoButton className="btn btn-primary btn-sm"
                      onClick={() => openPopup({
                        icon: imgSrc,
                        measure: item.measures,
                        investmentCost: item.investmentCost,
                        energyCostSavings: item.energyCostSavings,
                        energySavings: item.energySavings,
                        paybackPeriod: item.paybackPeriod,
                        co2EmissionsAvoided: item.co2EmissionsAvoided
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
          <th width="18%">INVESTMENT COST<br/>($)</th>
          <th width="12%">ENERGY SAVINGS<br/>(MWH/YR)</th>
          <th width="12%">ENERGY COST<br/>SAVINGS ($/YR)</th>
          <th width="12%">PAYBACK PERIOD<br/>(YR)</th>
          <th width="12%">CO2 EMISSIONS<br/>AVOIDED (TONS/YR)</th>
          <th width="10%"></th>
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