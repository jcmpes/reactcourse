import Link from 'next/link';
import MyButton from '../../shared/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../../store/actions/logout';
import { getAuth } from '../../../store/selectors';

const AuthButton = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(authLogout());
  };

  const { isLogged } = useSelector(getAuth);

  const props = isLogged
    ? { onClick: handleLogoutClick, children: 'Log out' }
    : {
        as: Link,
        to: '/login',
        children: 'Log in',
      };

  return <MyButton {...props} />;
};

export default AuthButton;
