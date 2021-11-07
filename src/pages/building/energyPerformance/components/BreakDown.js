import DrillDownDonutChart3Lv from '../../../../components/DrillDownDonutChart3Lv'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  breakDownLevelState,
  consumptionBreakdownState,
  isBreakDownDrillDownState,
  selectedSubBreakdownState,
} from 'atoms'
import { useTranslation } from 'react-i18next'

const BreakdownWrapper = styled.div`
  margin-bottom: 50px;
`

const BreakDown = (props) => {

  const {
    consumptionBreakdown,
  } = props

  const { t } = useTranslation('buildingPerformance')

  const setBreakDownLevel = useSetRecoilState(breakDownLevelState)
  const setIsBreakDownDrillDown = useSetRecoilState(isBreakDownDrillDownState)
  const setSelectedSubBreakdown =  useSetRecoilState(selectedSubBreakdownState)
  const [consumptionBreakdownSt, setConsumptionBreakdownSt] =  useRecoilState(consumptionBreakdownState)

  useEffect(() => {
    setConsumptionBreakdownSt(consumptionBreakdown)
    setSelectedSubBreakdown(null)
    setBreakDownLevel(0)
    setIsBreakDownDrillDown(false)
  }, [consumptionBreakdown, setBreakDownLevel, setConsumptionBreakdownSt, setIsBreakDownDrillDown, setSelectedSubBreakdown])

  return (
    <BreakdownWrapper className="d-flex row justify-content-center">
      {consumptionBreakdownSt && (
        <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
          <DrillDownDonutChart3Lv
            title={t("Consumption Breakdown")}
            subTitle="MWh"
            hasDescription
            data={consumptionBreakdownSt}
          />
        </div>)
      }

      {consumptionBreakdownSt && (
        <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
          <DrillDownDonutChart3Lv
            title={t("Cost Breakdown")}
            subTitle="$"
            data={consumptionBreakdownSt}
            hasDescription
          />
        </div>
      )}

      {consumptionBreakdownSt && (
        <div className="col col-12 col-md-8 col-xl-4">
          <DrillDownDonutChart3Lv
            title={t("CO2 Emissions Breakdown")}
            subTitle={t("Ton")}
            data={consumptionBreakdownSt}
            hasDescription
          />
        </div>
      )}
    </BreakdownWrapper>
  )
}

export default BreakDown