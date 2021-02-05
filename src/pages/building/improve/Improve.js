import React from 'react'
import styled from 'styled-components'
import PotentialSavings from '../comparision/components/PotentialSavings'
import BreakDown from '../../../components/BreakDown'
import SubSystemPerformance from '../comparision/components/SubSystemPerformance'
import ImprovementMeasures from '../comparision/components/ImprovementMeasures'
import PayBack from '../comparision/components/PayBack'

const ImproveWrapper = styled.div`
  margin-bottom: 40px;
`

const Improve = ({ data }) => {
  const improveData = {
    improvementMeasuresData: [
      {
        measures: 'LED Replacement',
        subSystem: 'Lighting',
        investmentCost: 36000,
        energySavings: 74.3,
        energyCostSavings: 19300,
        co2EmissionsAvoided: 65,
        paybackPeriod: 2.7,
        internalRateOfReturn: 32
      },
      {
        measures: 'Chiller Unit Replacement',
        subSystem: 'Cooling',
        investmentCost: 234000,
        energySavings: 177.09,
        energyCostSavings: 46000,
        co2EmissionsAvoided: 154.92,
        paybackPeriod: 5.1,
        internalRateOfReturn: 21
      },
      {
        measures: 'Double Glaze Low-E Windows',
        subSystem: 'Openings',
        investmentCost: 103000,
        energySavings: 106.45,
        energyCostSavings: 27650,
        co2EmissionsAvoided: 93.12,
        paybackPeriod: 3.7,
        internalRateOfReturn: 21
      },
      {
        measures: 'Install Variable Speed Drive Pumps',
        subSystem: 'Cooling',
        investmentCost: 87000,
        energySavings: 70.37,
        energyCostSavings: 18277.31,
        co2EmissionsAvoided: 61.55,
        paybackPeriod: 4.76,
        internalRateOfReturn: 18
      },
      {
        measures: 'Install Air Distribution Control System',
        subSystem: 'Cooling',
        investmentCost: 132000,
        energySavings: 56.65,
        energyCostSavings: 14715,
        co2EmissionsAvoided: 49.56,
        paybackPeriod: 8.97,
        internalRateOfReturn: 14
      },
      {
        measures: 'Curtain Wall Insulation Blocks',
        subSystem: 'Walls',
        investmentCost: 39679,
        energySavings: 15.43,
        energyCostSavings: 4008,
        co2EmissionsAvoided: 13.5,
        paybackPeriod: 9.9,
        internalRateOfReturn: 3
      },
      {
        measures: 'Solar Film Installation',
        subSystem: 'Openings',
        investmentCost: 43200,
        energySavings: 23.56,
        energyCostSavings: 6200,
        co2EmissionsAvoided: 20.9,
        paybackPeriod: 6.96,
        internalRateOfReturn: 7
      },
      {
        measures: 'Electric Air Source Heat Pump (Boiler Replacement)',
        subSystem: 'Heating',
        investmentCost: 250000,
        energySavings: 255.6,
        energyCostSavings: 67260,
        co2EmissionsAvoided: 226.73,
        paybackPeriod: 3.72,
        internalRateOfReturn: 24
      },
      {
        measures: 'Install Heating Central Time Control',
        subSystem: 'Heating',
        investmentCost: 98000,
        energySavings: 128.42,
        energyCostSavings: 33793,
        co2EmissionsAvoided: 113.91,
        paybackPeriod: 2.9,
        internalRateOfReturn: 30
      }
    ]
  }

  return (
    <ImproveWrapper>
      <PotentialSavings/>

      <div className="d-flex mb-5">
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

        <PayBack data={improveData.improvementMeasuresData}/>
      </div>

      <ImprovementMeasures data={improveData.improvementMeasuresData}/>

    </ImproveWrapper>

  )
}

export default Improve