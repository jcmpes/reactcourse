import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import userPortrait from '../../assets/img/user.png';
import './StudenPage.css';
const StudentPage = ({ username, avatar }) => {
  const { t } = useTranslation(['global']);

  return (
    <>
      <div class="frame">
        <div class="center">
          <div class="studenProfile">
            <div class="studenImage">
              <div class="circle-1"></div>
              <div class="circle-2"></div>
              <img
                src={avatar ? avatar : userPortrait}
                alt="user portrait"
                width="70"
                height="70"
              />
            </div>
            <div class="studenName">{username}</div>
            <p>{t('users.student')}</p>
            <div class="actions">
              <Link to="/edit-user" className="my-profile-nav-item">
                <button class="btn">{t('users.edit profile')}</button>
              </Link>
            </div>
          </div>

          <div class="stats">
            <div class="box">
              <Link to="/my-courses" className="my-profile-nav-item">
                <span class="value">{t('users.learning')}</span>
              </Link>
              {/* <span class="parameter">3</span> */}
            </div>
            <div class="box">
              <Link
                to={`/courses-by/${username}`}
                className="my-profile-nav-item"
              >
                <span class="value">{t('users.teaching')}</span>
              </Link>
              {/* <span class="parameter">0</span> */}
            </div>

            <div class="box">
              <Link to="/myfavs" className="my-profile-nav-item">
                <span class="value">{t('users.wishlist')}</span>
              </Link>
              {/* <span class="parameter">2</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
