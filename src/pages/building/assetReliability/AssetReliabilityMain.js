/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import AssetHealth from './components/AssetHealth'
import PotentialFaultRisks from './components/PotentialFaultRisks1'
import CurrentSubSystemHealth from './components/CurrentSubSystemHealth'
import PotentialFaultList from './components/PotentialFaultsList'
import MaintenanceBudget from './components/MaintenanceBudget'
import MaintenanceBudgetBySubSystem from './components/MaintenanceBudgetBySubSystem'

import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from 'atoms'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { trackingUser } from 'api/UserAPI'

const TheSecondWrapper = styled.div`
  margin-bottom: 50px;
`

const AssetReliabilityMain = ({ data }) => {

  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)

  const { i18n } = useTranslation('assetReliability')


  const [maintenanceBudgetBySubSystem, setMaintenanceBudgetBySubSystem] = useState(data.maintenanceBudgetBySubSystemEN)

  const { user } = useAuth()
  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'AssetReliability', idToken)
    }
    tracking()
  }, [])

  useEffect(() => {
    if(i18n.language === 'en') {
      setMaintenanceBudgetBySubSystem(data.maintenanceBudgetBySubSystemEN)
    } else {
      setMaintenanceBudgetBySubSystem(data.maintenanceBudgetBySubSystemDE)
    }

  }, [i18n.language])

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
          <MaintenanceBudgetBySubSystem data={maintenanceBudgetBySubSystem} />
        </div>
      </div>
    </>
  )
}
export default AssetReliabilityMain
