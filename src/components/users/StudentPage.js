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
            <li>
              <Link to="/my-courses" className="my-profile-nav-item">
                {t('users.learning')}
              </Link>
            </li>
            {/* Filed changed */}
            <li>
              <Link
                to={`/courses-by/${username}`}
                className="my-profile-nav-item"
              >
                {t('users.teaching')}
              </Link>
            </li>
            <li>
              <Link to="/myfavs" className="my-profile-nav-item">
                {t('users.wishlist')}
              </Link>
            </li>
            {/* <Link to="/" className="my-profile-nav-item">
              {t('users.chats')}
            </Link> */}
            <li>
              <Link to="/edit-user" className="my-profile-nav-item">
                {t('users.edit profile')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
