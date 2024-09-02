/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import BuildingHistorical from '../../../components/BuildingHistorical'
import ElectricalSystemInformation from '../../../components/ElectricalSystemInformation'
import { formatNumber } from 'Utilities'
import IncidentalGains from '../../../components/IncidentalGains'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { breakdownState, isDisplayPerformanceFilterState } from 'atoms'
import BreakDown from './components/BreakDown'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'
import PerformanceBlock from '../comparision/components/PerformanceBlock'
import SubSystemPerformance from '../comparision/components/SubSystemPerformance'
import FacilityEnvelopeElementsComparison from '../comparision/components/FacilityEnvelopeElementsComparison'
import SubSystemComparison from '../comparision/components/SubSystemComparison'
import {
  subSystemPerformanceDataDE,
  subSystemPerformanceDataEN,
} from '../../../MockData'
import i18n from 'i18next'

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

  const setIsDisplayPerformanceFilter = useSetRecoilState(
    isDisplayPerformanceFilterState
  )
  const [breakdownRecoilState, setBreakdownRecoilState] =
    useRecoilState(breakdownState)
  const [subSystemPerformanceData, setSubSystemPerformanceData] = useState(
    subSystemPerformanceDataEN
  )
  setIsDisplayPerformanceFilter(true)
  const { user } = useAuth()

  useEffect(() => {
    if (i18n.language === 'en') {
      setSubSystemPerformanceData(subSystemPerformanceDataEN)
    } else {
      setSubSystemPerformanceData(subSystemPerformanceDataDE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Performance', idToken)
    }
    tracking()
  }, [])

  useEffect(() => {
    setBreakdownRecoilState({ consumptionBreakdown: consumptionBreakdown })
  }, [consumptionBreakdown, setBreakdownRecoilState])

  return (
    <>
      {/*<PerformanceBlock/>*/}

      {/*<div className="d-flex justify-content-start row">*/}
      {/*  <div className="col col-12 col-xl-5">*/}
      {/*    <SubSystemPerformance data={subSystemPerformanceData}/>*/}
      {/*  </div>*/}
      {/*  <div className="col col-12 col-lg-5 col-xl-3 mb-5 mb-lg-0">*/}
      {/*    <FacilityEnvelopeElementsComparison/>*/}
      {/*  </div>*/}
      {/*  <div className="col col-12 col-lg-7 col-xl-4">*/}
      {/*    <SubSystemComparison/>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <BuildingHistorical
        energyConsumptions={electricConsumptions}
        electricConsumptionsFromHistorizedLogs={
          electricConsumptionsFromHistorizedLogs
        }
        prev12MonthsElectricityConsumptionsFromHistorizedLogs={
          prev12MonthsElectricityConsumptionsFromHistorizedLogs
        }
        prev24MonthsElectricityConsumptionsFromHistorizedLogs={
          prev24MonthsElectricityConsumptionsFromHistorizedLogs
        }
        energyPerformanceGroupBy={energyPerformanceGroupBy}
        overallEnergyConsumptionInformation={
          overallEnergyConsumptionInformation
        }
      />

      <BreakDown
        consumptionBreakdown={breakdownRecoilState?.consumptionBreakdown}
      />

      <ElectricalSystemInformation
        overallCoolingLoad={formatNumber(
          annualCoolingSystemConsumption?.coolingLoad,
          2
        )}
        overallHeatingLoad={formatNumber(
          annualHeatingSystemConsumption?.heatingLoad,
          2
        )}
        overallLightingLoad={formatNumber(
          annualLightingConsumption?.lightingLoad,
          2
        )}
        overallMechVentLoad={formatNumber(
          annualMechanicalVentilationSystemConsumption?.airVolumeFlowRate,
          2
        )}
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
