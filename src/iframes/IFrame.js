import React from 'react'
//import styled from 'styled-components'
// import { useParams } from 'react-router'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ImproveSubSystemPerformance from 'iframes/Improve_SubSystemPerformance'
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

      {/*<Redirect to={`/`}/>*/}
    </Switch>

  )
}

export default Iframe
