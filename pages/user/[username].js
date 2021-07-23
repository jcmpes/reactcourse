import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../../src/store/actions/get-user';
import { getUsername } from '../../src/store/selectors';
import StudentPage from '../../src/components/users/StudentPage';

const User = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const username = useSelector(getUsername);
  
  return (

      <StudentPage username={username} />

  );
};

export default User;