/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import {
  energyPerformanceEndTimeState,
  energyPerformanceStartTimeState,
  isDisplayPerformanceFilterState,
} from '../../../atoms'
import chillerPhoto from '../../../assets/images/equipment/Chiller.webp'
import AlertChart from './components/AlertChart'
import EnergyConsumption from './components/EnergyConsumption'
import EnergyConsumptionPercentage from './components/EnergyConsumptionPercentage'
import TotalCostBreakDown from './components/TotalCostBreakDown'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../AuthenticateProvider'
import { getEquipmentById } from '../../../api/EquipmentAPI'
import { formatDate, formatNumber, getTheTimeDifference } from '../../../Utilities'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
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
  grid-gap: 30px;
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
const EquipmentAssetReliability = () => {
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  const [equipment, setEquipment] = useState()
  setIsDisplayPerformanceFilter(false)
  const { equipmentId } = useParams()

  const { user } = useAuth()

  const [subSystemName, setSubSystemName] = useState('')

  const startTime = useRecoilValue(energyPerformanceStartTimeState)

  const endTime = useRecoilValue(energyPerformanceEndTimeState)

  const getEquipmentInfo = async () => {

    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getEquipmentById(equipmentId, idToken)
    setEquipment(tmp)
    const _subSystemName = tmp.coolingSystemId
                            ? 'Cooling' : tmp.equipment.heatingSystemId
                                ? 'Heating' : tmp.equipment.mechanicalVentilationSystemId
                                  ? 'Mechanical Ventilation' : ''

    //const _subSystemId = tmp.coolingSystemId || tmp.equipment.heatingSystemId || tmp.equipment.mechanicalVentilationSystemId

    setSubSystemName(_subSystemName)
  }

  useEffect(() => {
    getEquipmentInfo()

  }, [])

  return (
    <Wrapper>
      {equipment && (
        <>
          <Nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Equipment</li>
              <li className="breadcrumb-item">{subSystemName}</li>
              <li className="breadcrumb-item">{equipment?.R_EquipmentTypes?.name}</li>
              <li className="breadcrumb-item active text-primary" aria-current="page">{equipment.dis}</li>
            </ol>
          </Nav>
          <Row2ColsGrid>
            <EquipmentDetailWrapper>
              <h3>Equipment Details</h3>
              <EquipmentDetailContent>
                <div>
                  <EquipmentPhoto src={chillerPhoto} alt="Chiller "/>
                </div>
                <EquipmentDetailInformation>
                  {/*row 1*/}
                  <EquipmentDetailInformationCol>
                    <span>Asset ID</span>
                    <EquipmentDetailInformationRowValue>{equipment.dis}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Installed</span>
                    <EquipmentDetailInformationRowValue>{formatDate(
                      equipment.EquipmentDetail[0]?.installDate)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Capacity (kWh)</span>
                    <EquipmentDetailInformationRowValue>{equipment.EquipmentDetail[0]?.capacity}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 2*/}
                  <EquipmentDetailInformationCol>
                    <span>Model</span>
                    <EquipmentDetailInformationRowValue>{equipment.EquipmentDetail[0]?.model}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Commissioned</span>
                    <EquipmentDetailInformationRowValue>{formatDate(
                      equipment.EquipmentDetail[0]?.commissioned)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Initial Value ($)</span>
                    <EquipmentDetailInformationRowValue>{formatNumber(equipment.EquipmentDetail[0]?.initialAssetCost,
                      0)}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 3*/}
                  <EquipmentDetailInformationCol>
                    <span>Manufacturer</span>
                    <EquipmentDetailInformationRowValue>{equipment.EquipmentDetail[0]?.manufacturer}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Age (Years)</span>
                    <EquipmentDetailInformationRowValue>{getTheTimeDifference(new Date(),
                      equipment.EquipmentDetail[0].installDate, 'years')}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Depreciation Mode</span>
                    <EquipmentDetailInformationRowValue>{equipment.EquipmentDetail[0]?.depreciationMode}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  {/*row 4*/}
                  <EquipmentDetailInformationCol>
                    <span>Location</span>
                    <EquipmentDetailInformationRowValue>Plant-RM-01</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                  <EquipmentDetailInformationCol>
                    <span>Expected Life (Years)</span>
                    <EquipmentDetailInformationRowValue>{equipment.EquipmentDetail[0]?.estimatedUsefulLife}</EquipmentDetailInformationRowValue>
                  </EquipmentDetailInformationCol>

                </EquipmentDetailInformation>
              </EquipmentDetailContent>
              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-sm btn-primary right">Maintenance & Sensor Logs</button>
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
                                           subSystemId={equipment.coolingSystemId || equipment.heatingSystemId || equipment.mechanicalVentilationSystemId}
                                           buildingId={equipment?.Property?.buildingId}
                                           startDate={moment(startTime).format('YYYY-MM-DD')}
                                           endDate={moment(endTime).format('YYYY-MM-DD')}/>
            </EnergyConsumptionPercentageWrapper>

            <TotalCostBreakDownWrapper>
              <TotalCostBreakDown/>
            </TotalCostBreakDownWrapper>
          </Row3ColsGrid>
        </>
      )}
    </Wrapper>
  )

}

export default EquipmentAssetReliability