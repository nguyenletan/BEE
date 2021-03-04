import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PotentialSavings from '../comparision/components/PotentialSavings'
import BreakDown from '../../../components/BreakDown'
import SubSystemPerformance from '../comparision/components/SubSystemPerformance'
import ImprovementMeasures from '../comparision/components/ImprovementMeasures'
import PayBack from '../comparision/components/PayBack'

const ImproveWrapper = styled.div`
  margin-bottom: 40px;
`

const Improve = (props) => {
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

  //const [data, setData] = useState(improveData)
  const [popupResult, setResult] = useState()
  const [potentialSavingsData, setPotentialSavingsData] = useState({
    saving:
      [
        {
          title: 'Annual Energy Savings',
          unit: 'MWh',
          value: -618
        },
        {
          title: 'Annual Energy Cost Savings',
          unit: '$1000',
          value: -68.2
        },
        {
          title: 'Annual CO2 Emissions Avoided',
          unit: 'Tons',
          value: -189
        },
        {
          title: 'Investment Cost',
          unit: '$1000',
          value: 460
        },
        {
          title: 'Simple Payback',
          unit: 'Years',
          value: 6.7
        },
        {
          title: 'Energy Usage Intensity Reduction',
          unit: 'kWh/m2/yr',
          value: -23.8
        }
      ]
  })
  const [breakDownConsumption, setBreakDownConsumption] = useState([...props.data.breakDownConsumption])
  const [breakDownCost, setBreakDownCost] = useState([...props.data.breakDownCost])
  const [breakDownCO2Emissions] = useState([...props.data.breakDownCO2Emissions])

  useEffect(() => {
    let investmentCost = 0
    let energyCostSavings = 0
    let annualEnergySavings = 0
    if (popupResult) {
      let tmp = potentialSavingsData
      for (let i = 0; i < tmp.saving.length; i++) {
        switch (tmp.saving[i].title) {
          case 'Investment Cost':
            investmentCost = +(460 - (tmp.saving[i].value / 1000) + (popupResult.investmentCost / 1000)).toFixed(2)
            tmp.saving[i].value = investmentCost
            break
          case 'Annual Energy Savings':
            console.log('annualEnergySavings')
            annualEnergySavings = +(-618 + tmp.saving[i].value - popupResult.energySavings).toFixed(2)
            tmp.saving[i].value = annualEnergySavings

            console.log(annualEnergySavings)
            break
          case 'Annual Energy Cost Savings':
            energyCostSavings = +(-68.2 + (tmp.saving[i].value / 1000) - (popupResult.energyCostSavings / 1000)).toFixed(2)
            tmp.saving[i].value = energyCostSavings
            break
          case 'Annual CO2 Emissions Avoided':
            tmp.saving[i].value = +(-189 + tmp.saving[i].value - popupResult.co2EmissionsAvoided).toFixed(2)
            break
          case 'Simple Payback':
            tmp.saving[i].value = +(investmentCost / (0 - energyCostSavings)).toFixed(2)
            break
          case 'Energy Usage Intensity Reduction':
            tmp.saving[i].value = +(annualEnergySavings * 1000 / 25949).toFixed(2)
            break
          default:
            break
        }
      }
      setPotentialSavingsData(tmp)

      tmp = breakDownConsumption
      let total = tmp[0].value + tmp[1].value + tmp[2].value + tmp[3].value
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i].id) {
          case 'cooling':
            tmp[i].value = +(tmp[i].value * 100 / (total + annualEnergySavings)).toFixed(2)
            break
          case 'heating':
            tmp[i].value = +(tmp[i].value * 100 / (total + annualEnergySavings)).toFixed(2)
            break
          case 'lighting':
            tmp[i].value = +(energyCostSavings * 100 / (total + annualEnergySavings)).toFixed(2)
            break
          case 'mechanical ventilation':
            tmp[i].value = +(tmp[i].value * 100 / (total + annualEnergySavings)).toFixed(2)
            break
          case 'others':
            tmp[i].value = +(tmp[i].value * 100 / (total + annualEnergySavings)).toFixed(2)
            break
          default:
            break
        }
      }
      setBreakDownConsumption([...tmp])

      tmp = breakDownCost
      total = tmp[0].value + tmp[1].value + tmp[3].value + tmp[4].value
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i].id) {
          case 'cooling':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
            break
          case 'heating':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
            break
          case 'lighting':
            tmp[i].value = +((energyCostSavings/1000) * 100 / (total + (energyCostSavings/1000))).toFixed(2)
            break
          case 'mechanical ventilation':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
            break
          case 'others':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
            break
          default:
            break
        }
      }
      setBreakDownCost([...tmp])

      // tmp = breakDownCO2Emissions
      // total = tmp[0].value + tmp[1].value + tmp[3].value + tmp[4].value
      // for (let i = 0; i < tmp.length; i++) {
      //   switch (tmp[i].id) {
      //     case 'cooling':
      //       tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
      //       break
      //     case 'heating':
      //       tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
      //       break
      //     case 'lighting':
      //       tmp[i].value = +((energyCostSavings/1000) * 100 / (total + (energyCostSavings/1000))).toFixed(2)
      //       break
      //     case 'mechanical ventilation':
      //       tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
      //       break
      //     case 'others':
      //       tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings/1000))).toFixed(2)
      //       break
      //     default:
      //       break
      //   }
      // }
      // setBreakDownCO2Emissions([...tmp])


    }
  }, [popupResult])

  return (
    <ImproveWrapper>

      <PotentialSavings data={potentialSavingsData}/>

      <div className="d-flex mb-5">
        <BreakDown title="Energy Savings Breakdown"
                   subTitle="%"
                   data={breakDownConsumption}
        />
        <BreakDown title="Cost Savings Breakdown"
                   subTitle="%"
                   data={breakDownCost}
        />
        <BreakDown title="CO2 Emissions Avoided"
                   subTitle="%"
                   data={breakDownCO2Emissions}
        />
      </div>

      <div className="d-flex mb-5">
        <SubSystemPerformance/>

        <PayBack data={improveData.improvementMeasuresData}/>
      </div>

      <ImprovementMeasures data={improveData.improvementMeasuresData} setResult={setResult}/>

    </ImproveWrapper>

  )
}

export default Improve