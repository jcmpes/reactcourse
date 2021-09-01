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
  const user = useSelector(getAuth);

  useEffect(() => {
    dispatch(getUserAction(user.username, history));
  }, [user.username, dispatch, history]);

  return (
    <Layout>
      <StudentPage
        username={user.username}
        avatar={user.avatar}
        favs={user.favs}
        purchased={user.purchased}
      />
    </Layout>
  );
};

export default User;
