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

import { RecoilRoot, useRecoilCallback, useRecoilSnapshot } from 'recoil'
import { useEffect } from 'react'



const theme = createMuiTheme({
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
});

function DebugObserver(){
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

function DebugButton() {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    console.log('Atom values:');
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.log(node.key, value);
    }
  }, []);

  return <button onClick={onClick}>Dump State</button>
}

function App() {
  const {user, loading} = useAuth();
  if (loading) return null;
  if (!user) return <FirebaseAuth/>;

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <DebugObserver />
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
          <DebugButton/>
        </div>

      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
