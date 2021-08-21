import React from 'react';
import Layout from '../layout/Layout';
import Scroll from '../shared/Scroll';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions/logout';
import { getAuth } from '../../store/selectors';
import photo1 from '../../assets/img/home1.jpg';
import photo2 from '../../assets/img/home2.jpg';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';
import { getCategories, getFilters } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { setFilters } from '../../store/actions/load-courses';
import { Link } from 'react-router-dom';

const HomePage = ({ auth, onLogout, ...props }) => {
  const { t, i18n } = useTranslation(['global']);
  const dispatch = useDispatch();
  const filter = useSelector(getFilters);
  const defaultFilters = {
    title: '',
    category: '',
    username: '',
    categories: [],
    price: [0, 600],
    limit: 10,
    skip: 0,
    sort: -1,
  };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, []);

  const categories = useSelector(getCategories);
  console.log(categories);

  const catElements = categories.map((cat) => (
    <Link className={styles.categoriesButtons} to="/search">
      <button
        key={cat._id}
        className={styles.categoriesButton}
        onClick={() => {
          console.log(cat.name);
          dispatch(setFilters({ ...defaultFilters, category: cat.name }));
        }}
      >
        {cat.name}
      </button>
    </Link>
  ));

  return (
    <>
      <Layout {...props}>
        <Scroll showBellow={250} />
        <div className={styles.section1Container}>
          <div>
            <img className="photo1" src={photo1} alt="" />
          </div>
          <div className={styles.containerMessages}>
            <div className={styles.msg1}>
              <strong>{t('home.Do you want to be a tutor?')}</strong>
            </div>
            <div className={styles.msg2}>
              <strong>{t('home.To become an instructor')}</strong>
            </div>
            <div className={styles.description1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </div>
            <button className={styles.starTeachingBtn}>
              {t('home.Start teaching')}
            </button>
          </div>
        </div>
        <br />
        <div>{t('header.categories')}</div>
        <div className={styles.categoriesButtons}>{catElements}</div>
        <br />
        <div className={styles.section2Container}>
          <div>
            <img className="photo2" src={photo2} alt="" />
          </div>
          <div className={styles.containerMessages}>
            <div className={styles.msg1_2}>
              <strong>{t('home.Find the best online tutor for you')}</strong>
            </div>
            <div className={styles.msg2_2}>
              <strong>{t('home.Build up your skills')}</strong>
            </div>
            <div className={styles.description1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </div>
            <button className={styles.starTeachingBtn}>
              {t('home.Search')}
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
