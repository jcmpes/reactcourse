import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { aboutMe, editUser } from '../../api/auth';
import Layout from '../layout/Layout';
import { getIsLogged } from '../../store/selectors';
import EditUserForm from './EditUserForm';
import { Redirect } from 'react-router-dom';

const EditUserPage = () => {
  const { t } = useTranslation(['global']);
  const isLogged = useSelector(getIsLogged);
  const [details, setDetails] = React.useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const onSubmit = (userDetails) => {
    editUser(userDetails).catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (isLogged) {
      aboutMe(setDetails);
    } else {
      return <Redirect to="/login" />;
    }
  }, []);

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
