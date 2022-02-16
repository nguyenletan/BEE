/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IRR from 'IRR'
import { useAuth } from 'AuthenticateProvider'
import {
  getAnnualCarbonEmissionsAvoided,
  getAnnualEnergyCostSavings,
  getAnnualEnergySavings,
  getCostOfImprovement,
  getNewAnnualLightingSystemEnergyConsumption,
  getPayback,
} from 'api/ImproveAPI'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { LinkExternalIcon, XCircleIcon } from '@primer/octicons-react'
import Input from '@material-ui/core/Input'
import ImprovementMeasureSkeleton from 'pages/building/improve/components/ImprovementMeasureSkeleton'
import { formatNumber } from 'Utilities'
import ImprovementBarChart from 'pages/building/improve/components/ImprovementBarChart'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import { useParams } from 'react-router-dom'

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;
  color: var(--bs-primary);
`

const HeaderGroupButton = styled.div`

`

const HeaderButton = styled.a`
  color: var(--bs-primary);
  font-weight: 500;
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
  color: var(--bs-primary);
  margin-right: 2rem;
  width: 55px;

`

const PopupValueWrapper = styled.div`
  width: 250px;
  margin-right: 1rem;
`

const PopupValue = styled.span`
  font-size: 2.75rem;
  color: var(--bs-primary);
  vertical-align: text-top;
`

const MeasureName = styled.span`
  font-size: 1rem;
  font-weight: 500;
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
    color: var(--bs-primary);
  }
`

const Message = styled.div`
  font-size: .9rem;
  color: var(--bs-danger);
  font-weight: 500;
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
    // border: '2px solid currentColor',
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
    label: 'min (0%)',
  },
  {
    value: 100,
    label: 'max (100%)',
  },
]

const valuetext = (value) => {
  return `${value}°%`
}

const ImprovementMeasurePopup = ({ data, show, handleClose }) => {
  const { id } = useParams()
  const { t, i18n } = useTranslation('improvement')
  const calculateIRRValue = (firstValue, secondValue, loopTime = 20) => {
    const IRRvalues = new Array(loopTime - 1)
    for (let i = 0; i < IRRvalues.length; i++) {
      IRRvalues[i] = secondValue
    }

    let internalRateOfReturn = IRR([firstValue, ...IRRvalues])
    if (internalRateOfReturn !== '#NUM!') {
      internalRateOfReturn = +(internalRateOfReturn.toFixed(2) * 100)
    }
    return internalRateOfReturn
  }
  const [isChanged, setIsChanged] = useState(false)

  const { icon, measures } = data

  const [showSlider, setShowSlider] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [detailValue, setDetailValue] = useState(data.usagePercent)

  const [value, setValue] = React.useState(0)
  const [barChartvalue, setBarChartValue] = React.useState(null)
  let [zeroPercentChartValue, setZeroPercentChartValue] = React.useState(null)
  const [oneHundredPercentChartValue, setOneHundredPercentChartValue] = React.useState(null)

  //const [newAnnualLightingSystemEnergyConsumption, setNewAnnualLightingSystemEnergyConsumption] = useState()

  const { user } = useAuth()

  const getImproveFormulasAPI = async (buildingId, percentReplacement) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)
    const newAnnualLightingSystemEnergyConsumption = await getNewAnnualLightingSystemEnergyConsumption(buildingId,
      percentReplacement, idToken)
    const annualEnergySavings = await getAnnualEnergySavings(buildingId, percentReplacement, idToken)
    const annualEnergyCostSavings = await getAnnualEnergyCostSavings(buildingId, percentReplacement, idToken)
    const annualCarbonEmissionsAvoided = await getAnnualCarbonEmissionsAvoided(buildingId, percentReplacement, idToken)
    const costOfImprovement = await getCostOfImprovement(buildingId, percentReplacement, idToken)
    const payback = await getPayback(buildingId, percentReplacement, idToken)

    return {
      newAnnualLightingSystemEnergyConsumption: newAnnualLightingSystemEnergyConsumption,
      annualEnergySavings: annualEnergySavings,
      annualCarbonEmissionsAvoided: annualCarbonEmissionsAvoided,
      costOfImprovement: costOfImprovement,
      annualEnergyCostSavings: annualEnergyCostSavings,
      payback: payback,
    }
  }

  const getImproveFormulasAPIFor0Percent = async (buildingId) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)
    const newAnnualLightingSystemEnergyConsumption = await getNewAnnualLightingSystemEnergyConsumption(buildingId,
      0, idToken)
    const annualEnergySavings = await getAnnualEnergySavings(buildingId, 0, idToken)
    const annualEnergyCostSavings = await getAnnualEnergyCostSavings(buildingId, 0, idToken)
    const annualCarbonEmissionsAvoided = await getAnnualCarbonEmissionsAvoided(buildingId, 0, idToken)
    const costOfImprovement = await getCostOfImprovement(buildingId, 0, idToken)
    const payback = await getPayback(buildingId, 0, idToken)

    const investmentCost = +(costOfImprovement.toFixed(2))//(60000 * value / 100) // => change
    const energyCostSavings = +(annualEnergyCostSavings.toFixed(2)) //(32167 * value / 100)
    return {
      energySavings: +(annualEnergySavings).toFixed(2),
      investmentCost: investmentCost,
      energyCostSavings: energyCostSavings,
      co2EmissionsAvoided: +(annualCarbonEmissionsAvoided).toFixed(2), //108.3 * value / 100,
      paybackPeriod: +payback.toFixed(2),//value > 0 ? +(investmentCost / -energyCostSavings).toFixed(2) : 0,
      internalRateOfReturn: +(calculateIRRValue(-investmentCost, Math.abs(energyCostSavings), 20)),
      newAnnualLightingSystemEnergyConsumption: +(newAnnualLightingSystemEnergyConsumption).toFixed(2),
    }
  }
  const getImproveFormulasAPIFor100Percent = async (buildingId) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)
    const newAnnualLightingSystemEnergyConsumption = await getNewAnnualLightingSystemEnergyConsumption(buildingId,
      100, idToken)
    const annualEnergySavings = await getAnnualEnergySavings(buildingId, 100, idToken)
    const annualEnergyCostSavings = await getAnnualEnergyCostSavings(buildingId, 100, idToken)
    const annualCarbonEmissionsAvoided = await getAnnualCarbonEmissionsAvoided(buildingId, 100, idToken)
    const costOfImprovement = await getCostOfImprovement(buildingId, 100, idToken)
    const payback = await getPayback(buildingId, 100, idToken)

    const investmentCost = +(costOfImprovement.toFixed(2))//(60000 * value / 100) // => change
    const energyCostSavings = +(annualEnergyCostSavings.toFixed(2)) //(32167 * value / 100)
    return {
      energySavings: +(annualEnergySavings).toFixed(2),
      investmentCost: investmentCost,
      energyCostSavings: energyCostSavings,
      co2EmissionsAvoided: +(annualCarbonEmissionsAvoided).toFixed(2), //108.3 * value / 100,
      paybackPeriod: +payback.toFixed(2),//value > 0 ? +(investmentCost / -energyCostSavings).toFixed(2) : 0,
      internalRateOfReturn: +(calculateIRRValue(-investmentCost, Math.abs(energyCostSavings), 20)),
      newAnnualLightingSystemEnergyConsumption: +(newAnnualLightingSystemEnergyConsumption).toFixed(2),
    }
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const saveHandle = async () => {
    setIsLoading(true)
    getImproveFormulasAPI(id, value).then(r => {
      const investmentCost = +(r.costOfImprovement.toFixed(2))//(60000 * value / 100) // => change
      const energyCostSavings = +(r.annualEnergyCostSavings.toFixed(2)) //(32167 * value / 100)
      const tmp = {
        energySavings: +(r.annualEnergySavings).toFixed(2), //123.8 * value / 100,
        investmentCost: investmentCost,
        energyCostSavings: energyCostSavings,
        co2EmissionsAvoided: +(r.annualCarbonEmissionsAvoided).toFixed(2), //108.3 * value / 100,
        paybackPeriod: +r.payback.toFixed(2),//value > 0 ? +(investmentCost / -energyCostSavings).toFixed(2) : 0,
        internalRateOfReturn: value > 0 ? +(calculateIRRValue(-investmentCost, Math.abs(energyCostSavings), 20)).toFixed(
          2) : 0,
        usagePercent: value,
        newAnnualLightingSystemEnergyConsumption: +(r.newAnnualLightingSystemEnergyConsumption).toFixed(2),
        measures: measures,
      }
      const chartValue = {
        energySavings: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue?.energySavings?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.energySavings?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.energySavings?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue?.energySavings.toFixed(2),
          },
        ],
        investmentCost: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue.investmentCost?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.investmentCost?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.investmentCost?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue?.investmentCost?.toFixed(2),
          },
        ],
        energyCostSavings: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue?.energyCostSavings?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.energyCostSavings?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.energyCostSavings?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue?.energyCostSavings?.toFixed(2),
          },
        ],
        co2EmissionsAvoided: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue.co2EmissionsAvoided?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.co2EmissionsAvoided?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.co2EmissionsAvoided?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue.co2EmissionsAvoided?.toFixed(2),
          },
        ],
        paybackPeriod: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue.paybackPeriod?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.paybackPeriod?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.paybackPeriod?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue.paybackPeriod?.toFixed(2),
          },
        ],
        internalRateOfReturn: [
          {
            name: 'min(0%)',
            value: +zeroPercentChartValue.internalRateOfReturn?.toFixed(2),
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: +detailValue.internalRateOfReturn?.toFixed(2),
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: +tmp.internalRateOfReturn?.toFixed(2),
          },
          {
            name: 'max(100%)',
            value: +oneHundredPercentChartValue.internalRateOfReturn?.toFixed(2),
          },
        ],
        newAnnualLightingSystemEnergyConsumption: [
          {
            name: 'min(0%)',
            value: zeroPercentChartValue.newAnnualLightingSystemEnergyConsumption / 1000,
          },
          {
            name: 'before(' + detailValue.usagePercent + '%)',
            value: detailValue.newAnnualLightingSystemEnergyConsumption / 1000,
          },
          {
            name: 'after(' + tmp.usagePercent + '%)',
            value: tmp.newAnnualLightingSystemEnergyConsumption / 1000,
          },
          {
            name: 'max(100%)',
            value: oneHundredPercentChartValue.newAnnualLightingSystemEnergyConsumption / 1000,
          },
        ],
      }

      setBarChartValue(chartValue)

      setDetailValue({
        ...detailValue,
        ...tmp,
      })

      setIsLoading(false)
    })
    setIsChanged(true)
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

  const [saveText, setSaveText] = useState(t('Save'))
  const [editText, setEditText] = useState(t('Edit'))

  useEffect(() => {
    setDetailValue({
      investmentCost: data.investmentCost,
      energyCostSavings: data.energyCostSavings,
      energySavings: data.energySavings,
      paybackPeriod: data.paybackPeriod,
      co2EmissionsAvoided: data.co2EmissionsAvoided,
      internalRateOfReturn: calculateIRRValue(-data.investmentCost, Math.abs(data.energyCostSavings), 20),
      usagePercent: data.usagePercent,
    })

    setValue(data.usagePercent)
    setIsChanged(false)
    setShowSlider(false)
    setBarChartValue(null)
  }, [data])

  useEffect(() => {
    setSaveText(t('Save'))
    setEditText(t('Edit'))
  }, [i18n.language])

  useEffect(() => {
    if (zeroPercentChartValue === null) {
      setIsLoading(true)
      getImproveFormulasAPIFor0Percent(id).then(r => {
        setZeroPercentChartValue(r)
        setIsLoading(false)
      })
    }
    if (oneHundredPercentChartValue === null) {
      setIsLoading(true)
      getImproveFormulasAPIFor100Percent(id).then(r => {
        setOneHundredPercentChartValue(r)
        setIsLoading(false)
      })
    }
    setIsChanged(false)
    setShowSlider(false)

  }, [])

  return (
    <Modal show={show} onHide={handleClose} size="xl">

      <Modal.Header>
        <Container className="mt-0">
          <div className="d-flex justify-content-between align-items-center">
            <PopupTitle>{t('Improvement Measures')}</PopupTitle>
            <HeaderGroupButton>
              <HeaderButton
                className="me-4" onClick={() => {
                if (showSlider === false) {
                  setValue(data.usagePercent)
                  setShowSlider(true)
                } else {
                  saveHandle()
                }
              }}
              >
                {(zeroPercentChartValue && oneHundredPercentChartValue) &&
                  <><LinkExternalIcon size={16} className="me-1"/><span>{showSlider ? saveText : editText}</span></>}
              </HeaderButton>
              <HeaderButton className="" onClick={() => { handleClose(isChanged, detailValue) }}>
                <XCircleIcon size={16} className="me-1"/><span>{t('Close')}</span>
              </HeaderButton>
            </HeaderGroupButton>
          </div>

          <div className="d-flex">
            <PopupIcon src={icon} alt={measures}/>
            <PopupValueWrapper className="d-flex flex-column justify-content-start align-items-start">
              <PopupValue>{value}%</PopupValue>
              <MeasureName>{t(measures)}</MeasureName>
            </PopupValueWrapper>
            {showSlider && <RangeWrapper className="d-flex justify-content-between w-100  align-items-center" show={true}>
              <PrettoSlider
                className="me-4"
                marks={marks}
                valueLabelDisplay="auto"
                aria-label="replacement slider"
                defaultValue={value}
                getAriaValueText={valuetext}
                onChange={handleSliderChange}
                value={value}
                step={1}
              />
              <div style={{ width: '200px' }} className="d-flex flex-column align-items-center justify-content-center">
                <Input
                  className="ms-2"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={value}
                  style={{ width: '50px' }}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
                <Message className="d-flex justify-content-end mt-2">
                  <span>{'0 <='} {t('Value')} {'<= 100'}</span>
                </Message>
              </div>
            </RangeWrapper> }
          </div>

        </Container>
      </Modal.Header>

      <Modal.Body>
        <PopupBodyInnerWrapper className="container my-2">
          {isLoading ? <>
            <ImprovementMeasureSkeleton/>
          </> : <>
            <Row>
              <Col xs={8} sm={4} className="col">{t('Annual Energy Savings')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(detailValue.energySavings)} MWh</Col>
              <Col xs={8} sm={4} className="col">{t('Investment Cost')}</Col>
              <Col xs={4} sm={2} className="col col-value">${formatNumber(detailValue.investmentCost)}</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">{t('Annual Energy Cost Savings')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(detailValue.energyCostSavings)} {t('$')}/ {t(
                'Yr')}</Col>
              <Col xs={8} sm={4} className="col">{t('Simple Payback')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(detailValue.paybackPeriod)} {t('Yr')}</Col>
            </Row>
            <Row>
              <Col xs={8} sm={4} className="col">{t('Annual CO2 Emissions Avoided')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(detailValue.co2EmissionsAvoided)} {t(
                'Tons/Yr')}</Col>
              <Col xs={8} sm={4} className="col">{t('Internal Rate of Return')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(detailValue.internalRateOfReturn)} %</Col>
            </Row>

            <Row>
              <Col xs={8} sm={4} className="col">{t('Annual Lighting System Energy Consumption')}</Col>
              <Col xs={4} sm={2} className="col col-value">{formatNumber(
                detailValue.newAnnualLightingSystemEnergyConsumption)} {t(
                '(kWh)')}</Col>
            </Row>
            {barChartvalue && <>
              <Row>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.energySavings} title="Energy Savings" unit="MWh"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.investmentCost} title="Investment Cost" unit="$"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.energyCostSavings} title="Energy Cost Savings" unit="$"/>
                </Col>
              </Row>
              <Row>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.co2EmissionsAvoided} title="CO2 Emissions Avoided"
                                       unit="Tons/Yr"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.paybackPeriod} title="Payback" unit="Yr"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.internalRateOfReturn} title="Internal Rate Of Return" unit="%"/>
                </Col>
              </Row>
              <Row>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartvalue.newAnnualLightingSystemEnergyConsumption}
                                       title="Annual Lighting SystemEnergy Consumption" unit="MWh"/>
                </Col>
              </Row>
            </>}
          </>}
        </PopupBodyInnerWrapper>
      </Modal.Body>
    </Modal>
  )

}

export default ImprovementMeasurePopup