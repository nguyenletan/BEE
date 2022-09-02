/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { sortBy } from 'lodash'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { LinkExternalIcon, XCircleIcon } from '@primer/octicons-react'
import { EuiText } from '@elastic/eui'
import { differenceInCalendarWeeks } from 'date-fns'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { formatNumber } from 'Utilities'
import { getNewAnnualLightingSystemEnergyConsumption } from 'api/ImproveAPI'
import ImprovementMeasureSkeleton from 'pages/building/improve/components/ImprovementMeasureSkeleton'
import { getLightingSystemByBuildingId } from 'api/LightingAPI'

import LightingSubSystem from 'pages/building/improve/components/LightingSubSystem'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  getTotalInvestmentCost,
  getTotalIRR,
  getTotalPercentageOfLEDReplacement,
  getTotalSimplePayback,
  getTotalValueAnnualEnergySavings,
  totalAnnualSavingState,
} from 'atoms'
import { updateLightingSystemImprovement } from 'api/LightingImproveAPI'

const PopupTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;

`

const HeaderGroupButton = styled.div`

`

const PopupIcon = styled.img`
  color: var(--bs-primary);
  margin-right: 2rem;
  width: 40px;

`

const PopupValueWrapper = styled.div`
  width: 150px;
  margin-right: 1rem;
`

const LI = styled.li`
  width: 340px;
  list-style-type: none;
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

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 20px;

  span {
    margin-bottom: 1rem;
    line-height: 1.25rem;

    strong {
      line-height: 1.25rem;
    }
  }
`

const BodyTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 1rem;
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

const LightingImprovementMeasurePopup = ({ data, show, handleClose }) => {

  const { id } = useParams()
  const { t } = useTranslation('improvement')
  const [lightingSystemInfo, setLightingSystemInfo] = useState(null)
  // eslint-disable-next-line
  const [isChanged, setIsChanged] = useState(false)
  const { icon, measures } = data
  // eslint-disable-next-line
  const [value, setValue] = React.useState(0)
  const [isLoading, setIsLoading] = useState(true)
  //const [detailValue, setDetailValue] = useState()

  const valueAnnualEnergySavingsSelector = useRecoilValue(getTotalValueAnnualEnergySavings)
  const getTotalInvestmentCostSelector = useRecoilValue(getTotalInvestmentCost)
  const getTotalSimplePaybackSelector = useRecoilValue(getTotalSimplePayback)
  const getTotalIRRSelector = useRecoilValue(getTotalIRR)
  const getTotalPercentageOfLEDReplacementSelector = useRecoilValue(getTotalPercentageOfLEDReplacement)
  const [totalAnnualSaving, setAnnualEnergySavingsState] = useRecoilState(totalAnnualSavingState)

  const { user } = useAuth()

  useEffect(() => {
    if (data !== {}) {
      getLightingSystemInfo(id).then(r => {

        //console.log(totalAnnualSavingState)
        if (totalAnnualSaving === []) {
          let temp = []
          for (let i = 0; i < r.length; i++) {
            temp.push({
              id: r[i].id,
              energySavings: 0,
              costSavings: 0,
              emissionsAvoided: 0,
              investmentCost: 0,
              simplePayback: 0,
              IRR: 0,
              percentageOfLEDReplacement: 0,
            })

          }
          setAnnualEnergySavingsState(temp)
        }

        setLightingSystemInfo(sortBy(r, 'title'))
        getAnnualLightingSystemEnergyConsumptionAPI(id, data.usagePercent).then(r => {
          setIsLoading(false)
        })
      })
    }
  }, [data])

  const getAnnualLightingSystemEnergyConsumptionAPI = async (buildingId, percentReplacement) => {
    const idToken = await user.getIdToken()
    return await getNewAnnualLightingSystemEnergyConsumption(buildingId, percentReplacement, 1, '2020-01-01', idToken)
  }

  const getLightingSystemInfo = async (buildingId) => {
    const idToken = await user.getIdToken()
    return await getLightingSystemByBuildingId(buildingId, idToken)
  }

  const updateLightingSystemImprove = async (data) => {
    const idToken = await user.getIdToken()
    console.log(user.uid)
    let tmp = data.map(d => { return { userExternalId: user.uid, ...d }})
    console.log('totalAnnualSaving: ', tmp)
    return await updateLightingSystemImprovement(tmp, idToken)
  }

  const subSystemRows = lightingSystemInfo?.map(x => {
    //setAnnualEnergySavingsState([...annualEnergySavingsState, {id: x.id, value: 0}])

    return (
      <LI className="shadow-sm rounded-3 m-2 border border-1 px-2 py-4" key={x.id}>
        <LightingSubSystem subSystem={x} value={value}/>
      </LI>
    )
  })

  const saveHandle = (e) => {
    updateLightingSystemImprove(totalAnnualSaving)

  }

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header>
        <Container className="mt-0">
          <div className="d-flex justify-content-between align-items-center">
            <PopupTitle>{t('Improvement Measures')}</PopupTitle>
            <HeaderGroupButton>
              <HeaderButton className="me-4" onClick={saveHandle}>
                <LinkExternalIcon size={16} className="me-1"/><span>Save</span>
              </HeaderButton>
              <HeaderButton className="" onClick={() => { handleClose(isChanged, {}) }}>
                <XCircleIcon size={16} className="me-1"/><span>{t('Close')}</span>
              </HeaderButton>
            </HeaderGroupButton>
          </div>
          {isLoading
            ? <><ImprovementMeasureSkeleton/></>
            : <div className="d-flex">
              <div className="d-flex my-3">
                <PopupIcon src={icon} alt={measures}/>
                <PopupValueWrapper className="d-flex flex-column justify-content-start align-items-start mt-2 text-center">
                  <PopupValue>{getTotalPercentageOfLEDReplacementSelector}%</PopupValue>
                  <MeasureName>{t(measures)}</MeasureName>
                </PopupValueWrapper>
              </div>
              <div className="d-flex flex-column w-100 my-3">
                <EuiText size="s">
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual Energy Savings')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      valueAnnualEnergySavingsSelector)} kWh</Col>
                    <Col xs={8} sm={4} className="col">{t('Investment Cost')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">${formatNumber(
                      getTotalInvestmentCostSelector)}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual Energy Cost Savings')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      valueAnnualEnergySavingsSelector * 0.023)} {t(
                      '$')}/ {t(
                      'Yr')}</Col>
                    <Col xs={8} sm={4} className="col">{t('Simple Payback')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      getTotalSimplePaybackSelector)} {t(
                      'Yr')}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual CO2 Emissions Avoided')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      valueAnnualEnergySavingsSelector * 0.1)} {t(
                      'Tons/Yr')}</Col>
                    <Col xs={8} sm={4} className="col">{t('Internal Rate of Return')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(getTotalIRRSelector)} %</Col>
                  </Row>
                </EuiText>
              </div>
            </div>}
        </Container>
      </Modal.Header>
      <Modal.Body>
        <PopupBodyInnerWrapper className="container my-2">
          <TitleWrapper><BodyTitle>Existing Lighting</BodyTitle>
            <span><strong>Number of weeks a year: </strong>{
              -differenceInCalendarWeeks(
                new Date(new Date().getFullYear(), 1, 1),
                new Date(new Date().getFullYear(), 12, 31),
              )}</span>
            <span><strong>Tariff Rate ($/kWh): </strong>0.023</span>
            <span><strong>Grid Emission Rate (Tons/kWh): </strong>0.1</span>
          </TitleWrapper>
          <ul className="d-flex flex-wrap align-items-start">
            {subSystemRows}
          </ul>
        </PopupBodyInnerWrapper>
      </Modal.Body>
    </Modal>
  )

}

export default LightingImprovementMeasurePopup