import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import IncidentalGains from '../../../components/IncidentalGains'
import styled from 'styled-components'

const BreakDownWrapper = styled.div`
  margin-bottom: 50px;
`

const EnergyPerformance = ({ data }) => {
  console.log(data)

  return (
    <>
      <BuildingHistorical energyConsumptions={data} />
      {(data && data.breakDownConsumption) && (
        <>
          <BreakDownWrapper className="d-flex row justify-content-center">
            <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
              <BreakDown
                title="Consumption Breakdown"
                subTitle="%"
                hasDescription
                data={data.breakDownConsumption}
              />
            </div>

            <div className="col col-12 col-md-8 col-xl-4 mb-5 mb-xl-0">
              <BreakDown
                title="Cost Breakdown"
                subTitle="%"
                data={data.breakDownCost}
                hasDescription
              />
            </div>

            <div className="col col-12 col-md-8 col-xl-4">
              <BreakDown
                title="CO2 Emissions Breakdown"
                subTitle="%"
                data={data.breakDownCO2Emissions}
                hasDescription
              />
            </div>
          </BreakDownWrapper>

          <ElectricalSystemInformation
            overallCoolingLoad={data.electricalSystemInformation?.overallCoolingLoad}
            overallHeatingLoad={data.electricalSystemInformation?.overallHeatingLoad}
            overallLightingLoad={data.electricalSystemInformation?.overallLightingLoad}
            overallMechVentLoad={data.electricalSystemInformation?.overallMechVentLoad}
            pvSystemInstalledCapacity={data.electricalSystemInformation?.pvSystemInstalledCapacity}
          />

          <IncidentalGains
            roof={data.incidentalGains?.roof}
            openings={data.incidentalGains?.openings}
            wall={data.incidentalGains?.wall}
            floor={data.incidentalGains?.floor}
            plugLoads={data.incidentalGains?.plugLoads}
          />
        </>)}
    </>
  )
}

export default EnergyPerformance
