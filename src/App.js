import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from './api/NotFoundPage';
import { Suspense } from 'react';
import LoginPage from './components/auth/LoginPage';
import TemporaryWelcomePage from './components/TemporaryWelcomePage';
import {
  RegisterPage,
  ResetPasswordPage,
  ForgotPage,
  VerifyPage,
} from './components/auth';
import { NewCoursePage } from './components/courses/NewCoursePage';
import './App.css';

import './config/i18next-config';
import CoursePage from './components/courses/CourseDetailPage/CoursePage';

function Translations() {
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
        <Route path="/courses/:courseSlug">
          <CoursePage />
        </Route>
        <Route path="/create">
          <NewCoursePage />
        </Route>
        <Route exact path="/">
          <TemporaryWelcomePage />
        </Route>
        <Route exact path="/404">
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback="Loading translations...">
      <Translations />
    </Suspense>
  );
}

export default App;
