/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { sortBy } from 'lodash'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { XCircleIcon } from '@primer/octicons-react'
import {
  EuiAccordion,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSelect,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { calculateIRRValue, formatNumber } from 'Utilities'
import { getNewAnnualLightingSystemEnergyConsumption } from 'api/ImproveAPI'
import ImprovementMeasureSkeleton from 'pages/building/improve/components/ImprovementMeasureSkeleton'
import { getLightingSystemByBuildingId } from 'api/LightingAPI'
import LightingFittingType, {
  getLightingFittingTypeImage,
  getLightingFittingTypeName,
} from 'reference-tables/LightingFittingType'

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
  width: 50px;

`

const PopupValueWrapper = styled.div`
  width: 150px;
  margin-right: 1rem;
`

const Icon = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 0 15px;
`

const Item = styled.p`
  margin-bottom: 0 !important;
  padding: 0;
  line-height: 1.5rem;
  margin-left: 20px;
  font-size: 0.95rem;
`

const LI = styled.li`
  max-width: 320px;
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
  const [detailValue, setDetailValue] = useState()

  //const [newAnnualLightingSystemEnergyConsumption, setNewAnnualLightingSystemEnergyConsumption] = useState()

  const { user } = useAuth()

  useEffect(() => {
    if (data !== {}) {
      getLightingSystemInfo(id).then(r => {
        setLightingSystemInfo(sortBy(r, 'title'))
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
          //setValue(data.usagePercent)
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

  console.log(lightingSystemInfo)

  const buttonContent = (data) => (
    <div>
      <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <Icon src={getLightingFittingTypeImage(data.lightingFittingTypeId)}/>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="xs">
            <h3>{data.title}</h3>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiText size="s">
        <Item>
          Bulb: <span className="text-primary">{getLightingFittingTypeName(data.lightingFittingTypeId)}</span>
        </Item>
        <Item>
          Number: <span className="text-primary">{data.numberOfBulbs}</span>
        </Item>
        <Item>
          Watt Ratting (W):  <span className="text-primary">{data.wattRatingOfBulb}</span>
        </Item>
        <Item>
          Lumen Rating (lm):  <span className="text-primary">{data.lumensOfBulb}</span>
        </Item>
      </EuiText>
    </div>
  )

  const subSystemRows = lightingSystemInfo?.map(x => (<>
      <LI className="shadow-sm rounded-3 m-3 m-3 border border-1 p-3">
        <EuiAccordion
          id={x.title + '_' + x.id}
          buttonContent={buttonContent(x)}
          paddingSize="m"
        >
          <EuiFormRow label="Replacement Bulb Type" className="mt-4">
            <EuiSelect
              compressed
              options={LightingFittingType.map(t => {
                  if (t.id === x.id) return null
                  return {
                    value: t.id,
                    text: t.name,
                  }
                },
              )}
              value={value}
              aria-label="Use aria labels when no actual label is in use"
            />
          </EuiFormRow>
          <EuiFormRow label="Number Of Bulbs" className="mt-4">
            <EuiFieldNumber
              compressed
              placeholder="Number Of Bulbs"
              aria-label="Number Of Bulbs"
            />
          </EuiFormRow>
          <EuiFormRow label="Watt Rating (W)" className="mt-4">
            <EuiFieldNumber
              compressed
              placeholder="Number Of Bulbs"
              aria-label="Number Of Bulbs"
            />
          </EuiFormRow>
          <EuiFormRow label="Lumens Rating (lm)" className="mt-4">
            <EuiFieldNumber
              compressed
              placeholder="Lumens Rating (lm)"
              aria-label="Lumens Rating (lm)"
            />
          </EuiFormRow>
          <EuiFormRow label="Cost of Each Bulb ($)" className="mt-4">
            <EuiFieldNumber
              compressed
              placeholder="Cost of Each Bulb ($)"
              aria-label="Cost of Each Bulb ($)"
            />
          </EuiFormRow>
        </EuiAccordion>

        <EuiSpacer/>
      </LI>
    </>
  ))

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header>
        <Container className="mt-0">
          <div className="d-flex justify-content-between align-items-center">
            <PopupTitle>{t('Improvement Measures')}</PopupTitle>
            <HeaderGroupButton>
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
                <PopupValueWrapper className="d-flex flex-column justify-content-start align-items-start">
                  <PopupValue>{value}%</PopupValue>
                  <MeasureName>{t(measures)}</MeasureName>
                </PopupValueWrapper>
              </div>
              <div className="d-flex flex-column w-100 my-3">
                <EuiText size="s">
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual Energy Savings')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      detailValue.energySavings)} MWh</Col>
                    <Col xs={8} sm={4} className="col">{t('Investment Cost')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">${formatNumber(
                      detailValue.investmentCost)}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual Energy Cost Savings')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      detailValue.energyCostSavings)} {t(
                      '$')}/ {t(
                      'Yr')}</Col>
                    <Col xs={8} sm={4} className="col">{t('Simple Payback')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(detailValue.paybackPeriod)} {t(
                      'Yr')}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8} sm={4} className="col">{t('Annual CO2 Emissions Avoided')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      detailValue.co2EmissionsAvoided)} {t(
                      'Tons/Yr')}</Col>
                    <Col xs={8} sm={4} className="col">{t('Internal Rate of Return')}</Col>
                    <Col xs={4} sm={2} className="col col-value text-primary">{formatNumber(
                      detailValue.internalRateOfReturn)} %</Col>
                  </Row>
                </EuiText>
              </div>
            </div>}
        </Container>
      </Modal.Header>
      <Modal.Body>
        <PopupBodyInnerWrapper className="container my-2">
          <BodyTitle>Existing Lighting</BodyTitle>
          <ul className="d-flex flex-wrap align-items-start">
            {subSystemRows}
          </ul>
        </PopupBodyInnerWrapper>
      </Modal.Body>
    </Modal>
  )

}

export default LightingImprovementMeasurePopup