import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import IncidentalGains from '../../../components/IncidentalGains'
import styled from 'styled-components'

const BreakDownWrapper = styled.div`
  margin-bottom: 50px;
`

const EnergyPerformance = (props) => {
  // console.log(electricConsumptions)

  const {
    electricConsumptions,
    annualCost,
    annualConsumption,
    annualCarbonEmissions,
    lastMonthComparison,
    periodOf12Month,
  } = props

  return (
    <>
      <BuildingHistorical energyConsumptions={electricConsumptions}
                          annualCost={annualCost}
                          annualConsumption={annualConsumption}
                          annualCarbonEmissions={annualCarbonEmissions}
                          lastMonthComparison={lastMonthComparison}
                          periodOf12Month={periodOf12Month}/>

      {(electricConsumptions && electricConsumptions.breakDownConsumption) && (
        <>
          <BreakDownWrapper className="d-flex row justify-content-center">
            <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
              <BreakDown
                title="Consumption Breakdown"
                subTitle="%"
                hasDescription
                data={electricConsumptions.breakDownConsumption}
              />
            </div>

            <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
              <BreakDown
                title="Cost Breakdown"
                subTitle="%"
                data={electricConsumptions.breakDownCost}
                hasDescription
              />
            </div>

            <div className="col col-12 col-md-8 col-xl-4">
              <BreakDown
                title="CO2 Emissions Breakdown"
                subTitle="%"
                data={electricConsumptions.breakDownCO2Emissions}
                hasDescription
              />
            </div>
          </BreakDownWrapper>

          <ElectricalSystemInformation
            overallCoolingLoad={electricConsumptions.electricalSystemInformation?.overallCoolingLoad}
            overallHeatingLoad={electricConsumptions.electricalSystemInformation?.overallHeatingLoad}
            overallLightingLoad={electricConsumptions.electricalSystemInformation?.overallLightingLoad}
            overallMechVentLoad={electricConsumptions.electricalSystemInformation?.overallMechVentLoad}
            pvSystemInstalledCapacity={electricConsumptions.electricalSystemInformation?.pvSystemInstalledCapacity}
          />

          <IncidentalGains
            roof={electricConsumptions.incidentalGains?.roof}
            openings={electricConsumptions.incidentalGains?.openings}
            wall={electricConsumptions.incidentalGains?.wall}
            floor={electricConsumptions.incidentalGains?.floor}
            plugLoads={electricConsumptions.incidentalGains?.plugLoads}
          />
        </>)}
    </>
  )
}

export default EnergyPerformance
