import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'
import _ from 'lodash'
import {
  calculate12MonthPeriod,
  calculateAverageSameDayInLast4Week,
  calculateDayLastWeek,
  calculatePrevDay,
  calculateSameThingLastPeriod,
  calculateSameThingLastYear,
  formatNumber,
  getMonthName,
} from 'Utilities'
import EnergyConsumptionLineChartForGroupByDayOrWeek from './EnergyConsumptionLineChartForGroupByDayOrWeek'
import { getBreakdownByTime } from 'api/BuildidingAPI'
import { useParams } from 'react-router-dom'
import { useAuth } from 'AuthenticateProvider'
import { breakdownState, originalConsumptionBreakdownState } from 'atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import HistoricalComparison from '../pages/building/components/HistoricalComparison'
import '../style/context-menu.css'
import { useTranslation } from 'react-i18next'

//Performance please - Reason since we are looking at the Energy, CO2, and Building U-Value and Energy Cost ($) it would be more appropriate.
// Thanks this is related to the Energy Performance, Comparison, Improve, Asset Reliability section of the Application -
// Thank You in advance
//
// update the data on the rigt boxes when selecting the bar

const SummaryBoxWrapper = styled.div`
  justify-content: flex-start;
  //width: 100%;
  padding-left: 0;
  padding-right: 0;
  @media (min-width: 1024px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (min-width: 1200px) {
    //width: 80%;
  }
  @media (min-width: 1400px) {
    flex-direction: column;
  }
`

const SummaryBox = styled.div`
  background-color: #fafafa;
  padding: 15px 20px;
  border-radius: 15px;
  width: 100%;
  min-width: 0;
  height: 100px;
  text-align: center;
  @media only screen and (min-width: 1024px) {
    height: 153px;
    text-align: left;
  }
  @media only screen and (min-width: 1440px) {
    min-width: 200px;
  }
`

const SummaryBoxTitle = styled.p`
  margin-bottom: 0;
`

const SummaryBoxValue = styled.p`
  color: var(--bs-primary);
  font-size: 36px;
  margin-bottom: 0;
`

const BuildingEnergyUsageWrapper = styled.div`
  background-color: #fafafa;
  padding: 25px 10px 0 10px;
  height: 491px;
  border-radius: 25px;
  @media (min-width: 1024px) {
    padding: 35px 30px 30px 30px;
  }
`

const BuildingEnergyUsageChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--dark);
`

const HistoricalComparisonContainer = styled.div`
  flex-wrap: wrap;
  @media (min-width: 1400px) {
    flex-wrap: nowrap;
  }
`

const Wrapper = styled.div`
  margin-bottom: 50px;
  margin-left: 15px;
  margin-right: 15px;
`

const BuildingHistorical = (props) => {
  const {
    energyConsumptions,
    electricConsumptionsFromHistorizedLogs,
    energyPerformanceGroupBy,
    overallEnergyConsumptionInformation,
    prev12MonthsElectricityConsumptionsFromHistorizedLogs,
    prev24MonthsElectricityConsumptionsFromHistorizedLogs,
  } = props

  const { id } = useParams()

  const { user } = useAuth()

  const { t } = useTranslation('buildingPerformance')

  const buildingEnergyUsageData = useMemo(() => {
    if (energyConsumptions && energyConsumptions.length > 0) {
      return _.reverse(_.take(props.energyConsumptions, 12)).map((x) => ({
        ...x,
        value: Math.round(x.monthlyValue / 1000),
        label: `${getMonthName(x.month + 1)} ${x.year}`,
      }))
    }
    return []
  }, [energyConsumptions, props.energyConsumptions])

  const [the1stHistoricalComparison, setThe1stHistoricalComparison] = useState()

  const [the2ndHistoricalComparison, setThe2ndHistoricalComparison] = useState()

  const [the3rdHistoricalComparison, setThe3rdHistoricalComparison] = useState()

  const datasource = useMemo(() => {
    if (electricConsumptionsFromHistorizedLogs?.overall) {
      switch (energyPerformanceGroupBy) {
        case 'year':
          return electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByYear
        case 'quarter':
          return electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByQuarter
        case 'week':
          return electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByWeek
        case 'day':
          return electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByDay
        case 'month':
        default:
          return electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByMonth
      }
    }
    return []
  }, [electricConsumptionsFromHistorizedLogs, energyPerformanceGroupBy])

  const [barData, setBarData] = useState([])

  const [enableLabel, setEnableLabel] = useState(true)
  const [axisBottom, setAxisBottom] = useState({})

  const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(overallEnergyConsumptionInformation?.totalEnergyConsumption)
  const [totalEnergyCost, setTotalEnergyCost] = useState(overallEnergyConsumptionInformation?.totalEnergyCost)
  const [totalCarbonEmissions, setTotalCarbonEmissions] = useState(overallEnergyConsumptionInformation?.totalCarbonEmissions)

  const [breakdown, setBreakdown] = useRecoilState(breakdownState)
  const originalConsumptionBreakdown = useRecoilValue(originalConsumptionBreakdownState)

  useEffect(() => {
    if (datasource.length > 13 && props.energyPerformanceGroupBy !== 'year') {
      setEnableLabel(false)
      const tickValues = datasource.filter((_, i) => i % 5 === 0).map((item) => item.label)
      setAxisBottom({ tickValues })
    } else {
      setAxisBottom({})
      setEnableLabel(true)
    }

    setBarData([...datasource])
    setThe1stHistoricalComparison(null)
    setThe2ndHistoricalComparison(null)
    setThe3rdHistoricalComparison(null)
    setTotalEnergyConsumption(overallEnergyConsumptionInformation?.totalEnergyConsumption)
    setTotalEnergyCost(overallEnergyConsumptionInformation?.totalEnergyCost)
    setTotalCarbonEmissions(overallEnergyConsumptionInformation?.totalCarbonEmissions)
  }, [datasource, props.energyPerformanceGroupBy, overallEnergyConsumptionInformation])

  const selectBar = useCallback(
    async (e) => {
      if (barData[e.index].isUnselected === false) {
        // deselected a bar
        const newBarData = barData.map((x) => ({
          ...x,
          isUnselected: undefined,
        }))
        setBarData([...newBarData])
        setThe1stHistoricalComparison(null)
        setThe2ndHistoricalComparison(null)
        setTotalEnergyConsumption(overallEnergyConsumptionInformation?.totalEnergyConsumption)
        setTotalEnergyCost(overallEnergyConsumptionInformation?.totalEnergyCost)
        setTotalCarbonEmissions(overallEnergyConsumptionInformation?.totalCarbonEmissions)
        setBreakdown({
          ...breakdown,
          ...{ consumptionBreakdown: originalConsumptionBreakdown },
        })
      } else {
        // select a bar
        const newBarData = barData.map((x, index) => ({
          ...x,
          isUnselected: e.index !== index,
        }))
        setBarData([...newBarData])
        setThe1stHistoricalComparison(
          calculateSameThingLastYear(
            e.value,
            e.index,
            prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
            electricConsumptionsFromHistorizedLogs.overall,
            energyPerformanceGroupBy
          )
        )

        setThe2ndHistoricalComparison(
          calculateSameThingLastPeriod(
            e.value,
            e.index,
            prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
            electricConsumptionsFromHistorizedLogs.overall,
            energyPerformanceGroupBy
          )
        )

        setThe3rdHistoricalComparison(
          calculate12MonthPeriod(
            e.value,
            e.index,
            prev24MonthsElectricityConsumptionsFromHistorizedLogs.overall,
            prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
            electricConsumptionsFromHistorizedLogs.overall,
            energyPerformanceGroupBy
          )
        )

        setTotalEnergyConsumption(e.data.value)
        setTotalEnergyCost(e.data.value * 0.23 * 1000)
        setTotalCarbonEmissions(e.data.value * 0.000208 * 1000)

        const idToken = await user.getIdToken()
        let breakdown
        switch (energyPerformanceGroupBy) {
          case 'year':
            breakdown = await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, e.data.year, '00', '00')
            break
          case 'quarter':
            breakdown = await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, e.data.year, e.data.quarter, '00')
            break
          // case 'week':
          //   await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, e.data.year, e.data.week, '00')
          //   break;
          case 'day':
            breakdown = await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, e.data.year, e.data.month, e.data.day)
            break
          case 'month':
          default:
            breakdown = await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, e.data.year, e.data.month, '01')
            break
        }
        setBreakdown({ ...breakdown })
      }
    },
    [
      barData,
      energyPerformanceGroupBy,
      user,
      id,
      breakdown,
      originalConsumptionBreakdown,
      overallEnergyConsumptionInformation,
      prev12MonthsElectricityConsumptionsFromHistorizedLogs,
      prev24MonthsElectricityConsumptionsFromHistorizedLogs,
      electricConsumptionsFromHistorizedLogs,
    ]
  )

  const selectLine = useCallback(
    async (day, value, index) => {
      const idToken = await user.getIdToken()
      let breakdown
      switch (energyPerformanceGroupBy) {
        case 'day':
          setTotalEnergyConsumption(value)

          setThe1stHistoricalComparison(
            calculatePrevDay(
              value,
              index,
              prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
              electricConsumptionsFromHistorizedLogs.overall
            )
          )

          setThe2ndHistoricalComparison(
            calculateDayLastWeek(
              value,
              index,
              prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
              electricConsumptionsFromHistorizedLogs.overall
            )
          )

          setThe3rdHistoricalComparison(
            calculateAverageSameDayInLast4Week(
              value,
              index,
              prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
              electricConsumptionsFromHistorizedLogs.overall
            )
          )

          setTotalEnergyCost(value * 0.23 * 1000)
          setTotalCarbonEmissions(value * 0.000208 * 1000)
          breakdown = await getBreakdownByTime(idToken, id, energyPerformanceGroupBy, day.getFullYear(), day.getMonth() + 1, day.getDate())
          setBreakdown({ ...breakdown })
          break
        default:
          break
      }
    },
    [energyPerformanceGroupBy, user, id, prev12MonthsElectricityConsumptionsFromHistorizedLogs, electricConsumptionsFromHistorizedLogs]
  )

  const keys = ['value', 'cooling']
  const index = 'label'

  const commonProps = useMemo(
    () => ({
      margin: { top: 0, right: 0, bottom: 100, left: 30 },
      data: barData, // generateCountriesData(keys, { size: 7 }),
      indexBy: index,
      keys,
      groupMode: 'group',
      borderRadius: '6px',
      borderColor: { from: 'color', modifiers: [['darker', 2.6]] },
      padding: 0.59,
      labelTextColor: 'white', // 'inherit:lighter(1.4)',
      labelSkipWidth: 0,
      labelSkipHeight: 16,
      enableLabel: enableLabel,
      animate: true,
      motionConfig: 'default',
      valueScale: { type: 'linear' },
      indexScale: { type: 'band', round: true },
      axisBottom: axisBottom,
      axisLeft: {
        tickSize: 2,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 10,
        legend: 'MWh',
        legendPosition: 'middle',
        legendOffset: -45,
      },
      // colors: { scheme: 'category10' },
      //colors: { datum: 'data.color' },
      colors: ({ id, data }) => {
        if (data.isUnselected === true) {
          return '#d5dfa3'
        }
        return '#87972f'
      },
    }),
    [barData, enableLabel, axisBottom]
  )

  return (
    <Wrapper className="">
      <HistoricalComparisonContainer className=" mt-5 row">
        <BuildingEnergyUsageWrapper className="col col-12 col-lg-8 col-xl-9 mb-5 mb-lg-0">
          <BuildingEnergyUsageChartTitle>{t('Building Energy Usage (MWh)')}</BuildingEnergyUsageChartTitle>

          {(props.energyPerformanceGroupBy === 'week' || props.energyPerformanceGroupBy === 'day') && (
            <EnergyConsumptionLineChartForGroupByDayOrWeek onSelectDay={selectLine} data={barData} groupBy={props.energyPerformanceGroupBy} />
          )}

          {(props.energyPerformanceGroupBy === 'year' ||
            props.energyPerformanceGroupBy === 'quarter' ||
            props.energyPerformanceGroupBy === 'month') && (
            <ResponsiveBar
              {...commonProps}
              onClick={selectBar}
              // barComponent={CustomBarComponent}
              tooltip={({ id, indexValue, value, color }) => (
                <div
                  style={{
                    padding: 8,
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 'normal',
                    background: '#373637cc',
                    borderRadius: '10px',
                    top: 0,
                  }}
                >
                  {indexValue} <br />
                  {t('Value')}: <b>{value}</b>
                </div>
              )}
              aria-label="Building Energy Usage Bar Chart"
            />
          )}
        </BuildingEnergyUsageWrapper>

        <SummaryBoxWrapper className="col col-12 col-lg-4 col-xl-3">
          <SummaryBox className="mb-3">
            <SummaryBoxTitle>{t('Total Energy Consumption (MWh)')}</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalEnergyConsumption, 2)}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="mb-3">
            <SummaryBoxTitle>{t('Total Energy Cost ($)')}</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalEnergyCost, 0)}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="mb-3 mb-lg-0">
            <SummaryBoxTitle>{t('Total Carbon Emissions (Tons)')}</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalCarbonEmissions)}</SummaryBoxValue>
          </SummaryBox>
        </SummaryBoxWrapper>
      </HistoricalComparisonContainer>

      <HistoricalComparison
        groupBy={energyPerformanceGroupBy}
        the1stHistoricalComparison={the1stHistoricalComparison}
        the2ndHistoricalComparison={the2ndHistoricalComparison}
        the3rdHistoricalComparison={the3rdHistoricalComparison}
      />
    </Wrapper>
  )
}

export default React.memo(BuildingHistorical)
