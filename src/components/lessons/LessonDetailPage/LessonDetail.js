import React from 'react';
import { Twitter, Facebook } from 'react-social-sharing';
import { YoutubeEmbed } from '../../shared';
import { useTranslation } from 'react-i18next';

function LessonDetail({
  title,
  video,
  description,
  content,
  numFavs,
  username,
  image,
  lessons,
  number,
  avatar
}) {
  const lessonNumber = number + 1;
  const percent = (lessonNumber / lessons) * 100;

  const { t } = useTranslation(['global']);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card p-3">
            <div className="row p-3">
              <h4 className="col-10 card-title">
                {t('course.Lessons')} {lessonNumber}: {title}
              </h4>
            </div>
            <div className="col-12">
              <div className="videoInsert">
                <YoutubeEmbed video={video} />
              </div>
              <div className="col-12">
                <br />
                <h4 className="courseInstructorTitle">
                  {t('course.instructor')}
                </h4>
                <div className="row d-flex align-items-center">
                  <div className="detail-image ml-4">
                    <img
                      style={{
                        width: '75px',
                        height: '75px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                      src={avatar}
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <p>{username}</p>
                  </div>
                  <div className="col-12 mt-5">
                    <h4 className="card-text description">
                      {t('Description')}:
                    </h4>
                    <p>{description}</p>
                    <h4 className="mt-5 card-text description">
                      {t('course.Lesson content')}:
                    </h4>
                    <p>{content}</p>
                  </div>

                  {lessons ? (
                    <div className="col-12">
                      <h6>
                        {t('course.Lessons')} {lessonNumber} {t('of')} {lessons}
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: '#e43f7c',
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {t('course.Progress')}: {percent} %
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="deatail-sharer">
            <Facebook link={window.location.href} />
            <Twitter link={window.location.href} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;
