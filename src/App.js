import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './components/auth/LoginPage';
import TemporaryWelcomePage from './components/TemporaryWelcomePage';
import {
        RegisterPage,
        ResetPasswordPage,
        ForgotPage,
        VerifyPage
        } from './components/auth'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/reset-password/:resetToken">
          <ResetPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPage />
        </Route>
        <Route path="/verify/:verifyToken">
          <VerifyPage />
        </Route> 
        <Route exact path="/">
          <TemporaryWelcomePage />
        </Route>
        <Route path="/404">
          <div
            style={{
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
