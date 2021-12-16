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
import PerformanceComparison from 'pages/building/comparision/components/PerformanceComparison'
import RadialBar from 'pages/building/comparision/components/RadialBar'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'
//import PerformanceComparison from 'pages/building/comparision/components/PerformanceComparison'

const ComparisonWrapper = styled.div`
  margin-bottom: 50px;
`

const Comparison = () => {

  const { i18n } = useTranslation('comparison')

  const subSystemPerformanceDataEN = {
    data: [
      {
        name: 'Energy Usage Intensity',
        'Minimum Requirement': 46,
        'Current Performance': 53,
        'Potential Best In Class': 76,
      },
      {
        name: 'Cooling Efficiency',
        'Minimum Requirement': 30,
        'Current Performance': 28,
        'Potential Best In Class': 70,
      },
      {
        name: 'Heating Efficiency',
        'Minimum Requirement': 40,
        'Current Performance': 53,
        'Potential Best In Class': 76,
      },
      {
        name: 'Lighting Efficiency',
        'Minimum Requirement': 40,
        'Current Performance': 38,
        'Potential Best In Class': 76,
      },
      {
        name: 'Mechanical Ventilation Efficiency',
        'Minimum Requirement': 49,
        'Current Performance': 51,
        'Potential Best In Class': 68,
      },
      {
        name: 'Envelope Performance',
        'Minimum Requirement': 20,
        'Current Performance': 72,
        'Potential Best In Class': 76,
      },
      {
        name: 'Renewables Usage',
        'Minimum Requirement': 19,
        'Current Performance': 53,
        'Potential Best In Class': 64,
      },
    ],
    keys: ['Potential Best In Class', 'Current Performance', 'Minimum Requirement'],
    indexBy: ['name'],
  }

  const subSystemPerformanceDataDE = {
    data: [
      {
        name: 'Elektr. Energiebedarf',
        'Gesetzl. Mindest-anforderungen': 46,
        'Aktuell': 53,
        'Optimal': 76,
      },
      {
        name: 'Kühllast',
        'Gesetzl. Mindest-anforderungen': 30,
        'Aktuell': 28,
        'Optimal': 70,
      },
      {
        name: 'Heizlast',
        'Gesetzl. Mindest-anforderungen': 40,
        'Aktuell': 53,
        'Optimal': 76,
      },
      {
        name: 'Beleuchtungs-effizienz',
        'Gesetzl. Mindest-anforderungen': 40,
        'Aktuell': 38,
        'Optimal': 76,
      },
      {
        name: 'Effizienz der Lüftungsanlagen',
        'Gesetzl. Mindest-anforderungen': 49,
        'Aktuell': 51,
        'Optimal': 68,
      },
      {
        name: 'Isolierung',
        'Gesetzl. Mindest-anforderungen': 20,
        'Aktuell': 72,
        'Optimal': 76,
      },
      {
        name: 'Einsatz erneuerbarer Energien',
        'Gesetzl. Mindest-anforderungen': 19,
        'Aktuell': 53,
        'Optimal': 64,
      },
    ],
    keys: ['Aktuell', 'Optimal', 'Gesetzl. Mindest-anforderungen'],
    indexBy: ['name'],
  }

  const [subSystemPerformanceData, setSubSystemPerformanceData] = useState(subSystemPerformanceDataEN)
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

  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)

  return (
    <ComparisonWrapper>
      <PerformanceBlock/>
      <div className="d-flex justify-content-start row">
        <div className="col col-12 col-xl-5">
          <SubSystemPerformance data={subSystemPerformanceData}/>
        </div>
        <div className="col col-12 col-lg-5 col-xl-3 mb-5 mb-lg-0">
          <FacilityEnvelopeElementsComparison/>
        </div>
        <div className="col col-12 col-lg-7 col-xl-4">
          <SubSystemComparison/>
        </div>
      </div>


      <PerformanceComparison2/>

      <PerformanceComparison/>

      <RadialBar/>

    </ComparisonWrapper>
  )
}

export default Comparison
