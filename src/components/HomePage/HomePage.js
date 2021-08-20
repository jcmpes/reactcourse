import React from 'react';
import Layout from '../layout/Layout';
import Scroll from '../shared/Scroll';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/logout';
import { getAuth } from '../../store/selectors';
import photo1 from '../../assets/img/photohome.jpg';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';

const HomePage = ({ auth, onLogout, ...props }) => {
  const { t, i18n } = useTranslation(['global']);

  return (
    <>
      <Layout {...props}>
        <Scroll showBellow={250} />
        <div className={styles.section1Container}>
          <div>
            <img className="photo1" src={photo1} alt="" />
          </div>
          <div className={styles.containerMessages1}>
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
