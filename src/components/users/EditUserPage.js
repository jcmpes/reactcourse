import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { aboutMe, editUser } from '../../api/auth';
import Layout from '../layout/Layout';
import { getIsLogged } from '../../store/selectors';
import EditUserForm from './EditUserForm';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUsernameAction } from '../../store/actions/get-user';

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

  return (
    <Layout>
      <h1>{t('Edit Profile')}</h1>
      <EditUserForm
        userDetails={details}
        onSubmit={onSubmit}
        setUserDetails={setDetails}
      />
    </Layout>
  );
};

export default EditUserPage;
