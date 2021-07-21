import React from 'react'
import PerformanceBlock from './components/PerformanceBlock'
import SubSystemPerformance from './components/SubSystemPerformance'
import styled from 'styled-components'
import FacilityEnvelopeElementsComparison from './components/FacilityEnvelopeElementsComparison'
import SubSystemComparison from './components/SubSystemComparison'
// import PerformanceComparison from './components/PerformanceComparison'
import PerformanceComparison2 from './components/PerformanceComparison2'

const ComparisonWrapper = styled.div`
  margin-bottom: 50px;
`

const Comparison = ({ data }) => {
  const subSystemPerformanceData = {
    data: [
      {
        name: 'Energy Usage Intensity',
        Minimum_Requirement: 46,
        Current_Performance: 53,
        Potential_Best_In_Class: 76
      },
      {
        name: 'Cooling Efficiency',
        Minimum_Requirement: 30,
        Current_Performance: 28,
        Potential_Best_In_Class: 70
      },
      {
        name: 'Heating Efficiency',
        Minimum_Requirement: 40,
        Current_Performance: 53,
        Potential_Best_In_Class: 76
      },
      {
        name: 'Lighting Efficacy',
        Minimum_Requirement: 40,
        Current_Performance: 38,
        Potential_Best_In_Class: 76
      },
      {
        name: 'Mechanical Ventilation Efficiency',
        Minimum_Requirement: 49,
        Current_Performance: 51,
        Potential_Best_In_Class: 68
      },
      {
        name: 'Envelope Performance',
        Minimum_Requirement: 20,
        Current_Performance: 72,
        Potential_Best_In_Class: 76
      },
      {
        name: 'Renewables Usage',
        Minimum_Requirement: 19,
        Current_Performance: 53,
        Potential_Best_In_Class: 64
      }
    ],
    keys: ['Minimum_Requirement', 'Current_Performance', 'Potential_Best_In_Class']
  }

  return (
    <ComparisonWrapper>
      <PerformanceBlock />
      <div className='d-flex justify-content-start row'>
        <div className='col col-12 col-xl-5'>
          <SubSystemPerformance data={subSystemPerformanceData} />
        </div>
        <div className='col col-12 col-lg-5 col-xl-3 mb-5 mb-lg-0'>
          <FacilityEnvelopeElementsComparison />
        </div>
        <div className='col col-12 col-lg-7 col-xl-4'>
          <SubSystemComparison />
        </div>
      </div>
      {/* <PerformanceComparison/> */}

      <PerformanceComparison2 />

    </ComparisonWrapper>
  )
}

export default Comparison
