import React from 'react'
//import styled from 'styled-components'
// import { useParams } from 'react-router'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ImproveSubSystemPerformance from 'iframes/improve/Improve_SubSystemPerformance'
import ImproveBuildingEnergyPerformance from 'iframes/improve/Improve_SubSystemPerformance'
import ImproveCO2EmissionsPerformance from 'iframes/improve/Improve_CO2EmissionsPerformance'
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
      {/*<Redirect to={`/`}/>*/}
    </Switch>

  )
}

export default Iframe
