import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './components/auth/LoginPage'
import TemporaryWelcomePage from './components/TemporaryWelcomePage'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <TemporaryWelcomePage />
          </Route>
          <Route path="/404">
            <div style={{
              textAlign: 'center',
              fontSize: 40,
            }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
