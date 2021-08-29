import React from 'react';
import { useTranslation } from 'react-i18next';
import { myPurchases } from '../../api/auth';
import CoursesList from '../courses/CoursesList';
import Layout from '../layout/Layout';

export const MyCourses = () => {
  const { t } = useTranslation(['global']);

  const [purchases, setPurchases] = React.useState([]);
  const getPurchases = async () => {
    return await myPurchases();
  };
  React.useEffect(() => {
    getPurchases().then(setPurchases);
  }, []);
  console.log(purchases);
  return (
    <div>
      <Layout>
        <h1>{t('Purchased courses')}</h1>
        <CoursesList courses={purchases} />
      </Layout>
    </div>
  );
};
