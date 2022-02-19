/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PotentialSavings from '../comparision/components/PotentialSavings'
import BreakDown from '../../../components/BreakDown'
import SubSystemPerformance from '../comparision/components/SubSystemPerformance'
import ImprovementMeasures from 'pages/building/improve/components/ImprovementMeasures'
import PayBack from 'pages/building/improve/components/PayBack'
import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from 'atoms'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'
import { deepClone } from 'Utilities'

const ImproveWrapper = styled.div`
  margin-bottom: 40px;
`

const BreakDownWrapper = styled.div`
  margin-bottom: 50px;
`

const Improve = (props) => {
  const {
    consumptionBreakdown,
    costBreakdown,
    co2EmissionsBreakdown,
  } = props

  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)

  const { user } = useAuth()
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
        usagePercent: 32,
        oldUsagePercent: 32,
        internalRateOfReturn: 32,
      },
      {
        measures: 'Chiller Unit Replacement',
        subSystem: 'Cooling',
        investmentCost: 234000,
        energySavings: 177.09,
        energyCostSavings: 46000,
        co2EmissionsAvoided: 154.92,
        paybackPeriod: 5.1,
        internalRateOfReturn: 21,
        usagePercent: 21,
        oldUsagePercent: 21,
      },
      {
        measures: 'Double Glaze Low-E Windows',
        subSystem: 'Openings',
        investmentCost: 103000,
        energySavings: 106.45,
        energyCostSavings: 27650,
        co2EmissionsAvoided: 93.12,
        paybackPeriod: 3.7,
        internalRateOfReturn: 21,
        usagePercent: 21,
        oldUsagePercent: 21,
      },
      {
        measures: 'Install Variable Speed Drive Pumps',
        subSystem: 'Cooling',
        investmentCost: 87000,
        energySavings: 70.37,
        energyCostSavings: 18277.31,
        co2EmissionsAvoided: 61.55,
        paybackPeriod: 4.76,
        internalRateOfReturn: 18,
        usagePercent: 18,
        oldUsagePercent: 18,
      },
      {
        measures: 'Install Air Distribution Control System',
        subSystem: 'Cooling',
        investmentCost: 132000,
        energySavings: 56.65,
        energyCostSavings: 14715,
        co2EmissionsAvoided: 49.56,
        paybackPeriod: 8.97,
        internalRateOfReturn: 14,
        usagePercent: 14,
        oldUsagePercent: 14,
      },
      {
        measures: 'Curtain Wall Insulation Blocks',
        subSystem: 'Walls',
        investmentCost: 39679,
        energySavings: 15.43,
        energyCostSavings: 4008,
        co2EmissionsAvoided: 13.5,
        paybackPeriod: 9.9,
        internalRateOfReturn: 3,
        usagePercent: 3,
        oldUsagePercent: 3,
      },
      {
        measures: 'Solar Film Installation',
        subSystem: 'Openings',
        investmentCost: 43200,
        energySavings: 23.56,
        energyCostSavings: 6200,
        co2EmissionsAvoided: 20.9,
        paybackPeriod: 6.96,
        internalRateOfReturn: 7,
        usagePercent: 7,
        oldUsagePercent: 7,
      },
      {
        measures: 'Electric Air Source Heat Pump (Boiler Replacement)',
        subSystem: 'Heating',
        investmentCost: 250000,
        energySavings: 255.6,
        energyCostSavings: 67260,
        co2EmissionsAvoided: 226.73,
        paybackPeriod: 3.72,
        internalRateOfReturn: 24,
        usagePercent: 24,
        oldUsagePercent: 24,
      },
      {
        measures: 'Install Heating Central Time Control',
        subSystem: 'Heating',
        investmentCost: 98000,
        energySavings: 128.42,
        energyCostSavings: 33793,
        co2EmissionsAvoided: 113.91,
        paybackPeriod: 2.9,
        internalRateOfReturn: 30,
        usagePercent: 30,
        oldUsagePercent: 30,
      },
    ],
  }

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

  //const [subSystemPerformanceData, setSubSystemPerformanceData] = useState(subSystemPerformanceDataEN)

  const { i18n } = useTranslation('comparison')

  // const [data, setData] = useState(improveData)
  const [popupResult, setResult] = useState()
  const [potentialSavingsData, setPotentialSavingsData] = useState({
    energyPerformance: { current: 'D', improved: 'C' },
    CO2EmissionsPerformance: { current: 'D', improved: 'C' },
    saving:
      [
        {
          title: 'Annual Energy Savings',
          unit: 'MWh',
          value: -618,
        },
        {
          title: 'Annual Energy Cost Savings',
          unit: '$1000',
          value: -68.2,
        },
        {
          title: 'Annual CO2 Emissions Avoided',
          unit: 'Tons',
          value: -189,
        },
        {
          title: 'Investment Cost',
          unit: '$1000',
          value: 460,
        },
        {
          title: 'Simple Payback',
          unit: 'Years',
          value: 6.7,
        },
        {
          title: 'Energy Usage Intensity Reduction',
          unit: 'kWh/m2/yr',
          value: -23.8,
        },
      ],
  })
  const [breakDownConsumption, setBreakDownConsumption] = useState([...consumptionBreakdown])
  const [breakDownCost, setBreakDownCost] = useState([...costBreakdown])
  const [breakDownCO2Emissions, setBreakDownCO2Emissions] = useState([...co2EmissionsBreakdown])
  const [subSystemPerformance, setSubSystemPerformanceData] = useState({ ...subSystemPerformanceDataEN })
  const [improvementMeasuresData, setImprovementMeasuresData] = useState(improveData.improvementMeasuresData)

  useEffect(() => {
    if (i18n.language === 'en') {
      setSubSystemPerformanceData(subSystemPerformanceDataEN)
    } else {
      setSubSystemPerformanceData(subSystemPerformanceDataDE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [i18n.language])

  useEffect(() => {
    async function tracking () {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Improve', idToken)
    }

    tracking()
  }, [])

  const updateValue = () => {
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
            annualEnergySavings = +(-618 + tmp.saving[i].value - popupResult.energySavings).toFixed(2)
            tmp.saving[i].value = annualEnergySavings
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

      tmp.energyPerformance.improved = popupResult.percentageLEDUsage >= 90 ? 'B' : 'C' // IF(C65>=0.9,"B","C")
      tmp.CO2EmissionsPerformance.improved = popupResult.percentageLEDUsage >= 90 ? 'B' : 'C' // IF(C65>=0.9,"B","C")

      setPotentialSavingsData({ ...tmp })

      tmp = deepClone(breakDownConsumption)

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

      tmp = deepClone(breakDownCost)
      total = tmp[0].value + tmp[1].value + tmp[3].value + tmp[4].value
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i].id) {
          case 'cooling':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          case 'heating':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          case 'lighting':
            tmp[i].value = +((energyCostSavings / 1000) * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          case 'mechanical ventilation':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          case 'others':
            tmp[i].value = +(tmp[i].value * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          default:
            break
        }
      }
      setBreakDownCost([...tmp])

      tmp = deepClone(breakDownCO2Emissions)
      total = tmp[0].value + tmp[1].value + tmp[3].value + tmp[4].value + popupResult.co2EmissionsAvoided
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i].id) {
          case 'cooling':
            tmp[i].value = +(tmp[i].value * 100 / total).toFixed(2)
            break
          case 'heating':
            tmp[i].value = +(tmp[i].value * 100 / total).toFixed(2)
            break
          case 'lighting':
            tmp[i].value = +(popupResult.co2EmissionsAvoided * 100 / (total + (energyCostSavings / 1000))).toFixed(2)
            break
          case 'mechanical ventilation':
            tmp[i].value = +(tmp[i].value * 100 / total).toFixed(2)
            break
          case 'others':
            tmp[i].value = +(tmp[i].value * 100 / total).toFixed(2)
            break
          default:
            break
        }
      }
      setBreakDownCO2Emissions([...tmp])

      tmp = deepClone(subSystemPerformance)

      tmp.data[3]['Potential Best In Class'] = (((0.54 - 0.38) / 0.6) * popupResult.percentageLEDUsage) + 0.38
      setSubSystemPerformanceData(tmp)

      let idx = improvementMeasuresData.findIndex(({ measures }) => measures === popupResult.measures)

      improvementMeasuresData[idx] = { ...improvementMeasuresData[idx], ...popupResult}

      setImprovementMeasuresData([...improvementMeasuresData])

    }
  }

  useEffect(() => {

    updateValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupResult])

  return (
    <ImproveWrapper>

      <PotentialSavings data={potentialSavingsData}/>

      <BreakDownWrapper className="d-flex row justify-content-center">
        <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
          <BreakDown
            title="Energy Savings"
            subTitle="MWH/Yr"
            data={breakDownConsumption}
            informationFontSize="16px"
            hasDescription
          />
        </div>

        <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
          <BreakDown
            title="Energy Cost Savings"
            subTitle="$/Yr"
            data={breakDownCost}
            informationFontSize="16px"
            hasDescription
          />
        </div>

        <div className="col col-12 col-md-8 col-xl-4">
          <BreakDown
            title="CO2 Emissions Avoided"
            subTitle="Tons/Yr"
            data={breakDownCO2Emissions}
            hasDescription
            informationFontSize="16px"
          />
        </div>
      </BreakDownWrapper>

      <div className="row mb-5">
        <div className="col-12 col-xl-4">
          <SubSystemPerformance data={subSystemPerformance}/>
        </div>
        <div className="col-12 col-xl-8">
          <PayBack data={improvementMeasuresData} setResult={setResult}/>
        </div>
      </div>

      <ImprovementMeasures data={improvementMeasuresData} setResult={setResult}/>

    </ImproveWrapper>
  )
}

export default Improve
