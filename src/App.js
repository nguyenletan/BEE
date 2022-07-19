import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from 'AuthenticateProvider'
import FirebaseAuth from './FirebaseAuthenticate'
import { EuiProvider } from '@elastic/eui'

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import 'analytics_log_event'
// import Login from './pages/login/Login';
import Portfolio from './pages/portfolio/Portfolio'
import Building from './pages/building/Building'
import Register from './pages/register/Register'
import TermOfService from './pages/TermsOfService'
import AddingBuilding from './pages/adding-building/AddingBuilding'
import { RecoilRoot, useRecoilCallback, useRecoilSnapshot } from 'recoil'
import { useEffect } from 'react'
import IFrame from 'iframes/IFrame'

function DebugObserver () {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

function DebugButton () {
  const onClick = useRecoilCallback(({ snapshot }) => async () => {
    console.log('Atom values:')
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node)
      console.log(node.key, value)
    }
  }, [])

  return <button onClick={onClick} className="visually-hidden">Dump State</button>
}

function App () {
  const { user, loading } = useAuth()
  const { pathname } = useLocation()

  let theme = createTheme({
    palette: {
      primary: {
        light: '#aed581',
        main: '#87972f',
        dark: '#33691e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  })

  theme = responsiveFontSizes(theme)

  if (loading) return null

  // const noAuthList = ['/iframe']

  if (!pathname.includes('/iframe') && !user) {
    return <FirebaseAuth/>
  }
  console.log(pathname)
  return (
    <ThemeProvider theme={theme}>
      <EuiProvider colorMode="light">
        <RecoilRoot>
          <DebugObserver/>
          <div className="App container-fluid gx-0">
            <Routes>
              <Route path="/" element={<Portfolio/>} exact/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/terms-of-service" element={<TermOfService/>}/>
              <Route path="/building" element={<Portfolio/>} exact/>
              <Route path="/building/:id/*" element={<Building/>}/>
              <Route path="/adding-building/*" element={<AddingBuilding/>}/>
              <Route path="/editing-building/:id/*" element={<AddingBuilding/>}/>
              <Route path="/iframe/*" element={<IFrame/>}/>
            </Routes>
            <DebugButton/>
            <footer className="mt-5">&nbsp;</footer>
          </div>
        </RecoilRoot>
      </EuiProvider>
    </ThemeProvider>
  )
}

export default App
