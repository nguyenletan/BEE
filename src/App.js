
import './App.css'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './pages/login/Login'

function App () {
  return (
    <div className="App container">
      <Switch>
        <Route path="/" component={Login} exact/>
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App
