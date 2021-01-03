import './App.css'
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'
import Login from './pages/login/Login'
import Portfolio from './pages/portfolio/Portfolio'
import EnergyPerformance from './pages/energyPerformance/EnergyPerformance'

function App () {
  return (
    <div className="App container-fluid">
      <Router>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/energy-performance/:id" component={EnergyPerformance}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
