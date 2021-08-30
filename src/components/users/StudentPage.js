import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import userPortrait from '../../assets/img/user.png';
import './StudenPage.css';
const StudentPage = ({ username, avatar, favs, purchased }) => {
  const { t } = useTranslation(['global']);

  return (
    <>
      <div className="frame">
        <div className="center">
          <div className="studenProfile">
            <div className="studenImage">
              <div className="circle-1"></div>
              <div className="circle-2"></div>
              <img
                src={avatar ? avatar : userPortrait}
                alt="user portrait"
                width="70"
                height="70"
              />
            </div>
            <div className="studenName">{username}</div>
            <p>{t('users.student')}</p>
            <div className="actions">
              <Link to="/edit-user" className="my-profile-nav-item">
                <button className="btn">{t('users.edit profile')}</button>
              </Link>
            </div>
          </div>

          <div className="stats">
            <div className="box">
              <Link to="/my-courses" className="my-profile-nav-item">
                <span className="value">{t('users.learning')}</span>
              </Link>
              <span className="parameter">{purchased.length}</span>
            </div>
            <div className="box">
              <Link
                to={`/courses-by/${username}`}
                className="my-profile-nav-item"
              >
                <span className="value">{t('users.teaching')}</span>
              </Link>
              {/* <span class="parameter">0</span> */}
            </div>

            <div className="box">
              <Link to="/myfavs" className="my-profile-nav-item">
                <span className="value">{t('users.wishlist')}</span>
              </Link>
              <span className="parameter">{favs.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
