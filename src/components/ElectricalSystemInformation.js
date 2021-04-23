import React from 'react'
import styled from 'styled-components'
import coolingLoadImg from '../assets/images/cooling-load.png'
import heatingLoadImg from '../assets/images/heating-load.png'
import lightingLoadImg from '../assets/images/lighting-load.png'
import mechVentLoadImg from '../assets/images/mech-vent-load.png'
import pvSystemImg from '../assets/images/pv-system.png'

const ElectricalSystemInformationWrapper = styled.div`
  width: 100%;
  margin: 0 auto 30px;
`

const ElectricalSystemInformationTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 15px;
`

const ElectricalSystemInformationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  @media(min-width: 768px) {
    padding: 0 20px ;
  }
`

const ElectricalSystemInformationItem = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px 20px;
  @media(min-width: 1024px) {
    margin-right: 0;
  }
`

const ElectricalSystemInformationItemTitle = styled.h5`
  font-size: .95rem;
  font-weight: 600;
`
const ElectricalSystemInformationItemValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
`

const ElectricalSystemInformationItemImage = styled.img`
  height: auto;
`

const ElectricalSystemInformation = (props) => {
  const {
    overallCoolingLoad,
    overallLightingLoad,
    overallHeatingLoad,
    overallMechVentLoad,
    pvSystemInstalledCapacity
  } = props

  return (
    <ElectricalSystemInformationWrapper>
      <ElectricalSystemInformationTitle>Electrical System Information</ElectricalSystemInformationTitle>
      <ElectricalSystemInformationList className="d-flex justify-content-start row">

        <ElectricalSystemInformationItem
          className="d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center">
          <div className="mr-3">
            <ElectricalSystemInformationItemTitle>Cooling Load</ElectricalSystemInformationItemTitle>
            <ElectricalSystemInformationItemValue>{overallCoolingLoad}W/m2</ElectricalSystemInformationItemValue>
          </div>
          <ElectricalSystemInformationItemImage src={coolingLoadImg} alt="Cooling Loading" width="33"/>
        </ElectricalSystemInformationItem>

        <ElectricalSystemInformationItem
          className="d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center">
          <div className="mr-3">
            <ElectricalSystemInformationItemTitle>Heating Load</ElectricalSystemInformationItemTitle>
            <ElectricalSystemInformationItemValue>{overallHeatingLoad}W/m2</ElectricalSystemInformationItemValue>
          </div>
          <ElectricalSystemInformationItemImage src={heatingLoadImg} width="20" alt="Heating Loading"/>
        </ElectricalSystemInformationItem>

        <ElectricalSystemInformationItem
          className="d-flex col col-6 col-lg-2  mb-3 mb-lg-0 justify-content-start align-items-center">
          <div className="mr-3">
            <ElectricalSystemInformationItemTitle>Lighting Load</ElectricalSystemInformationItemTitle>
            <ElectricalSystemInformationItemValue>{overallLightingLoad}W/m2</ElectricalSystemInformationItemValue>
          </div>
          <ElectricalSystemInformationItemImage src={lightingLoadImg} alt="Lighting Loading" width="23"/>
        </ElectricalSystemInformationItem>

        <ElectricalSystemInformationItem className="d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center">
          <div className="mr-1">
            <ElectricalSystemInformationItemTitle>Mech. Vent. Load</ElectricalSystemInformationItemTitle>
            <ElectricalSystemInformationItemValue>{overallMechVentLoad}W/m2</ElectricalSystemInformationItemValue>
          </div>
          <ElectricalSystemInformationItemImage src={mechVentLoadImg} width="36" alt="Mech. Vent. Load"/>
        </ElectricalSystemInformationItem>

        <ElectricalSystemInformationItem className="d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center">
          <div className="mr-3">
            <ElectricalSystemInformationItemTitle>P.V. System</ElectricalSystemInformationItemTitle>
            <ElectricalSystemInformationItemValue>{pvSystemInstalledCapacity}W/m2</ElectricalSystemInformationItemValue>
          </div>
          <ElectricalSystemInformationItemImage src={pvSystemImg} width="40" alt="P.V. System"/>
        </ElectricalSystemInformationItem>

      </ElectricalSystemInformationList>
    </ElectricalSystemInformationWrapper>
  )
}

export default ElectricalSystemInformation