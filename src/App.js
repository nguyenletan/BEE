
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
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </div>
  )
}

export default App
