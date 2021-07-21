import React from 'react'
import AssetHealth from './components/AssetHealth'
import PotentialFaultRisks from './components/PotentialFaultRisks1'
import CurrentSubSystemHealth from './components/CurrentSubSystemHealth'
import PotentialFaultList from './components/PotentialFaultsList'
import MaintenanceBudget from './components/MaintenanceBudget'
import MaintenanceBudgetBySubSystem from './components/MaintenanceBudgetBySubSystem'

import styled from 'styled-components'

const TheSecondWrapper = styled.div`
  margin-bottom: 50px;
`

const AssetReliabilityMain = ({ data }) => {
  return (
    <>

      <AssetHealth />

      <TheSecondWrapper className='d-flex mb-5 justify-content-lg-center justify-content-xl-between flex-wrap'>
        <PotentialFaultRisks data={data.listOfPotentialFaults} />
        <CurrentSubSystemHealth data={data.currentSubSystemHealth} />
      </TheSecondWrapper>

      <PotentialFaultList data={data.listOfPotentialFaults} />

      <div className='row'>
        <div className='col-12 col-sm-8 col-xl-4 mb-4'>
          <MaintenanceBudget data={data.maintenanceBudget} />
        </div>
        <div className='col-12 col-xl-8 mb-4'>
          <MaintenanceBudgetBySubSystem data={data.maintenanceBudgetBySubSystem} />
        </div>
      </div>
    </>
  )
}
export default AssetReliabilityMain
