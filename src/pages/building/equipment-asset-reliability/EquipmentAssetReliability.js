import React from 'react'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from '../../../atoms'
import chillerPhoto from '../../../assets/images/equipment/Chiller.webp'
import AlertChart from './components/AlertChart'

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
  margin-top: 30px;
`

const EquipmentDetailInformation = styled.div`
  display: grid;
  margin-left: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  font-size: 1rem;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const EquipmentPhoto = styled.img`
  width: 300px;
  border-radius: 20px;
`

const Nav = styled.nav`
  margin-bottom: 50px;
`
const EquipmentAssetReliability = ({ subSystemName, equipmentTypeName, equipmentName }) => {
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)
  return (
    <Wrapper>
      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Building</li>
          <li className="breadcrumb-item">Cooling</li>
          <li className="breadcrumb-item">Chiller</li>
          <li className="breadcrumb-item active text-primary" aria-current="page">Chiller-01</li>
        </ol>
      </Nav>
      <Row>
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
                <EquipmentDetailInformationRowValue>Chiller-01</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Installed</span>
                <EquipmentDetailInformationRowValue>23/06/2020</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Capacity (kWh)</span>
                <EquipmentDetailInformationRowValue>300</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              {/*row 2*/}
              <EquipmentDetailInformationCol>
                <span>Model</span>
                <EquipmentDetailInformationRowValue>CH14W</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Commissioned</span>
                <EquipmentDetailInformationRowValue>23/06/2020</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Initial Value ($)</span>
                <EquipmentDetailInformationRowValue>230,000</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              {/*row 3*/}
              <EquipmentDetailInformationCol>
                <span>Manufacturer</span>
                <EquipmentDetailInformationRowValue>Chills</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Age (Years)</span>
                <EquipmentDetailInformationRowValue>14</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Depreciation Mode</span>
                <EquipmentDetailInformationRowValue>Straight Line</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              {/*row 4*/}
              <EquipmentDetailInformationCol>
                <span>Location</span>
                <EquipmentDetailInformationRowValue>Plant-RM-01</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

              <EquipmentDetailInformationCol>
                <span>Expected Life (Years)</span>
                <EquipmentDetailInformationRowValue>20</EquipmentDetailInformationRowValue>
              </EquipmentDetailInformationCol>

            </EquipmentDetailInformation>
          </EquipmentDetailContent>
          <div className="d-flex justify-content-end mt-5">
            <button className="btn btn-sm btn-primary right">Maintenance & Sensor Logs</button>
          </div>
        </EquipmentDetailWrapper>
        <AlertWrapper>
          <AlertChart />
        </AlertWrapper>
      </Row>

    </Wrapper>
  )

}

export default EquipmentAssetReliability