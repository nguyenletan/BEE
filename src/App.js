
import './App.css'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/login/Login'
import Portfolio from './pages/portfolio/Portfolio'

function App () {
  return (
    <div className="App container-fluid">
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/portfolio" component={Portfolio} exact/>
      </Switch>
    </div>
  )
}

export default App
