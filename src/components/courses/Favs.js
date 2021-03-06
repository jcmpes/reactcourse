import React from 'react';
import Layout from '../layout/Layout';
import CoursesList from './CoursesList';
import { getUI } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { myFavsDetail } from '../../api/auth';
import Loading from '../shared/Loading/Loading';
import ErrorMessage from '../shared/ErrorMessage';
import { setErrorToNullAction } from '../../store/actions/reset-error';
import { apiCallLoadAction } from '../../store/actions/api-call';

export const Favs = (...props) => {
  const { loading, error } = useSelector(getUI);

  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);
  const dispatch = useDispatch();
  const resetError = () => {
    dispatch(setErrorToNullAction());
  };

  const [favs, setFavs] = React.useState([]);
  React.useEffect(() => {
    //dispatch(favoritesListAction(myFavsDetail, setFavs));
    dispatch(apiCallLoadAction(myFavsDetail, setFavs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout {...props}>
      {error && <ErrorMessage error={error} resetError={resetError} />}
      {loading && <Loading isLoading={true} />}
      <div style={{ fontSize: 25 }}>{t('My Favorite courses')}</div>
      <CoursesList courses={favs.courses} />
    </Layout>
  );
};

export default Favs;
