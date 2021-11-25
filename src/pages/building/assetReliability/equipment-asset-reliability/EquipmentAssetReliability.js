/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  energyPerformanceEndTimeState,
  energyPerformanceStartTimeState,
  isDisplayPerformanceFilterState,
} from 'atoms'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import AlertChart from 'pages/building/assetReliability/equipment-asset-reliability/components/AlertChart'
import EnergyConsumption from 'pages/building/assetReliability/equipment-asset-reliability/components/EnergyConsumption'
import EnergyConsumptionPercentage from 'pages/building/assetReliability/equipment-asset-reliability/components/EnergyConsumptionPercentage'
import TotalCostBreakDown from 'pages/building/assetReliability/equipment-asset-reliability/components/TotalCostBreakDown'
import { useAuth } from 'AuthenticateProvider'
import { getEquipmentById } from 'api/EquipmentAPI'
import { formatDate, formatNumber, getTheTimeDifference } from 'Utilities'
import MaintenanceCostReplacementValue from 'pages/building/assetReliability/equipment-asset-reliability/components/MaintenanceCostReplacementValue'
import Cost from 'pages/building/assetReliability/equipment-asset-reliability/components/Cost'
import Reliability from 'pages/building/assetReliability/equipment-asset-reliability/components/Reliability'
import Depreciation from 'pages/building/assetReliability/equipment-asset-reliability/components/Depreciation'
import PotentialIssueList from 'pages/building/assetReliability/equipment-asset-reliability/components/PotentialIssueList'
import AssetPartsServiceSourcing from 'pages/building/assetReliability/equipment-asset-reliability/components/AssetPartsServiceSourcing'
import MaintenanceRegime from 'pages/building/assetReliability/equipment-asset-reliability/components/MaintenanceRegime'
import ProjectedPeakDemand from 'pages/building/assetReliability/equipment-asset-reliability/components/ProjectedPeakDemand'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`


const BreadcrumbItem = styled.li`
  line-height: 28px;
  cursor: pointer;
  margin-right: .3rem;
`

const BreadcrumbItemActive = styled.li`
  line-height: 28px;
  font-weight: 700;
  color: var(--bs-primary);
`

const EquipmentDetailWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 45px;
`

const EquipmentDetailContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const EquipmentDetailInformation = styled.div`
  display: grid;
  margin-left: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  font-size: 1rem;
  width: 100%;
`

const EquipmentDetailInformationCol = styled.div`
  display: flex;
  flex-flow: column;
`

const EquipmentDetailInformationRowValue = styled.span`
  color: var(--bs-primary);
  font-size: 1.2rem;
`

const AlertWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 45px;
`

// const Row = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `

const Row2ColsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(700px, 3fr) minmax(218px, 1fr);
  grid-gap: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Row3ColsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 2fr) minmax(150px, 1fr) minmax(150px, 1fr);
  grid-gap: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Row2EqualColsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-gap: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const EquipmentPhoto = styled.img`
  width: 300px;
  border-radius: 20px;
`

const EnergyConsumptionWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 35px;
`

const EnergyConsumptionPercentageWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const TotalCostBreakDownWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const Nav = styled.nav`
  margin-bottom: 50px;

  li {
    text-transform: capitalize;
  }
`
const MaintenanceCostReplacementValueWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const CostWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`
const DepreciationWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const ReliabilityWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const PotentialIssuesListWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const AssetPartsServiceSourcingWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`
const MaintenanceRegimeWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const ProjectedPeakDemandWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`

const EquipmentAssetReliability = () => {
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  const [equipment, setEquipment] = useState()
  setIsDisplayPerformanceFilter(false)
  const { equipmentId } = useParams()
  const history = useHistory()
  const { user } = useAuth()

  const { t } = useTranslation('equipmentAssetReliability')

  const [subSystemName, setSubSystemName] = useState('')

  const startTime = useRecoilValue(energyPerformanceStartTimeState)

  const endTime = useRecoilValue(energyPerformanceEndTimeState)

  const getEquipmentInfo = async () => {

    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getEquipmentById(equipmentId, idToken)
    setEquipment(tmp)

    const _subSystemName = tmp.coolingSystemId
      ? 'Cooling' : tmp.heatingSystemId
        ? 'Heating' : tmp.mechanicalVentilationSystemId
          ? 'Mechanical Ventilation' : ''

    //const _subSystemId = tmp.coolingSystemId || tmp.equipment.heatingSystemId || tmp.equipment.mechanicalVentilationSystemId

    setSubSystemName(_subSystemName)
  }

  useEffect(() => {
    getEquipmentInfo()

  }, [])

  return (
    <Wrapper>
        <>
          <Nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <BreadcrumbItem onClick={() => history.goBack()}><ArrowLeft color="#87972f" size={28}/></BreadcrumbItem>
              <BreadcrumbItem className="breadcrumb-item">{t('Equipment')}</BreadcrumbItem>
              <BreadcrumbItem className="breadcrumb-item">{t(subSystemName)}</BreadcrumbItem>
              <BreadcrumbItem className="breadcrumb-item">{t(equipment?.R_EquipmentTypes?.name)}</BreadcrumbItem>
              <BreadcrumbItemActive className="breadcrumb-item active text-primary font-bold" aria-current="page">{equipment?.dis}</BreadcrumbItemActive>
            </ol>
          </Nav>
          <Row2ColsGrid>
            <EquipmentDetailWrapper>
              <h3>{t('Equipment Details')}</h3>
              <EquipmentDetailContent>
                <div>
                  <EquipmentPhoto src={equipment?.EquipmentDetail[0]?.imageUrl} alt="Chiller "/>
                </div>
                <EquipmentDetailInformation>
                  {/*row 1*/}
                  <EquipmentDetailInformationCol>
                    <span>{t('Asset ID')}</span>
                    <EquipmentDetailInformationRowValue>{equipment?.dis}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Installed')}</span>
                    <EquipmentDetailInformationRowValue>{formatDate(
                      equipment?.EquipmentDetail[0]?.installDate)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Capacity')} (kWh)</span>
                    <EquipmentDetailInformationRowValue>{equipment?.EquipmentDetail[0]?.capacity}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 2*/}
                  <EquipmentDetailInformationCol>
                    <span>{t('Model')}</span>
                    <EquipmentDetailInformationRowValue>{t(equipment?.EquipmentDetail[0]?.model)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Commissioned')}</span>
                    <EquipmentDetailInformationRowValue>{formatDate(
                      equipment?.EquipmentDetail[0]?.commissioned)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Initial Value ($)')}</span>
                    <EquipmentDetailInformationRowValue>{formatNumber(equipment?.EquipmentDetail[0]?.initialAssetCost,
                      0)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 3*/}
                  <EquipmentDetailInformationCol>
                    <span>{t('Manufacturer')}</span>
                    <EquipmentDetailInformationRowValue>{equipment?.EquipmentDetail[0]?.manufacturer}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Age (Years)')}</span>
                    <EquipmentDetailInformationRowValue>{getTheTimeDifference(new Date(),
                      equipment?.EquipmentDetail[0].installDate, 'years')}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Depreciation Mode')}</span>
                    <EquipmentDetailInformationRowValue>{t(equipment?.EquipmentDetail[0]?.depreciationMode)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 4*/}
                  <EquipmentDetailInformationCol>
                    <span>{t('Location')}</span>
                    <EquipmentDetailInformationRowValue>{equipment?.EquipmentDetail[0]?.location}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>{t('Expected Life (Years)')}</span>
                    <EquipmentDetailInformationRowValue>{equipment?.EquipmentDetail[0]?.estimatedUsefulLife}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                </EquipmentDetailInformation>
              </EquipmentDetailContent>
              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-sm btn-primary right">{t('Maintenance & Sensor Logs')}</button>
              </div>
            </EquipmentDetailWrapper>
            <AlertWrapper>
              <AlertChart/>
            </AlertWrapper>
          </Row2ColsGrid>
          <Row3ColsGrid>
            <EnergyConsumptionWrapper>
              <EnergyConsumption equipmentId={equipmentId}
                                 startDate={moment(startTime).format('YYYY-MM-DD')}
                                 endDate={moment(endTime).format('YYYY-MM-DD')}/>
            </EnergyConsumptionWrapper>

            <EnergyConsumptionPercentageWrapper>
              <EnergyConsumptionPercentage equipmentId={equipmentId}
                                           equipmentTypeId={equipment?.R_EquipmentTypes?.id}
                                           subSystemId={equipment?.coolingSystemId || equipment?.heatingSystemId ||
                                           equipment?.mechanicalVentilationSystemId}
                                           buildingId={equipment?.Property?.buildingId}
                                           startDate={moment(startTime).format('YYYY-MM-DD')}
                                           endDate={moment(endTime).format('YYYY-MM-DD')}/>
            </EnergyConsumptionPercentageWrapper>

            <TotalCostBreakDownWrapper>
              <TotalCostBreakDown/>
            </TotalCostBreakDownWrapper>
          </Row3ColsGrid>

          <Row2EqualColsGrid>
            <MaintenanceCostReplacementValueWrapper>
              <MaintenanceCostReplacementValue/>
            </MaintenanceCostReplacementValueWrapper>
            <CostWrapper>
              <Cost/>
            </CostWrapper>
          </Row2EqualColsGrid>

          <Row2EqualColsGrid>
            <ReliabilityWrapper>
              <Reliability/>
            </ReliabilityWrapper>
            <DepreciationWrapper>
              <Depreciation/>
            </DepreciationWrapper>
          </Row2EqualColsGrid>

          <Row2ColsGrid>
            <PotentialIssuesListWrapper>
              <PotentialIssueList/>
            </PotentialIssuesListWrapper>
            <AssetPartsServiceSourcingWrapper>
              <AssetPartsServiceSourcing/>
            </AssetPartsServiceSourcingWrapper>
          </Row2ColsGrid>

          <Row2ColsGrid>
            <ProjectedPeakDemandWrapper>
              <ProjectedPeakDemand equipmentId={equipmentId} />
            </ProjectedPeakDemandWrapper>
            <MaintenanceRegimeWrapper>
              <MaintenanceRegime/>
            </MaintenanceRegimeWrapper>
          </Row2ColsGrid>
        </>
    </Wrapper>
  )

}

export default EquipmentAssetReliability