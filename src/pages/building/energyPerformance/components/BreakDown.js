import DrillDownDonutChart3Lv from '../../../../components/DrillDownDonutChart3Lv'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { breakDownLevelState, consumptionBreakdownState, isBreakDownDrillDownState, selectedSubBreakdownState } from 'atoms'
import { useTranslation } from 'react-i18next'

const BreakdownWrapper = styled.div`
  margin-bottom: 50px;
`

const BreakDown = ({ consumptionBreakdown }) => {
  const { t } = useTranslation('buildingPerformance')

  const setBreakDownLevel = useSetRecoilState(breakDownLevelState)
  const setIsBreakDownDrillDown = useSetRecoilState(isBreakDownDrillDownState)
  const setSelectedSubBreakdown = useSetRecoilState(selectedSubBreakdownState)
  const [consumptionBreakdownSt, setConsumptionBreakdownSt] = useRecoilState(consumptionBreakdownState)

  useEffect(() => {
    setConsumptionBreakdownSt(consumptionBreakdown)
    setSelectedSubBreakdown(null)
    setBreakDownLevel(0)
    setIsBreakDownDrillDown(false)
  }, [consumptionBreakdown, setBreakDownLevel, setConsumptionBreakdownSt, setIsBreakDownDrillDown, setSelectedSubBreakdown])

  const chartData = useMemo(
    () => [
      { title: t('Consumption Breakdown'), subTitle: 'MWh' },
      { title: t('Cost Breakdown'), subTitle: t('$') },
      { title: t('CO2 Emissions Breakdown'), subTitle: t('Ton') },
    ],
    [t]
  )

  return (
    <BreakdownWrapper className="d-flex row justify-content-center">
      {consumptionBreakdownSt &&
        chartData.map((chart, index) => (
          <div key={index} className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
            <DrillDownDonutChart3Lv title={chart.title} subTitle={chart.subTitle} data={consumptionBreakdownSt} hasDescription />
          </div>
        ))}
    </BreakdownWrapper>
  )
}

export default BreakDown
