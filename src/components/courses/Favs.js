import React from 'react';
import Layout from '../layout/Layout';
import CoursesList from './CoursesList';
import { getUI } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { myFavsDetail } from '../../api/auth';

export const Favs = (...props) => {
  const { loading, error } = useSelector(getUI);

  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

  const [favs, setFavs] = React.useState([]);
  React.useEffect(() => {
    myFavsDetail(setFavs);
  }, []);

  return error || loading ? (
    <div style={{ fontSize: 20 }}>🤷‍♂️</div>
  ) : (
    <Layout {...props}>
      <div style={{ fontSize: 25 }}>{t('My Favorite courses')}</div>
      <CoursesList courses={favs.courses} />
    </Layout>
  );
};

export default Favs;
