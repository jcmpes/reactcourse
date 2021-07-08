import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import TemporaryWelcomePage from './components/TemporaryWelcomePage';
import RegisterPage from './components/auth/RegisterPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import ForgotPage from './components/auth/ForgotPage/ForgotPage';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();

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
