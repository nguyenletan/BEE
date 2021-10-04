import React, { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'
import _ from 'lodash'
import {
  calculate12MonthPeriod,
  calculateSameThingLastPeriod,
  calculateSameThingLastYear,
  formatNumber,
  getMonthName,
} from '../Utilities'
import EnergyConsumptionLineChartForGroupByDayOrWeek from './EnergyConsumptionLineChartForGroupByDayOrWeek'
import { getBreakdownByTime } from '../api/BuildidingAPI'
import { useParams } from 'react-router-dom'
import { useAuth } from '../AuthenticateProvider'
import { breakdownState, originalConsumptionBreakdownState } from '../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import HistoricalComparison from '../pages/building/components/HistoricalComparison'

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
  // margin-bottom: 30px;
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

  //margin-right: 30px;
  //margin-bottom: 50px;

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
    electricConsumptionsFromHistorizedLogs,
    energyPerformanceGroupBy,
    overallEnergyConsumptionInformation,
    prev12MonthsElectricityConsumptionsFromHistorizedLogs,
    prev24MonthsElectricityConsumptionsFromHistorizedLogs,
  } = props

  const { id } = useParams()

  const { user } = useAuth()

  let buildingEnergyUsageData = []

  if (props.energyConsumptions && props.energyConsumptions.length > 0) {
    buildingEnergyUsageData = _.reverse(_.take(props.energyConsumptions, 12)).map(x => {
      return {
        ...x,
        value: Math.round((x.monthlyValue / 1000)),
        label: getMonthName(x.month + 1) + ' ' + x.year,
      }
    })
  }

  const [the1stHistoricalComparison, setThe1stHistoricalComparison] = useState()

  const [the2ndHistoricalComparison, setThe2ndHistoricalComparison] = useState()

  const [the3rdHistoricalComparison, setThe3rdHistoricalComparison] = useState()

  let datasource = buildingEnergyUsageData

  const [barData, setBarData] = useState([])

  const [enableLabel, setEnableLabel] = useState(true)
  const [axisBottom, setAxisBottom] = useState({})

  const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(
    overallEnergyConsumptionInformation?.totalEnergyConsumption)
  const [totalEnergyCost, setTotalEnergyCost] = useState(overallEnergyConsumptionInformation?.totalEnergyCost)
  const [totalCarbonEmissions, setTotalCarbonEmissions] = useState(overallEnergyConsumptionInformation?.totalCarbonEmissions)

  const [breakdown, setBreakdown] = useRecoilState(breakdownState)
  const originalConsumptionBreakdown = useRecoilValue(originalConsumptionBreakdownState)

  useEffect(() => {
    if (electricConsumptionsFromHistorizedLogs &&
      electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByMonth.length > 0) {
      switch (energyPerformanceGroupBy) {
        case 'year':
          // eslint-disable-next-line react-hooks/exhaustive-deps
          datasource = electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByYear
          break
        case 'quarter':
          datasource = electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByQuarter
          break
        case 'week':
          datasource = electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByWeek
          break
        case 'day':
          datasource = electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByDay
          break
        case 'month':
        default:
          datasource = electricConsumptionsFromHistorizedLogs.overall.electricConsumptionGroupByMonth
          break
      }
    }

    if (datasource.length > 13 && props.energyPerformanceGroupBy !== 'year') {
      setEnableLabel(false)
      const tickValues = []
      for (let i = 0; i < datasource.length; i += 5) {
        tickValues.push(datasource[i].label)
      }
      setAxisBottom({ tickValues: tickValues })
    } else {
      setAxisBottom({})
      setEnableLabel(true)
      setTotalEnergyConsumption(overallEnergyConsumptionInformation?.totalEnergyConsumption)
      setTotalEnergyCost(overallEnergyConsumptionInformation?.totalEnergyCost)
      setTotalCarbonEmissions(overallEnergyConsumptionInformation?.totalEnergyCost)
    }
    setBarData([...datasource])
    setThe1stHistoricalComparison(null)
    setThe2ndHistoricalComparison(null)
    setThe3rdHistoricalComparison(null)
    setTotalEnergyConsumption(overallEnergyConsumptionInformation?.totalEnergyConsumption)
    setTotalEnergyCost(overallEnergyConsumptionInformation?.totalEnergyCost)
    setTotalCarbonEmissions(overallEnergyConsumptionInformation?.totalEnergyCost)

    // setSameThingLastYearComparison(calculateSameThingLastYear(electricConsumptionsFromHistorizedLogs.overall[],
    //   e.index, prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
    //   electricConsumptionsFromHistorizedLogs.overall, energyPerformanceGroupBy))

  }, [energyPerformanceGroupBy, electricConsumptionsFromHistorizedLogs])

  const selectBar = async (e) => {
    if (barData[e.index].isUnselected === false) { // deselected a bar
      const newBarData = barData.map(x => {
        return {
          ...x,
          isUnselected: undefined,
        }
      })
      setBarData([...newBarData])
      setThe1stHistoricalComparison(null)
      setThe2ndHistoricalComparison(null)
      setTotalEnergyConsumption(overallEnergyConsumptionInformation?.totalEnergyConsumption)
      setTotalEnergyCost(overallEnergyConsumptionInformation?.totalEnergyCost)
      setTotalCarbonEmissions(overallEnergyConsumptionInformation?.totalCarbonEmissions)
      setBreakdown({ ...breakdown, ...{ consumptionBreakdown: originalConsumptionBreakdown } })
    } else { // select a bar
      const newBarData = barData.map((x, index) => {
        return {
          ...x,
          isUnselected: e.index !== index,
        }
      })
      setBarData([...newBarData])
      setThe1stHistoricalComparison(
        calculateSameThingLastYear(e.value, e.index, prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
          electricConsumptionsFromHistorizedLogs.overall, energyPerformanceGroupBy))

      setThe2ndHistoricalComparison(
        calculateSameThingLastPeriod(e.value, e.index, prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
          electricConsumptionsFromHistorizedLogs.overall, energyPerformanceGroupBy))

      setThe3rdHistoricalComparison(
        calculate12MonthPeriod(e.value, e.index, prev24MonthsElectricityConsumptionsFromHistorizedLogs.overall,
          prev12MonthsElectricityConsumptionsFromHistorizedLogs.overall,
          electricConsumptionsFromHistorizedLogs.overall, energyPerformanceGroupBy))

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

      console.log('breakdown after click')
      console.log(breakdown)
      setBreakdown({ ...breakdown })

    }

    // switch (energyPerformanceGroupBy) {
    //   case 'year':
    //     barData[e.index].coolingValue = electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByYear[e.index].value
    //     break
    //   case 'quarter':
    //     barData[e.index].coolingValue = electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByQuarter[e.index].value
    //     break
    //   case 'week':
    //     barData[e.index].coolingValue = electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByWeek[e.index].value
    //     break
    //   case 'day':
    //     barData[e.index].cooling = electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByDay[e.index].value
    //     break
    //   case 'month':
    //   default:
    //     console.log(electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByMonth[e.index])
    //     barData[e.index].cooling = electricConsumptionsFromHistorizedLogs.coolingSystem.electricConsumptionGroupByMonth[e.index].value
    //     break
    // }

    //setSameMonthLastYearComparison(buildingEnergyUsageData[e.index]?.sameMonthLastYearComparison)
    //setLastMonthComparison(buildingEnergyUsageData[e.index]?.lastMonthComparison)

  }

  let keys = ['value', 'cooling']
  let index = 'label'

  const commonProps = {
    // width: 920,
    // height: 350,
    margin: { top: 0, right: 0, bottom: 100, left: 30 },
    data: barData, // generateCountriesData(keys, { size: 7 }),
    indexBy: index,
    keys,
    groupMode: 'group',
    borderRadius: '6px',
    borderColor: { from: 'color', modifiers: [['darker', 2.6]] },
    padding: 0.39,
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
      //console.log(data)
      if (data.isUnselected === true) {
        return '#d5dfa3'
      }
      return '#87972f'
    },
  }

  // const CustomBarComponent = (props) => {
  //   const { x, y, height } = props
  //
  //   const translateValue = `translate(${x + 23}, ${y})`
  //   const translateValue2 = `translate(0, ${height - 10})`
  //   return <g transform={translateValue}>
  //     <rect width={13} height={height} rx="7" ry="7" fill="#87972f"  stroke="#87972f"/>
  //     <rect width={13} height={10} fill="#87972f" stroke="#87972f" transform={translateValue2}/>
  //   </g>
  //
  // }

  return (
    <Wrapper className="">
      <HistoricalComparisonContainer className=" mt-5 row">

        <BuildingEnergyUsageWrapper className="col col-12 col-lg-8 col-xl-9 mb-5 mb-lg-0">

          <BuildingEnergyUsageChartTitle>Building Energy Usage (MWh)</BuildingEnergyUsageChartTitle>

          {(props.energyPerformanceGroupBy === 'week' || props.energyPerformanceGroupBy === 'day') &&
          <EnergyConsumptionLineChartForGroupByDayOrWeek data={barData} groupBy={props.energyPerformanceGroupBy}/>}

          {(props.energyPerformanceGroupBy === 'year' || props.energyPerformanceGroupBy === 'quarter' ||
            props.energyPerformanceGroupBy === 'month') &&
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
                {indexValue} <br/>
                {id}: <b>{value}</b>
              </div>
            )}
          />}
        </BuildingEnergyUsageWrapper>

        <SummaryBoxWrapper className="col col-12 col-lg-4 col-xl-3">
          <SummaryBox className="mb-3">
            <SummaryBoxTitle>Total Energy Consumption (MWh)</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalEnergyConsumption, 2)}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="mb-3">
            <SummaryBoxTitle>Total Energy Cost ($)</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalEnergyCost, 0)}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="mb-3 mb-lg-0">
            <SummaryBoxTitle>Total Carbon Emissions (Tons)</SummaryBoxTitle>
            <SummaryBoxValue>{formatNumber(totalCarbonEmissions)}</SummaryBoxValue>
          </SummaryBox>
        </SummaryBoxWrapper>

      </HistoricalComparisonContainer>

      <HistoricalComparison
        groupBy={energyPerformanceGroupBy}
        the1stHistoricalComparison={the1stHistoricalComparison}
        the2ndHistoricalComparison={the2ndHistoricalComparison}
        the3rdHistoricalComparison={the3rdHistoricalComparison}/>
    </Wrapper>
  )
}

BuildingHistorical.propTypes =
  {}

export default BuildingHistorical
