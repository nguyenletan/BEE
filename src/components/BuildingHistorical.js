import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'
import redUpImage from '../assets/images/red_up.jpg'
import greenDownImage from '../assets/images/green_down.jpg'

const SummaryBoxWrapper = styled.div`
  justify-content: flex-start;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  @media (min-width: 1024px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (min-width: 1200px) {
    width: 80%;
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
  color: var(--primary);
  font-size: 28px;
  margin-bottom: 0;
`

const BuildingEnergyUsageWrapper = styled.div`
  background-color: #fafafa;
  padding: 35px 30px 30px 30px;
  //margin-right: 30px;
  //margin-bottom: 50px;

  height: 491px;
  border-radius: 25px;
`

const BuildingEnergyUsageChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--dark);
`

const HistoricalComparison = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  margin-top: 30px;
  padding: 30px;
  @media (min-width: 1440px) {
    width: 80%;
    margin: 50px auto 0;
  }
  @media (min-width: 1920px){
    width: 70%;
  }
  
  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    margin: auto 0;
  }
`

const UpAndDownImg = styled.img`
  width: 60px;
  height: 60px;
`

const UpAndDownImgTitle = styled.h5`
  font-size: 0.8rem;
  margin-bottom: 2px;
`

const UpAndDownImgValue = styled.span`
  font-size: 1.1rem;
`

const HistoricalComparisonContainer = styled.div`
  flex-wrap: wrap;
  @media (min-width: 1400px) {
    flex-wrap: nowrap;
  }
`

const HistoricalComparisonWrapper = styled.div`
  margin-bottom: 50px;
  margin-left: 15px;
  margin-right: 15px;
`

const HistoricalComparisonInnerWrapper = styled.div`
  width: 108px;
  @media (min-width: 768px) {
    width: auto;
  }
`

const BuildingHistorical = (props) => {
  const buildingEnergyUsageData = [
    { month: 'Jan', energyUsage: '590' },
    { month: 'Feb', energyUsage: '490' },
    { month: 'Mar', energyUsage: '420' },
    { month: 'Apr', energyUsage: '420' },
    { month: 'May', energyUsage: '410' },
    { month: 'Jun', energyUsage: '375' },
    { month: 'Jul', energyUsage: '390' },
    { month: 'Aug', energyUsage: '405' },
    { month: 'Sep', energyUsage: '420' },
    { month: 'Oct', energyUsage: '470' },
    { month: 'Nov', energyUsage: '510' },
    { month: 'Dec', energyUsage: '575' }
  ]
  const keys = ['energyUsage']

  const annualEnergyConsumption = buildingEnergyUsageData.reduce(function (accumulator, currentValue, currentIndex, array) {
    return accumulator + parseInt(currentValue.energyUsage)
  }, 0)

  const annualEnergyCost = annualEnergyConsumption * 0.3043 * 1000
  const annualCarbonEmissions = annualEnergyConsumption * 0.624

  const historicalComparision = {
    sameMonthLastYear: 2.61,
    lastMonth: -1.3,
    _12MonthPeriod: 8
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

  const commonProps = {
    // width: 920,
    // height: 350,
    margin: { top: 0, right: 0, bottom: 100, left: 30 },
    data: buildingEnergyUsageData,//generateCountriesData(keys, { size: 7 }),
    indexBy: 'month',
    keys,
    padding: 0.66,
    labelTextColor: 'white',//'inherit:lighter(1.4)',
    labelSkipWidth: 0,
    labelSkipHeight: 16,
    animate: true,

  }

  //console.log(generateCountriesData(keys, { size: 7 }))

  return (
    <HistoricalComparisonWrapper className="">
      <HistoricalComparisonContainer className="d-flex mt-5 justify-content-start row">

        <BuildingEnergyUsageWrapper className="col-12 col-lg-8 col-xl-10 mb-5 mb-lg-0">
          <BuildingEnergyUsageChartTitle>Building Energy Usage (MWh)</BuildingEnergyUsageChartTitle>
          <ResponsiveBar {...commonProps}
                         colors={({ id, data }) => {
                           return '#87972f'
                         }}
            //barComponent={CustomBarComponent}
                         tooltip={({ id, value, color }) => (
                           <strong style={{ color: '#373637' }}>
                             {id}: {value} MWh/Yr
                           </strong>
                         )}
          />
        </BuildingEnergyUsageWrapper>
        <SummaryBoxWrapper className="d-flex col-12 col-lg-4 col-xl-2 flex-wrap">
          <SummaryBox className="flex-shrink-0 mb-3">
            <SummaryBoxTitle>Annual Energy Consumption (MWh/Yr)</SummaryBoxTitle>
            <SummaryBoxValue>{annualEnergyConsumption}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="flex-shrink-0 mb-3">
            <SummaryBoxTitle>Annual Energy Cost ($)</SummaryBoxTitle>
            <SummaryBoxValue>{annualEnergyCost}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="flex-shrink-0 mb-3 mb-lg-0">
            <SummaryBoxTitle>Annual Carbon Emissions (Tons/Yr)</SummaryBoxTitle>
            <SummaryBoxValue>{annualCarbonEmissions}</SummaryBoxValue>
          </SummaryBox>
        </SummaryBoxWrapper>

      </HistoricalComparisonContainer>

      <HistoricalComparison className="d-flex justify-content-around row">
        <h4 className="col col-12 col-md-3 mb-4 mb-lg-0 text-center">Historical<br/>Comparison</h4>
        <div
          className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap">
          <UpAndDownImg src={historicalComparision.sameMonthLastYear >= 0 ? redUpImage : greenDownImage}/>
          <HistoricalComparisonInnerWrapper className="ml-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
            <UpAndDownImgTitle>Same Month<br/>Last Year</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision.sameMonthLastYear >= 0 ? `+${historicalComparision.sameMonthLastYear}` : `${historicalComparision.sameMonthLastYear}`} MWh</UpAndDownImgValue>
          </HistoricalComparisonInnerWrapper>
        </div>
        <div
          className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap">
          <UpAndDownImg src={historicalComparision.lastMonth >= 0 ? redUpImage : greenDownImage}/>
          <HistoricalComparisonInnerWrapper className="ml-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
            <UpAndDownImgTitle>Last Month</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision.lastMonth >= 0 ? `+${historicalComparision.lastMonth}` : `${historicalComparision.lastMonth}`} MWh</UpAndDownImgValue>
          </HistoricalComparisonInnerWrapper>
        </div>
        <div
          className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap">
          <UpAndDownImg src={historicalComparision._12MonthPeriod >= 0 ? redUpImage : greenDownImage}/>
          <HistoricalComparisonInnerWrapper className="ml-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
            <UpAndDownImgTitle>12 Month Period</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision._12MonthPeriod >= 0 ? `+${historicalComparision._12MonthPeriod}` : `${historicalComparision._12MonthPeriod}`} MWh</UpAndDownImgValue>
          </HistoricalComparisonInnerWrapper>
        </div>
      </HistoricalComparison>
    </HistoricalComparisonWrapper>
  )

}

BuildingHistorical.propTypes = {}

export default BuildingHistorical
