import React from 'react';
import { useTranslation } from 'react-i18next';
import { myPurchases } from '../../api/auth';
import CoursesList from '../courses/CoursesList';
import Layout from '../layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { getUi } from '../../store/selectors';
import Loading from '../shared/Loading/Loading';
import ErrorMessage from '../shared/ErrorMessage';
import { apiCallLoadAction } from '../../store/actions/api-call';
import { setErrorToNullAction } from '../../store/actions/favorites';

export const MyCourses = () => {
  const { t } = useTranslation(['global']);
  const { loading, error } = useSelector(getUi);
  const dispatch = useDispatch();

  const [purchases, setPurchases] = React.useState([]);
  const resetError = () => {
    dispatch(setErrorToNullAction());
  };

  React.useEffect(() => {
    dispatch(apiCallLoadAction(myPurchases, setPurchases));
  }, [dispatch]);

  return (
    <div>
      <Layout>
        <h1>{t('Purchased courses')}</h1>
        {loading && <Loading isLoading={true} />}
        {error && <ErrorMessage error={error} resetError={resetError} />}
        {!error && <CoursesList courses={purchases} />}
      </Layout>
    </div>
  );
};
