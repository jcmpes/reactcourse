import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { aboutMe, editUser, deleteAccount, logout } from '../../api/auth';
import Layout from '../layout/Layout';
import { getIsLogged } from '../../store/selectors';
import EditUserForm from './EditUserForm';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUsernameAction } from '../../store/actions/get-user';
import ConfirmButton from '../shared/ConfirmButton';
import { authLogout } from '../../store/actions/logout';
const EditUserPage = () => {
  const { t } = useTranslation(['global']);
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const [details, setDetails] = React.useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [confirm, setConfirm] = React.useState('');
  const handleConfirmChange = (ev) => {
    setConfirm((oldValue) => ev.target.value);
  };

  const performDelete = () => {
    setConfirm('');
    deleteAccount({ password: confirm }).then((result) => {
      if (result.deleted) {
        logout();
        dispatch(authLogout());
        console.log('logout');
      }
    });
  };
  const onSubmit = async (userDetails) => {
    const updated = await editUser(userDetails);

    if (updated && updated.username) {
      toast.success(t('Profile updated'));
      //TODO: Actualizar eusername en redux
      dispatch(updateUsernameAction(updated.username));
    } else {
      if (updated.data.error.indexOf('E11000 duplicate key error') !== -1) {
        if (updated.data.error.indexOf('username') !== -1) {
          toast.error(t('Username already taken'));
        } else {
          if (updated.data.error.indexOf('email') !== -1) {
            toast.error(t('email already taken'));
          }
        }
      } else {
        toast.error(t('Something went wrong'));
      }
    }
  };

  React.useEffect(() => {
    if (isLogged) {
      aboutMe(setDetails);
    } else {
      return <Redirect to="/login" />;
    }
  }, [isLogged]);

  return isLogged ? (
    <Layout>
      <h1>{t('Edit Profile')}</h1>
      <EditUserForm
        userDetails={details}
        onSubmit={onSubmit}
        setUserDetails={setDetails}
      />
      <br />

      <ConfirmButton
        iconButton={null}
        titleButton={t('Delete account')}
        okAction={performDelete}
        message={<div>Are you sure?</div>}
        subtitle={
          <div>
            Password:{' '}
            <input
              type="password"
              value={confirm}
              onChange={handleConfirmChange}
            />
            <br />
            This action will delete all of your courses and it's not reversible
          </div>
        }
      />
    </Layout>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default EditUserPage;
