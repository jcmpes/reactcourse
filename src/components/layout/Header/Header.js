import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../../shared';
import { logout } from '../../../api/auth';
import { getAuth } from '../../../store/selectors';
import { authLogout } from '../../../store/actions/logout';
import { useDispatch, useSelector } from 'react-redux';
import FiltersForm from '../../FiltersForm/FiltersForm';
import useTranslation from 'next-translate/useTranslation'


const Header = () => {
  const { t } = useTranslation('common')

  const { isLogged } = useSelector(getAuth)
  const dispatch = useDispatch();
  const history = useRouter();
  const location = useRouter();
  const handleLogoutClick = () => {
    logout(); // clear local storage
    dispatch(authLogout()); // change isLogged state
    history.push('/');
  };

  return (
    <header className="header">
      <Link href="/" passHref>
        <Button>{t('header.home')}</Button>
      </Link>
      <Link href="/register" passHref>
          <Button>{t('header.register')}</Button>
      </Link>

      {isLogged ? (
        <Button onClick={handleLogoutClick}>{t('header.log out')}</Button>
      ) : (
        <Link href="/login" passHref>
            <Button>{t('header.log in')}</Button>
        </Link>
      )}

      <Link href={location.asPath} locale="en">
        <a>
          <Button>en</Button>
        </a>
      </Link>
      <Link href={location.asPath} locale="es">
        <a>
          <Button>es</Button>
        </a>
      </Link>

      <br />
      <Link href="/create" passHref>
          <Button>{t('header.create')}</Button>
      </Link>

      <Link href="/user" passHref>
          <Button>{t('header.user')}</Button>
      </Link>
      <FiltersForm />
    </header>
  );
};

export default Header;
