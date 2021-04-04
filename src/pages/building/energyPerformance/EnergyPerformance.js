import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import IncidentalGains from '../../../components/IncidentalGains'
import styled from 'styled-components'

const BreakDownWrapper = styled.div`
  margin-bottom: 50px;
`

const EnergyPerformance = ({ data }) => (
  <>
    <BuildingHistorical/>

    <BreakDownWrapper className="d-flex">
      <BreakDown title="Consumption Breakdown"
                 subTitle="%"
                 hasDescription={true}
                 data={data.breakDownConsumption}
      />
      <BreakDown title="Cost Breakdown"
                 subTitle="%"
                 data={data.breakDownCost}
                 hasDescription={true}
      />
      <BreakDown title="CO2 Emissions Breakdown"
                 subTitle="%"
                 data={data.breakDownCO2Emissions}
                 hasDescription={true}
      />
    </BreakDownWrapper>

    <ElectricalSystemInformation
      overallCoolingLoad={data.electricalSystemInformation.overallCoolingLoad}
      overallHeatingLoad={data.electricalSystemInformation.overallHeatingLoad}
      overallLightingLoad={data.electricalSystemInformation.overallLightingLoad}
      overallMechVentLoad={data.electricalSystemInformation.overallMechVentLoad}
      pvSystemInstalledCapacity={data.electricalSystemInformation.pvSystemInstalledCapacity}
    />

    <IncidentalGains
      roof={data.incidentalGains.roof}
      openings={data.incidentalGains.openings}
      wall={data.incidentalGains.wall}
      floor={data.incidentalGains.floor}
      plugLoads={data.incidentalGains.plugLoads}
    />
  </>
)

export default EnergyPerformance