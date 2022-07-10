import React from 'react'
//import styled from 'styled-components'
// import { useParams } from 'react-router'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ImproveSubSystemPerformance from 'iframes/improve/Improve_SubSystemPerformance'
import ImproveBuildingEnergyPerformance from 'iframes/improve/Improve_BuildingEnergyPerformance'
import ImproveCO2EmissionsPerformance from 'iframes/improve/Improve_CO2EmissionsPerformance'
import ComparisonPerformanceComparison from 'iframes/comparison/Comparison_PerformanceComparison'
import ImprovePayback from 'iframes/improve/Improve_Payback'
// import { useAuth } from 'AuthenticateProvider'


const Iframe = () => {
  // const { id } = useParams()
  // const { user } = useAuth()
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/improve-subsystem-performance`}>
        <ImproveSubSystemPerformance/>
      </Route>
      <Route path={`${path}/improve-building-energy-performance`}>
        <ImproveBuildingEnergyPerformance/>
      </Route>
      <Route path={`${path}/improve-co2-emission-performance`}>
        <ImproveCO2EmissionsPerformance/>
      </Route>
      <Route path={`${path}/comparison-building-subsystem-performance`}>
        <ComparisonPerformanceComparison/>
      </Route>
      <Route path={`${path}/improve-payback`}>
        <ImprovePayback />
      </Route>
      {/*<Redirect to={`/`}/>*/}
    </Switch>

  )
}

export default Iframe
