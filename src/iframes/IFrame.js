import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ImproveSubSystemPerformance from 'iframes/improve/Improve_SubSystemPerformance'
import ImproveBuildingEnergyPerformance from 'iframes/improve/Improve_BuildingEnergyPerformance'
import ImproveCO2EmissionsPerformance from 'iframes/improve/Improve_CO2EmissionsPerformance'
import ComparisonPerformanceComparison from 'iframes/comparison/Comparison_PerformanceComparison'
import ImprovePayback from 'iframes/improve/Improve_Payback'
import ComparisonSubSystemPerformance
  from './comparison/Comparison_SubSystemPerformance'
// import { useAuth } from 'AuthenticateProvider'


const Iframe = () => {
  // const { id } = useParams()
  // const { user } = useAuth()
  // const { path } = useRouteMatch()
  return (
    <Routes>
      <Route path={`improve-subsystem-performance`} element={<ImproveSubSystemPerformance />} />

      <Route path={`improve-building-energy-performance`} element={<ImproveBuildingEnergyPerformance />} />

      <Route path={`improve-co2-emission-performance`} element={<ImproveCO2EmissionsPerformance />} />

      <Route path={`comparison-building-subsystem-performance`} element={<ComparisonPerformanceComparison />} />


      <Route path={`comparison-subsystem-performance`} element={<ComparisonSubSystemPerformance />} />


      <Route path={`improve-payback`} element={<ImprovePayback />} />

      {/*<Redirect to={`/`}/>*/}
    </Routes>

  )
}

export default Iframe
