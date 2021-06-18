import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useAuth} from './AuthenticateProvider';
import FirebaseAuth from './FirebaseAuthenticate';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//import Login from './pages/login/Login';
import Portfolio from './pages/portfolio/Portfolio';
import Building from './pages/building/Building';
import Register from './pages/register/Register';
import TermOfService from './pages/TermsOfService';
import AddingBuilding from './pages/adding-building/AddingBuilding';

import { RecoilRoot } from 'recoil';



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#87972f',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  const {user, loading} = useAuth();
  if (loading) return null;
  if (!user) return <FirebaseAuth/>;

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <div className="App container-fluid gx-0">
          <Router>
            <Switch>
              <Route path="/" component={Portfolio} exact/>
              <Route path="/register" component={Register}/>
              <Route path="/terms-of-service" component={TermOfService}/>
              <Route path="/portfolio" component={Portfolio}/>
              <Route path="/building/:id" component={Building}/>
              <Route path="/adding-building" component={AddingBuilding}/>
            </Switch>
          </Router>
        </div>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
