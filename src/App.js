import './App.css'
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'
import Login from './pages/login/Login'
import Portfolio from './pages/portfolio/Portfolio'
import Building from './pages/building/Building'
import Register from './pages/register/Register'
import TermOfService from './pages/TermsOfService'

function App () {
  return (
    <div className="App container-fluid">
      <Router>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/register" component={Register}/>
          <Route path="/terms-of-service" component={TermOfService}/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/building/:id" component={Building}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
