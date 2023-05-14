/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { calculateIRRValue } from 'IRR'
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
import {Input, Slider} from '@mui/material'
import ImprovementMeasureSkeleton from 'pages/building/improve/components/ImprovementMeasureSkeleton'
import { deepClone, formatNumber } from 'Utilities'
import ImprovementBarChart from 'pages/building/improve/components/ImprovementBarChart'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import ImprovementRaidalBarChart from 'pages/building/improve/components/ImprovementRaidalBarChart'
import { EuiFieldNumber, EuiDatePicker, EuiFormRow, EuiSelect } from '@elastic/eui'
import moment from 'moment'
import _ from 'lodash'
import { getLightingSystemByBuildingId } from 'api/LightingAPI'
import SubLightingSystem from 'pages/building/improve/components/SubLightingSystem'

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

const MeasureNumber = styled.span`
  font-size: 1rem;
  font-weight: 400;
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

const SubLightingSystemList = styled.ul`
  display: flex;
  justify-content: flex-start;

  flex-wrap: wrap;
  li {
    margin-right: 15px;
  }
`

const Message = styled.div`
  font-size: .9rem;
  color: var(--bs-danger);
  font-weight: 500;
`

// const PrettoSlider = withStyles({
//   root: {
//     color: '#87972f',
//     height: 6,
//   },
//   thumb: {
//     height: 20,
//     width: 20,
//     backgroundColor: '#87972f',
//     // border: '2px solid currentColor',
//     marginTop: -7,
//     marginLeft: -10,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 3px)',
//   },
//   track: {
//     height: 6,
//     borderRadius: 3,
//   },
//   rail: {
//     height: 6,
//     borderRadius: 3,
//   },
// })(Slider)

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

  const [isChanged, setIsChanged] = useState(false)

  const { icon, measures } = data

  const [showSlider, setShowSlider] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [detailValue, setDetailValue] = useState()

  const [value, setValue] = React.useState(0)

  const [barChartValue, setBarChartValue] = React.useState(null)

  const [costRadialBarChartValue, setCostRadialBarChartValue] = React.useState(null)
  const [energySavingRadialBarChartValue, setEnergySavingRadialBarChartValue] = React.useState(null)
  const [co2EmissionsAvoidRadialBarChartValue, setCO2EmissionsAvoidRadialBarChartValue] = React.useState(null)
  const [newAnnualLightingSystemEnergyConsumptionRadialBarChartValue, setNewAnnualLightingSystemEnergyConsumptionRadialBarChartValue] = React.useState(
    null)
  const [oneHundredPercentChartValue, setOneHundredPercentChartValue] = React.useState(null)
  const [lightingSystemInfo, setLightingSystemInfo] = useState(null)
  const [numberOfLEDBulbs, setNumberOfLEDBulbs] = useState(null)
  const [lumensOfBulb, setLumensOfBulb] = useState(null)
  const [wattRatingOfBulb, setWattRatingOfBulb] = useState(null)


  //const [newAnnualLightingSystemEnergyConsumption, setNewAnnualLightingSystemEnergyConsumption] = useState()

  const { user } = useAuth()

  const getCurrentLightingSybSystem = (lightingSystem) => {
    const LEDdata = _.filter(lightingSystem, {lightingFittingTypeId: 1})
    let _numberOfLEDBulbs =  0;
    let _lumensOfBulb =  0;
    let _wattRatingOfBulb =  0;
    for(let item of LEDdata) {
      _numberOfLEDBulbs += item.numberOfBulbs
      _lumensOfBulb += item.lumensOfBulb
      _wattRatingOfBulb += item.wattRatingOfBulb
    }
    setLumensOfBulb(_lumensOfBulb)
    setNumberOfLEDBulbs(_numberOfLEDBulbs)
    setWattRatingOfBulb(_wattRatingOfBulb)
  }

  const getLightingSystemInfo = async (buildingId) => {
    const idToken = await user.getIdToken()
    return await getLightingSystemByBuildingId(buildingId, idToken)
  }

  const getAnnualLightingSystemEnergyConsumptionAPI = async (buildingId, percentReplacement) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)
    const _startDate =  moment(startDate).format('YYYY-MM-DD')

    return await getNewAnnualLightingSystemEnergyConsumption(buildingId, percentReplacement, period, _startDate, idToken)
  }

  const getImproveFormulasAPI = async (buildingId, percentReplacement) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)
    const _startDate =  moment(startDate).format('YYYY-MM-DD')
    const newAnnualLightingSystemEnergyConsumption = await getNewAnnualLightingSystemEnergyConsumption(buildingId,
      percentReplacement, period, startDate, idToken)
    const annualEnergySavings = await getAnnualEnergySavings(buildingId, percentReplacement, period, _startDate, idToken)
    const annualEnergyCostSavings = await getAnnualEnergyCostSavings(buildingId, 0,
      percentReplacement, period, _startDate, idToken)
    const annualCarbonEmissionsAvoided = await getAnnualCarbonEmissionsAvoided(buildingId, percentReplacement, period, _startDate, idToken)
    const costOfImprovement = await getCostOfImprovement(buildingId, percentReplacement, idToken)
    const payback = await getPayback(buildingId, percentReplacement, period, _startDate, idToken)

    return {
      newAnnualLightingSystemEnergyConsumption: newAnnualLightingSystemEnergyConsumption,
      annualEnergySavings: annualEnergySavings,
      annualCarbonEmissionsAvoided: annualCarbonEmissionsAvoided,
      costOfImprovement: costOfImprovement,
      annualEnergyCostSavings: annualEnergyCostSavings,
      payback: payback,
    }
  }

  const getImproveFormulasAPIFor100Percent = async (buildingId, lightingSystem) => {
    const idToken = await user.getIdToken()
    // trackingUser(user.uid, 'AssetReliability', idToken)

    if (lightingSystem === null) {
      lightingSystem = lightingSystemInfo
    }
    const _startDate =  moment(startDate).format('YYYY-MM-DD')
    const newAnnualLightingSystemEnergyConsumption = await getNewAnnualLightingSystemEnergyConsumption(buildingId,
      100, period, _startDate, idToken)
    const annualEnergySavings = await getAnnualEnergySavings(buildingId, 100, period, _startDate, lightingSystem, idToken)
    const annualEnergyCostSavings = await getAnnualEnergyCostSavings(buildingId, 100, period, _startDate, idToken)
    const annualCarbonEmissionsAvoided = await getAnnualCarbonEmissionsAvoided(buildingId, 100, period, _startDate, idToken)
    const costOfImprovement = await getCostOfImprovement(buildingId, 100, idToken)
    const payback = await getPayback(buildingId, 100, period, _startDate, idToken)

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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue?.energySavings?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue.investmentCost?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue?.energyCostSavings?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue.co2EmissionsAvoided?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue.paybackPeriod?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: +zeroPercentChartValue.internalRateOfReturn?.toFixed(2),
          // },
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
          // {
          //   name: 'min(0%)',
          //   value: zeroPercentChartValue.newAnnualLightingSystemEnergyConsumption / 1000,
          // },
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

      const costRadialChartValue = [
        {
          id: 'Investment Cost ($)',
          data: [
            {
              x: 'Before (' + detailValue.usagePercent + '%)',
              y: +detailValue.investmentCost?.toFixed(2),
            },
            {
              x: 'After (' + tmp.usagePercent + '%)',
              y: +tmp.investmentCost?.toFixed(2),
            },
            {
              x: 'Max (100%)',
              y: +oneHundredPercentChartValue?.investmentCost?.toFixed(2),
            },
          ],
        },
        {
          id: 'Energy Cost Savings',
          data: [
            {
              x: 'Before (' + detailValue.usagePercent + '%)',
              y: +detailValue.energyCostSavings?.toFixed(2),
            },
            {
              x: 'After (' + tmp.usagePercent + '%)',
              y: +tmp.energyCostSavings?.toFixed(2),
            },
            {
              x: 'Max (100%)',
              y: +oneHundredPercentChartValue?.energyCostSavings?.toFixed(2),
            },
          ],
        },
      ]

      const energySavingRadialChartValue = [
        {
          id: 'Energy Savings (MWh)',
          data: [
            {
              x: 'Before (' + detailValue.usagePercent + '%)',
              y: +detailValue.energySavings?.toFixed(2),
            },
            {
              x: 'After (' + tmp.usagePercent + '%)',
              y: +tmp.energySavings?.toFixed(2),
            },
            {
              x: 'Max (100%)',
              y: +oneHundredPercentChartValue?.energySavings?.toFixed(2),
            },
          ],
        },
      ]

      const co2EmissionsAvoidRadialChartValue = [
        {
          id: 'CO2 Emissions Avoided (Ton/Yr)',
          data: [
            {
              x: 'Before (' + detailValue.usagePercent + '%)',
              y: detailValue.co2EmissionsAvoided * 1000,
            },
            {
              x: 'After (' + tmp.usagePercent + '%)',
              y: tmp.co2EmissionsAvoided * 1000,
            },
            {
              x: 'Max (100%)',
              y: oneHundredPercentChartValue?.co2EmissionsAvoided * 1000,
            },
          ],
        },
      ]
      const annualLightingSystemEnergyConsumptionRadialChartValue = [
        {
          id: 'Annual Lighting System Energy Consumption (MWh)',
          data: [
            {
              x: 'Before (' + detailValue.usagePercent + '%)',
              y: +detailValue.newAnnualLightingSystemEnergyConsumption.toFixed(2),
            },
            {
              x: 'After (' + tmp.usagePercent + '%)',
              y: +tmp.newAnnualLightingSystemEnergyConsumption.toFixed(2),
            },
            {
              x: 'Max (100%)',
              y: +oneHundredPercentChartValue?.newAnnualLightingSystemEnergyConsumption.toFixed(2),
            },
          ],
        },
      ]

      setCostRadialBarChartValue(costRadialChartValue)
      setEnergySavingRadialBarChartValue(energySavingRadialChartValue)
      setCO2EmissionsAvoidRadialBarChartValue(co2EmissionsAvoidRadialChartValue)
      setNewAnnualLightingSystemEnergyConsumptionRadialBarChartValue(annualLightingSystemEnergyConsumptionRadialChartValue)

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
  const [period, setPeriod] = useState(1)
  const [startDate, setStartDate] = useState(moment(new Date('2020-01-01')))

  useEffect(() => {
    if (data !== {}) {
      getAnnualLightingSystemEnergyConsumptionAPI(id, data.usagePercent).then(r => {
        setDetailValue({
          investmentCost: data.investmentCost,
          energyCostSavings: data.energyCostSavings,
          energySavings: data.energySavings,
          paybackPeriod: data.paybackPeriod,
          co2EmissionsAvoided: data.co2EmissionsAvoided,
          internalRateOfReturn: calculateIRRValue(-data.investmentCost, Math.abs(data.energyCostSavings), 20),
          usagePercent: data.usagePercent,
          oldUsagePercent: data.usagePercent,
          newAnnualLightingSystemEnergyConsumption: +r.toFixed(2),
        })
        setValue(data.usagePercent)
        //setIsLoading(false)
      })
    }
  }, [data])

  useEffect(() => {
    setSaveText(t('Save'))
    setEditText(t('Edit'))
  }, [i18n.language])

  useEffect(() => {

    if(!lightingSystemInfo) {
      getLightingSystemInfo(id).then(r => {
        setLightingSystemInfo(r)
        getCurrentLightingSybSystem(r)
        if (oneHundredPercentChartValue === null) {
          setIsLoading(true)
          getImproveFormulasAPIFor100Percent(id, r).then(d => {
            setOneHundredPercentChartValue(d)
            setIsLoading(false)
          })
        }
      })
    }

  }, [])

  useEffect(() => {
    // console.log(lightingSystemInfo)
    if(lightingSystemInfo) {
      const _totalOfBulbs = _.sumBy(lightingSystemInfo, 'numberOfBulbs')
      const _totalOfNonLEDBubls = _.sumBy(lightingSystemInfo, (item) => {
        //console.log(item.numberOfBulbs)
        if (item.lightingFittingTypeId !== 1) {
          return item.numberOfBulbs
        }
        return 0
      })

      const tmp = _.orderBy(deepClone(lightingSystemInfo), ['lightingFittingTypeId'], ['desc'])

      //console.log(_numberOfLEDBulbs)
      // console.log('_totalOfNonLEDBubls')
      // console.log(_totalOfNonLEDBubls)
      // console.log('_totalOfBulbs')
      // console.log(_totalOfBulbs)
      // console.log(_newNumberOfLEDBulbs)
      // const _newNumberOfLEDBulbs = Math.ceil((_totalOfNonLEDBubls * value) / 100)
      let _newNumberOfLEDBulbs = 0

      for (let item of tmp) {
        if (item.lightingFittingTypeId !== 1) {
          item.percentage = (item.numberOfBulbs / _totalOfNonLEDBubls)
          const takeAwayBulbs = Math.ceil((item.numberOfBulbs * value) / 100)
          item.takeAwayBulbs = takeAwayBulbs
          item.addNewBulbs = 0
          item.percentageOfFittingTypeUsed = +(((item.numberOfBulbs - takeAwayBulbs) * 100) / _totalOfBulbs).toFixed(2)
          _newNumberOfLEDBulbs += takeAwayBulbs
        } else {
          item.addNewBulbs =  (_newNumberOfLEDBulbs)
          item.takeAwayBulbs = 0
          item.percentageOfFittingTypeUsed = +(((item.numberOfBulbs + item.addNewBulbs) * 100) / _totalOfBulbs).toFixed(2)
          item.wattRatingOfBulb = wattRatingOfBulb
          item.lumensOfBulb = lumensOfBulb
        }
      }

      // const totalEfficacy = +(_.sumBy(tmp, (item) => {
      //     if(item.lumensOfBulb > 0) {
      //       return item.wattRatingOfBulb / item.lumensOfBulb
      //     }
      //   return 0
      // }).toFixed(2))

      setNumberOfLEDBulbs(Math.round(_newNumberOfLEDBulbs))
      setLightingSystemInfo(_.sortBy(tmp, 'lightingFittingTypeId'))
    }
  }, [value, lumensOfBulb, wattRatingOfBulb])

  const subLightingSystemRows= lightingSystemInfo?.map((item) => {
    return <li className="mb-3">
      <SubLightingSystem data={item}/>
    </li>
  })


  return (
    <Modal show={show} onHide={handleClose} size="xl">

      <Modal.Header>
        <Container className="mt-0">
          <div className="d-flex justify-content-between align-items-center">
            <PopupTitle>{t('Improvement Measures')}</PopupTitle>
            <HeaderGroupButton>
              {!isLoading &&
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
                  <LinkExternalIcon size={16} className="me-1"/><span>{showSlider ? saveText : editText}</span>
                </HeaderButton>
              }
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
              <MeasureNumber>Number of adding new LED: {numberOfLEDBulbs}</MeasureNumber>
            </PopupValueWrapper>
            <RangeWrapper className="d-flex justify-content-between w-100  align-items-center" show={showSlider}>
              <Slider
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
            </RangeWrapper>
          </div>

          <div className="d-flex mt-3">
            <EuiFormRow label="Select period">
              <EuiSelect
                options={[
                  { value: 1, text: '1 Year' },
                  { value: 2, text: '2 Years' },
                ]}
                value={period}
                onChange={(e) => { setPeriod(e.target.value)}}
              />
            </EuiFormRow>

            <EuiFormRow label="Select Start Date" className="mt-0 ms-3">
              <EuiDatePicker selected={startDate} onChange={(date) => {
                setStartDate(date)
              }}/>
            </EuiFormRow>
            {/*<EuiFormRow label="Number Of LED Bulbs" className="mt-0 ms-3">*/}
            {/*  <EuiFieldNumber*/}
            {/*    placeholder="Number Of LED Bulbs"*/}
            {/*    aria-label="Number Of LED Bulbs"*/}
            {/*    value={numberOfLEDBulbs}*/}
            {/*    readOnly*/}
            {/*  />*/}
            {/*</EuiFormRow>*/}
            <EuiFormRow label="Watt Rating of Bulb" className="mt-0 ms-3">
              <EuiFieldNumber
                placeholder="Watt Rating of Bulb"
                aria-label="Watt Ratting Of Bulbs"
                value={wattRatingOfBulb}
                onChange={(e) => {
                  setWattRatingOfBulb(e.target.value)
                }}
              />
            </EuiFormRow>
            <EuiFormRow label="Lumens of Bulb (lm)" className="mt-0 ms-3">
              <EuiFieldNumber
                placeholder="Lumens of Bulb (lm)"
                aria-label="Lumens of Bulb (lm)"
                value={lumensOfBulb}
                onChange={(e) => {
                  setLumensOfBulb(e.target.value)
                }}
              />
            </EuiFormRow>
            <EuiFormRow label="Cost of Each Bulb ($)" className="mt-0 ms-3">
              <EuiFieldNumber
                placeholder="Cost of Each Bulb ($)"
                aria-label="Cost of Each Bulb ($)"
              />
            </EuiFormRow>
            {/*<EuiFormRow className="mt-4 ms-3" label="">*/}
            {/*  <EuiButton color="primary" size="m">Apply</EuiButton>*/}
            {/*</EuiFormRow>*/}
          </div>
          <SubLightingSystemList className="d-flex mt-4">
            {subLightingSystemRows}
          </SubLightingSystemList>

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
              <Col xs={4} sm={2} className="col col-value">
                {formatNumber(detailValue.newAnnualLightingSystemEnergyConsumption)} {t('(kWh)')}
              </Col>
            </Row>
            {barChartValue && <>
              <Row>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.energySavings} title="Energy Savings" unit="MWh"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.investmentCost} title="Investment Cost" unit="$"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.energyCostSavings} title="Energy Cost Savings" unit="$"/>
                </Col>
              </Row>
              <Row>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.co2EmissionsAvoided} title="CO2 Emissions Avoided"
                                       unit="Tons/Yr"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.paybackPeriod} title="Payback" unit="Yr"/>
                </Col>
                <Col md={8} xl={4} className="col">
                  <ImprovementBarChart data={barChartValue.newAnnualLightingSystemEnergyConsumption}
                                       title="Annual Lighting System Energy Consumption" unit="MWh"/>
                </Col>

              </Row>
              {/*<Row>*/}
              {/*  <Col md={8} xl={4} className="col">*/}
              {/*    <ImprovementBarChart data={barChartvalue.internalRateOfReturn} title="Internal Rate Of Return" unit="%"/>*/}
              {/*  </Col>*/}
              {/*</Row>*/}
              <Row>
                <ImprovementRaidalBarChart data={costRadialBarChartValue} title="Cost Saving"/>
                <ImprovementRaidalBarChart data={energySavingRadialBarChartValue} title="Energy Saving"/>
                <ImprovementRaidalBarChart data={co2EmissionsAvoidRadialBarChartValue} title="C02 Emissions Avoid"/>
                <ImprovementRaidalBarChart data={newAnnualLightingSystemEnergyConsumptionRadialBarChartValue}
                                           title="Annual Lighting System Energy Consumption"/>
              </Row>
            </>}
          </>}
        </PopupBodyInnerWrapper>
      </Modal.Body>
    </Modal>
  )

}

export default ImprovementMeasurePopup