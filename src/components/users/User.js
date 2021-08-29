import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserAction } from '../../store/actions/get-user';
import { getAuth } from '../../store/selectors';
import Layout from '../layout/Layout';
import StudentPage from './StudentPage';

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, avatar } = useSelector(getAuth);

  useEffect(() => {
    dispatch(getUserAction(username, history));
  }, [username, dispatch, history]);

  return (
    <Layout>
      <StudentPage username={username} avatar={avatar} />
    </Layout>
  );
};

export default User;
