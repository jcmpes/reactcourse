import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFoundPage from './api/NotFoundPage';
import { Suspense } from 'react';
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';
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
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';

import './config/i18next-config';
import CoursePage from './components/courses/CourseDetailPage/CoursePage';
import { toast, ToastContainer } from 'react-toastify';
import EditCoursePage from './components/courses/EditCoursePage/EditCoursePage';
import LessonPage from './components/lessons/LessonDetailPage/LessonPage';
import EditUserPage from './components/users/EditUserPage';
import Loading from './components/shared/Loading/Loading';
import CheckoutPage from './components/purchases/CheckoutPage';

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
        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <PrivateRoute exact path="/edit-user">
          <EditUserPage />
        </PrivateRoute>
        <Route path="/courses-by/:username">
          <UserCourse />
        </Route>
        <PrivateRoute path="/myfavs">
          <Favs />
        </PrivateRoute>
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
          <Route exact path="/search">
            <SearchPage />
          </Route>
        </Route>
        <PrivateRoute path="/create">
          <NewCoursePage />
        </PrivateRoute>
        <PrivateRoute path="/edit/:courseSlug">
          <EditCoursePage />
        </PrivateRoute>
        <PrivateRoute path="/checkout">
          <CheckoutPage />
        </PrivateRoute>
        <Route exact path="/search">
          <SearchPage />
        </Route>
        <Route exact path="/">
          <HomePage />
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
    <Suspense fallback={<Loading isLoading={true} />}>
      <Translations />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </Suspense>
  );
}

export default App;
