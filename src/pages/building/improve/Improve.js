import React from 'react'
import styled from 'styled-components'
import PotentialSavings from '../comparision/components/PotentialSavings'
import BreakDown from '../../../components/BreakDown'
import SubSystemPerformance from '../comparision/components/SubSystemPerformance'
import ImprovementMeasures from '../comparision/components/ImprovementMeasures'

const ImproveWrapper = styled.div`
  margin-bottom: 40px;
`

const Improve = ({ data }) => (

  <ImproveWrapper>
    <PotentialSavings />

    <div className="d-flex mb-4">
      <BreakDown title="Energy Savings Breakdown"
                 subTitle="%"
                 data={data.breakDownConsumption}
      />
      <BreakDown title="Cost Savings Breakdown"
                 subTitle="%"
                 data={data.breakDownCost}
      />
      <BreakDown title="CO2 Emissions Avoided"
                 subTitle="%"
                 data={data.breakDownCO2Emissions}
      />
    </div>

    <div className="d-flex mb-5">
      <SubSystemPerformance/>
      <div></div>
    </div>

    <div className="">
      <ImprovementMeasures/>
    </div>
  </ImproveWrapper>

)

export default Improve