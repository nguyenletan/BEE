import React, { useEffect } from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import { formatNumber } from 'Utilities'
import IncidentalGains from '../../../components/IncidentalGains'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { breakdownState, isDisplayPerformanceFilterState } from 'atoms'
import BreakDown from './components/BreakDown'

const EnergyPerformance = (props) => {
  const {
    overallEnergyConsumptionInformation,
    electricConsumptions,
    electricConsumptionsFromHistorizedLogs,
    prev12MonthsElectricityConsumptionsFromHistorizedLogs,
    prev24MonthsElectricityConsumptionsFromHistorizedLogs,
    energyPerformanceGroupBy,
    annualCoolingSystemConsumption,
    annualHeatingSystemConsumption,
    annualMechanicalVentilationSystemConsumption,
    annualLightingConsumption,
    pvSolarSystemLoad,
    consumptionBreakdown,
    incidentalGainsOtherInformation,
  } = props

  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  const [breakdownRecoilState, setBreakdownRecoilState] = useRecoilState(breakdownState)
  setIsDisplayPerformanceFilter(true)

  useEffect(() => {
    setBreakdownRecoilState({consumptionBreakdown: consumptionBreakdown})
  }, [consumptionBreakdown, setBreakdownRecoilState])

  return (
    <>
      <BuildingHistorical energyConsumptions={electricConsumptions}
                          electricConsumptionsFromHistorizedLogs={electricConsumptionsFromHistorizedLogs}
                          prev12MonthsElectricityConsumptionsFromHistorizedLogs={prev12MonthsElectricityConsumptionsFromHistorizedLogs}
                          prev24MonthsElectricityConsumptionsFromHistorizedLogs={prev24MonthsElectricityConsumptionsFromHistorizedLogs}
                          energyPerformanceGroupBy={energyPerformanceGroupBy}
                          overallEnergyConsumptionInformation={overallEnergyConsumptionInformation}
      />

      <BreakDown
        consumptionBreakdown={breakdownRecoilState?.consumptionBreakdown}
       />

      <ElectricalSystemInformation
        overallCoolingLoad={formatNumber(annualCoolingSystemConsumption?.coolingLoad, 2)}
        overallHeatingLoad={formatNumber(annualHeatingSystemConsumption?.heatingLoad, 2)}
        overallLightingLoad={formatNumber(annualLightingConsumption?.lightingLoad, 2)}
        overallMechVentLoad={formatNumber(annualMechanicalVentilationSystemConsumption?.airVolumeFlowRate, 2)}
        pvSystemInstalledCapacity={formatNumber(pvSolarSystemLoad / 1000, 2)}
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
