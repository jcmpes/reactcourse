import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import userPortrait from '../../assets/img/user.png';

const StudentPage = ({ username }) => {
  const { t } = useTranslation(['global']);

  return (
    <>
      <div className="user-profile-section">
        <div className="user-profile-data">
          <div className="user-picture">
            <img src={userPortrait} alt="user portrait" width="80" />
          </div>
          <div className="user-details">
            <h1>{username}</h1>
            <p>{t('users.student')}</p>
          </div>
        </div>

        <div className="user-profile-nav">
          <ul>
            <Link to="/" className="my-profile-nav-item">
              {t('users.learning')}
            </Link>
            {/* Filed changed */}
            <Link
              to={`/courses-by/${username}`}
              className="my-profile-nav-item"
            >
              {t('users.teaching')}
            </Link>
            <Link to="/myfavs" className="my-profile-nav-item">
              {t('users.wishlist')}
            </Link>
            <Link to="/" className="my-profile-nav-item">
              {t('users.chats')}
            </Link>
            <Link to="/edit-user" className="my-profile-nav-item">
              {t('users.edit profile')}
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
