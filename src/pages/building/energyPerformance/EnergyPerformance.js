import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import styled from 'styled-components'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import { formatNumber } from '../../../Utilities'

const BreakDownWrapper = styled.div`
  margin-bottom: 50px;
`

const EnergyPerformance = (props) => {
  console.log(props)

  const {
    electricConsumptions,
    annualCost,
    annualConsumption,
    annualCarbonEmissions,
    lastMonthComparison,
    periodOf12Month,
    breakDownCost,
    breakDownCO2Emissions,
    totalOperatingHours,
    coolingLoadForSpace,
    heatingLoadForSpace
  } = props

  console.log(heatingLoadForSpace)

  const breakDownConsumption = [
    { id: 'cooling', value: 30, color: '#636c2e' },
    { id: 'heating', value: 40, color: '#87972f' },
    { id: 'lighting', value: 20, color: '#acbf42' },
    { id: 'mechanical ventilation', value: 6, color: '#c1cf74' },
    { id: 'others', value: 4, color: '#d5dfa3' }]

  return (
    <>
      <BuildingHistorical energyConsumptions={electricConsumptions}
                          annualCost={annualCost}
                          annualConsumption={annualConsumption}
                          annualCarbonEmissions={annualCarbonEmissions}
                          lastMonthComparison={lastMonthComparison}
                          periodOf12Month={periodOf12Month}
                          totalOperatingHours={totalOperatingHours}
      />


      <BreakDownWrapper className="d-flex row justify-content-center">
        {breakDownConsumption && (
          <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
            <BreakDown
              title="Consumption Breakdown"
              subTitle="%"
              hasDescription
              data={breakDownConsumption}
            />
          </div>)}

        {breakDownCost && (
          <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
            <BreakDown
              title="Cost Breakdown"
              subTitle="%"
              data={breakDownCost}
              hasDescription
            />
          </div>
        )}

        {breakDownCO2Emissions && (
          <div className="col col-12 col-md-8 col-xl-4">
            <BreakDown
              title="CO2 Emissions Breakdown"
              subTitle="%"
              data={breakDownCO2Emissions}
              hasDescription
            />
          </div>
        )}
      </BreakDownWrapper>

      <ElectricalSystemInformation
        overallCoolingLoad={formatNumber(coolingLoadForSpace?.coolingLoad)}
        overallHeatingLoad={formatNumber(heatingLoadForSpace?.heatingLoad)}
        overallLightingLoad={electricConsumptions?.electricalSystemInformation?.overallLightingLoad}
        overallMechVentLoad={electricConsumptions?.electricalSystemInformation?.overallMechVentLoad}
        pvSystemInstalledCapacity={electricConsumptions?.electricalSystemInformation?.pvSystemInstalledCapacity}
      />

      {/*<IncidentalGains*/}
      {/*  roof={electricConsumptions.incidentalGains?.roof}*/}
      {/*  openings={electricConsumptions.incidentalGains?.openings}*/}
      {/*  wall={electricConsumptions.incidentalGains?.wall}*/}
      {/*  floor={electricConsumptions.incidentalGains?.floor}*/}
      {/*  plugLoads={electricConsumptions.incidentalGains?.plugLoads}*/}
      {/*/>*/}

    </>
  )
}

export default EnergyPerformance
