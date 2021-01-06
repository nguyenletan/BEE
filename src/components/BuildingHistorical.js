import React from 'react'
import { Bar } from '@nivo/bar'
import styled from 'styled-components'
import redUpImage from '../assets/images/red_up.jpg'
import greenDownImage from '../assets/images/green_down.jpg'

const SummaryBox = styled.div`
  background-color: #fafafa;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 15px;
`

const SummaryBoxTitle = styled.p`
  margin-bottom: 0;

`
const SummaryBoxValue = styled.p`
  color: var(--primary);
  font-size: 34px;
  margin-bottom: 0;
`

const BuildingEnergyUsageWrapper = styled.div`
  background-color: #fafafa;
  padding: 25px 30px 0;
  margin-right: 30px;
  margin-bottom: 20px;
  border-radius: 25px;
`

const BuildingEnergyUsageChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 30px;
`

const HistoricalComparison = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  width: 70%;
  margin: 20px auto 30px;
  padding: 30px;

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

  const CustomBarComponent = (props) => {

    const { x, y, height } = props

    const translateValue = `translate(${x + 23}, ${y})`
    const translateValue2 = `translate(0, ${height - 10})`
    return <g transform={translateValue}>
      <rect width={13} height={height} rx="7" ry="7" fill="#87972f" strokeWidth="0" stroke="#87972f"/>
      <rect width={13} height={10} fill="#87972f" strokeWidth="0" stroke="#87972f" transform={translateValue2}/>
    </g>

  }

  const commonProps = {
    width: 920,
    height: 310,
    margin: { top: 0, right: 0, bottom: 20, left: 30 },
    data: buildingEnergyUsageData,//generateCountriesData(keys, { size: 7 }),
    indexBy: 'month',
    keys,
    padding: 0.2,
    labelTextColor: 'white',//'inherit:lighter(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
    animate: true,

  }

  //console.log(generateCountriesData(keys, { size: 7 }))

  return (
    <>

      <div className="d-flex mt-5">
        <BuildingEnergyUsageWrapper>
          <BuildingEnergyUsageChartTitle>Building Energy Usage (MWh)</BuildingEnergyUsageChartTitle>
          <Bar {...commonProps}
               colors={({ id, data }) => {
                 return '#87972f'
               }}
               barComponent={CustomBarComponent}
               tooltip={({ id, value, color }) => (
                 <strong style={{ color }}>
                   {id}: {value} MWh/Yr
                 </strong>
               )}
          />
        </BuildingEnergyUsageWrapper>
        <div className="d-flex flex-column">
          <SummaryBox className="flex-shrink-0">
            <SummaryBoxTitle>Annual Energy Consumption (MWh/Yr)</SummaryBoxTitle>
            <SummaryBoxValue>{annualEnergyConsumption}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="flex-shrink-0">
            <SummaryBoxTitle>Annual Energy Consumption (MWh/Yr)</SummaryBoxTitle>
            <SummaryBoxValue>{annualEnergyCost}</SummaryBoxValue>
          </SummaryBox>
          <SummaryBox className="flex-shrink-0">
            <SummaryBoxTitle>Annual Energy Consumption (MWh/Yr)</SummaryBoxTitle>
            <SummaryBoxValue>{annualCarbonEmissions}</SummaryBoxValue>
          </SummaryBox>
        </div>
      </div>
      <HistoricalComparison className="d-flex justify-content-around">
        <h4>Historical<br/>Comparison</h4>
        <div className="d-flex justify-content-start">
          <UpAndDownImg src={historicalComparision.sameMonthLastYear >= 0 ? redUpImage : greenDownImage}/>
          <div className="ml-2 d-flex flex-column justify-content-end">
            <UpAndDownImgTitle>Same Month<br/>Last Year</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision.sameMonthLastYear >= 0 ? `+${historicalComparision.sameMonthLastYear}` : `${historicalComparision.sameMonthLastYear}`} MWh</UpAndDownImgValue>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <UpAndDownImg src={historicalComparision.lastMonth >= 0 ? redUpImage : greenDownImage}/>
          <div className="ml-2 d-flex flex-column justify-content-end">
            <UpAndDownImgTitle>Last Month</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision.lastMonth >= 0 ? `+${historicalComparision.lastMonth}` : `${historicalComparision.lastMonth}`} MWh</UpAndDownImgValue>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <UpAndDownImg src={historicalComparision._12MonthPeriod >= 0 ? redUpImage : greenDownImage}/>
          <div className="ml-2 d-flex flex-column justify-content-end">
            <UpAndDownImgTitle>12 Month Period</UpAndDownImgTitle>
            <UpAndDownImgValue>{historicalComparision._12MonthPeriod >= 0 ? `+${historicalComparision._12MonthPeriod}` : `${historicalComparision._12MonthPeriod}`} MWh</UpAndDownImgValue>
          </div>
        </div>
      </HistoricalComparison>
    </>
  )

}

BuildingHistorical.propTypes = {}

export default BuildingHistorical