/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PerformanceBlock from './components/PerformanceBlock'
import SubSystemPerformance from './components/SubSystemPerformance'
import styled from 'styled-components'
import FacilityEnvelopeElementsComparison from './components/FacilityEnvelopeElementsComparison'
import SubSystemComparison from './components/SubSystemComparison'
// import PerformanceComparison from './components/PerformanceComparison'
import PerformanceComparison2 from './components/PerformanceComparison2'
import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from 'atoms'
import { useTranslation } from 'react-i18next'
// import PerformanceComparison from 'pages/building/comparision/components/PerformanceComparison'
// import RadialBar from 'pages/building/comparision/components/RadialBar'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'
import {
  subSystemPerformanceDataDE,
  subSystemPerformanceDataEN,
} from '../../../MockData'
//import PerformanceComparison from 'pages/building/comparision/components/PerformanceComparison'

const ComparisonWrapper = styled.div`
  margin-bottom: 30px;
`

const Comparison = () => {
  const { i18n } = useTranslation('comparison')

  const [subSystemPerformanceData, setSubSystemPerformanceData] = useState(
    subSystemPerformanceDataEN
  )
  const { user } = useAuth()
  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Comparison', idToken)
    }
    tracking()
  }, [])

  useEffect(() => {
    if (i18n.language === 'en') {
      setSubSystemPerformanceData(subSystemPerformanceDataEN)
    } else {
      setSubSystemPerformanceData(subSystemPerformanceDataDE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const setIsDisplayPerformanceFilter = useSetRecoilState(
    isDisplayPerformanceFilterState
  )
  setIsDisplayPerformanceFilter(false)

  return (
    <ComparisonWrapper>
      <PerformanceBlock />
      <div className="d-flex justify-content-start row">
        <div className="col col-12 col-xl-5">
          <SubSystemPerformance data={subSystemPerformanceData} />
        </div>
        <div className="col col-12 col-lg-5 col-xl-3 mb-5 mb-lg-0">
          <FacilityEnvelopeElementsComparison />
        </div>
        <div className="col col-12 col-lg-7 col-xl-4">
          <SubSystemComparison />
        </div>
      </div>

      <PerformanceComparison2 />

      {/*<PerformanceComparison/>*/}

      {/*<RadialBar/>*/}
    </ComparisonWrapper>
  )
}

export default Comparison
