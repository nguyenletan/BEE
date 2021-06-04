import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useAuth} from './AuthenticateProvider';
import FirebaseAuth from './FirebaseAuthenticate';

//import Login from './pages/login/Login';
import Portfolio from './pages/portfolio/Portfolio';
import Building from './pages/building/Building';
import Register from './pages/register/Register';
import TermOfService from './pages/TermsOfService';


function App() {
  const {user, loading} = useAuth();
  if (loading) return null;
  if (!user) return <FirebaseAuth/>;
  return (
      <>
        <div className="App container-fluid">
          <Router>
            <Switch>
              <Route path="/" component={Portfolio} exact/>
              <Route path="/register" component={Register}/>
              <Route path="/terms-of-service" component={TermOfService}/>
              <Route path="/portfolio" component={Portfolio}/>
              <Route path="/building/:id" component={Building}/>
            </Switch>
          </Router>
        </div>
      </>
  );
}

export default App;
