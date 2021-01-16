import React from 'react'
import PerformanceBlock from './components/PerformanceBlock'
import SubSystemPerformance from './components/SubSystemPerformance'
import styled from 'styled-components'
import FacilityEnvelopeElementsComparison from './components/FacilityEnvelopeElementsComparison'
import SubSystemComparison from './components/SubSystemComparison'
import PerformanceComparison from './components/PerformanceComparison'

const ComparisonWrapper = styled.div`
  margin-bottom: 40px;
`

const Comparison = ({ data }) => {
  return (
    <ComparisonWrapper>
      <PerformanceBlock/>
      <div className="d-flex justify-content-center">
        <SubSystemPerformance/>
        <FacilityEnvelopeElementsComparison/>
        <SubSystemComparison/>

      </div>
      <PerformanceComparison/>
    </ComparisonWrapper>
  )
}

export default Comparison