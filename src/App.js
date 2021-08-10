import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFoundPage from './api/NotFoundPage';
import { Suspense } from 'react';
import LoginPage from './components/auth/LoginPage';
import WelcomePage from './components/WelcomePage';
import {
  RegisterPage,
  ResetPasswordPage,
  ForgotPage,
  VerifyPage,
} from './components/auth';
import { NewCoursePage } from './components/courses/NewCoursePage';
import User from './components/users';
import UserCourse from './components/courses/UserCourse/UserCourse';
import Favs from './components/courses/Favs';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import './config/i18next-config';
import CoursePage from './components/courses/CourseDetailPage/CoursePage';
import { toast, ToastContainer } from 'react-toastify';
import EditCoursePage from './components/courses/EditCoursePage/EditCoursePage';
import LessonPage from './components/lessons/LessonDetailPage/LessonPage';
import EditUserPage from './components/users/EditUserPage';

function Translations() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route exact path="/edit-user">
          <EditUserPage />
        </Route>
        <Route path="/courses-by/:username">
          <UserCourse />
        </Route>
        <Route path="/myfavs">
          <Favs />
        </Route>
        <Route path="/reset-password/:resetToken">
          <ResetPasswordPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPage />
        </Route>
        <Route path="/verify/:verifyToken">
          <VerifyPage />
        </Route>
        <Route path="/courses">
          <Route path={`/courses/:courseSlug`}>
            <Route exact path={`/courses/:courseSlug/:lessonSlug`}>
              <LessonPage />
            </Route>
            <Route exact path="/courses/:courseSlug">
              <CoursePage />
            </Route>
          </Route>
          <Route exact path="/">
            <WelcomePage />
          </Route>
        </Route>
        <Route path="/create">
          <NewCoursePage />
        </Route>
        <Route path="/edit/:courseSlug">
          <EditCoursePage />
        </Route>
        <Route exact path="/">
          <WelcomePage />
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
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </Suspense>
  );
}

export default App;
