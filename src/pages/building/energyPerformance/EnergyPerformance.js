import React from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import BreakDown from '../../../components/BreakDown'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import IncidentalGains from '../../../components/IncidentalGains'

const EnergyPerformance = ({ data }) => (
  <>
    <BuildingHistorical/>

    <div className="d-flex mb-4">
      <BreakDown title="Consumption Breakdown"
                 subTitle="%"
                 data={data.breakDownConsumption}
      />
      <BreakDown title="Cost Breakdown"
                 subTitle="%"
                 data={data.breakDownCost}
      />
      <BreakDown title="CO2 Emissions Breakdown"
                 subTitle="%"
                 data={data.breakDownCO2Emissions}
      />
    </div>

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