/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BuildingEnergyPerformance from './BuildingEnergyPerformance'
import CO2EmissionsPerformance from './CO2EmissionsPerformance'
import { useTranslation } from 'react-i18next'
import { deepClone, formatNumber } from 'Utilities'
import { useRecoilValue } from 'recoil'
import {
  getTotalInvestmentCost, getTotalIRR,
  getTotalSimplePayback,
  getTotalValueAnnualEnergySavings,
  totalAnnualSavingState,
} from 'atoms'

const PotentialSavingsWrapper = styled.div`
  margin-bottom: 40px;
  margin-top: 40px;
`
const PotentialSavingsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 30px;
`

const PotentialSavingItem = styled.li`
  width: 165px;
  min-height: 158px;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 10px;
  list-style-type: none;
  margin-bottom: 25px;
`

const PotentialSavingItemTitle = styled.h4`
  font-size: 0.85rem;
  text-align: center;
  height: 2rem;
`

const PotentialSavingItemValue = styled.h4`
  font-size: 2rem;
  text-align: center;
  margin: auto;
  line-height: 3rem;
  color: var(--bs-primary);
`

const PotentialSavings = ({ data }) => {
  const { t, i18n } = useTranslation('improvement')
  const totalAnnualSaving = useRecoilValue(totalAnnualSavingState)
  const valueAnnualEnergySavingsSelector = useRecoilValue(getTotalValueAnnualEnergySavings)
  const getTotalInvestmentCostSelector = useRecoilValue(getTotalInvestmentCost)
  const getTotalSimplePaybackSelector = useRecoilValue(getTotalSimplePayback)
  const getTotalIRRSelector = useRecoilValue(getTotalIRR)


  const [dataSource, setDataScource] = useState(data)

  useEffect(() => {
    const tmp = deepClone(data)
    console.log(totalAnnualSaving)
    if (totalAnnualSaving !== []) {
      for (let item of tmp.saving) {

        switch (item.title) {
          case 'Annual Energy Savings':
            item.value = formatNumber(valueAnnualEnergySavingsSelector /1000)
            console.log(item.value)
            break
          case 'Investment Cost':
            item.value = formatNumber(getTotalInvestmentCostSelector /1000)
            break
          case 'Annual Energy Cost Savings':
            item.value = formatNumber(valueAnnualEnergySavingsSelector * 0.23 / 1000)
            break
          case 'Annual CO2 Emissions Avoided':
            item.value = formatNumber(valueAnnualEnergySavingsSelector * 0.1)
            break
          case 'Simple Payback':
            item.value = formatNumber(getTotalSimplePaybackSelector)
            break
          case 'Energy Usage Intensity Reduction':
            item.value = formatNumber(getTotalIRRSelector)
            break
          default:
            break
        }
      }
    }

    for (let item of tmp.saving) {
      item.title = t(item.title)
      item.unit = t(item.unit)
    }

    setDataScource(tmp)
  }, [i18n.language, totalAnnualSaving, data, valueAnnualEnergySavingsSelector, getTotalInvestmentCostSelector, getTotalSimplePaybackSelector, getTotalIRRSelector])

  const PotentialSavingItems = dataSource.saving.map(item => (
    <PotentialSavingItem key={t(item.title)} className="d-flex flex-column">
      <PotentialSavingItemTitle>{item.title} ({item.unit})</PotentialSavingItemTitle>
      <PotentialSavingItemValue>{item.value}</PotentialSavingItemValue>
    </PotentialSavingItem>))

  return (
    <PotentialSavingsWrapper className="row">
      <div className="col-5">
        <PotentialSavingsTitle>{t('Potential Savings')}</PotentialSavingsTitle>
        <div className="d-flex justify-content-between flex-wrap">
          {PotentialSavingItems}
        </div>
      </div>

      <div className="col-7">
        <div className="d-flex">
          <BuildingEnergyPerformance improved={data.energyPerformance.improved}/>
          <CO2EmissionsPerformance improved={data.CO2EmissionsPerformance.improved}/>
        </div>
      </div>

    </PotentialSavingsWrapper>
  )
}

export default PotentialSavings
