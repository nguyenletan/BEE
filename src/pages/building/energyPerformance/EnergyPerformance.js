import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import styled from 'styled-components'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import { formatNumber } from '../../../Utilities'
import IncidentalGains from '../../../components/IncidentalGains'

const BreakdownWrapper = styled.div`
  margin-bottom: 50px;
`

const EnergyPerformance = (props) => {
  // console.log(props)

  const {
    electricConsumptions,
    annualCost,
    annualConsumption,
    annualCarbonEmissions,
    lastMonthComparison,
    periodOf12Month,
    totalOperatingHours,
    annualCoolingSystemConsumption,
    annualHeatingSystemConsumption,
    annualMechanicalVentilationSystemConsumption,
    annualLightingConsumption,
    pvSolarSystemLoad,
    consumptionBreakdown,
    costBreakdown,
    co2EmissionsBreakdown,
    incidentalGainsOtherInformation
  } = props


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

      <BreakdownWrapper className="d-flex row justify-content-center">
        {consumptionBreakdown && (
          <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
            <BreakDown
              title="Consumption Breakdown"
              subTitle="%"
              hasDescription
              data={consumptionBreakdown}
            />
          </div>)}

        {costBreakdown && (
          <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
            <BreakDown
              title="Cost Breakdown"
              subTitle="%"
              data={costBreakdown}
              hasDescription
            />
          </div>
        )}

        {co2EmissionsBreakdown && (
          <div className="col col-12 col-md-8 col-xl-4">
            <BreakDown
              title="CO2 Emissions Breakdown"
              subTitle="%"
              data={co2EmissionsBreakdown}
              hasDescription
            />
          </div>
        )}
      </BreakdownWrapper>

      <ElectricalSystemInformation
        overallCoolingLoad={formatNumber(annualCoolingSystemConsumption?.coolingLoad, 2)}
        overallHeatingLoad={formatNumber(annualHeatingSystemConsumption?.heatingLoad, 2)}
        overallLightingLoad={formatNumber(annualLightingConsumption?.lightingLoad, 2)}
        overallMechVentLoad={formatNumber(annualMechanicalVentilationSystemConsumption?.airVolumeFlowRate, 2)}
        pvSystemInstalledCapacity={formatNumber(pvSolarSystemLoad, 2)}
      />

      <IncidentalGains
        roof={incidentalGainsOtherInformation?.roof}
        openings={incidentalGainsOtherInformation?.openings}
        wall={incidentalGainsOtherInformation?.wall}
        floor={incidentalGainsOtherInformation?.floor}
        // plugLoads={incidentalGainsOtherInformation?.plugLoads}
      />

    </>
  )
}

export default EnergyPerformance
