import { Twitter, Facebook } from 'react-social-sharing';
import { YoutubeEmbed } from '../../shared';
import { useTranslation } from 'react-i18next';
import './CourseDetail.css';

function CourseDetail({
  title,
  video,
  description,
  content,
  image,
  lessons,
  slug,
  numFavs,
  course,
  user,
  price,
}) {
  console.log(lessons);

  const { t } = useTranslation(['global']);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card">
            <div className="row">
              <h4 className="col-11 card-title">{title}</h4>
              <div className="favoriteDetail">🖤</div>
            </div>
            <div className="row m-3">
              <div className="col-12 col-sm-6">
                <p className="card-text description">{content}</p>
                <br />
                <p>{description}</p>
                <p>
                  {t('course.instructor')}: {user.username}
                </p>
                <p className="priceDetail">{price} €</p>
                <div className="button-conainer">
                  <button className="curseButton">{t('course.buy')}</button>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="videoInsert">
                  <YoutubeEmbed video={video} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="deatail-sharer">
        <Facebook link={window.location.href} />
        <Twitter link={window.location.href} />
      </div>
      <div>
        {t('course.has')} {numFavs} {t('course.favorites')}
        {/* {numFavs === 1 ? '' : 's'} */}
      </div>
      <div className="infoCourse">
        <div className="row mb-3">
          <div className="col-12 col-sm-8">
            <h5 className="courseWhatTitle">
              {t('course.What you will learn')}
            </h5>
            <p>
              In this course you will learn how to set up your database and
              start exploring different ways to search, create, and analyze your
              data with MongoDB. We will cover database performance basics, and
              discover how to get started with creating applications and
              visualizing your data
            </p>
            <p>
              We'll start together with the ultimate basics, learning what a
              database is and recognizing what makes MongoDB different in the
              database space. Then you'll move on to working with data as you
              grasp the difference between BSON and JSON and start to import,
              export and query. Next you'll absorb how to create and manipulate
              documents with hands-on learning, and skill-up to mastering
              advanced Create Read Update Delete (CRUD) operations. By this time
              you'll be ready to work on Indexing, Data Modeling, and creating
              an Aggregation Pipeline. Lastly you'll have the opportunity to
              explore the Atlas UI in more detail, investigate the Charts
              functionality and Realm, as well as explore the use of Compass.
            </p>
            <h5 className="courseContentTitle">{t('course.Course content')}</h5>
            <ul>
              <div className="card m-1">
                <li>Leccion 1</li>
              </div>
              <div className="card m-1">
                <li>Leccion 2</li>
              </div>
              <div className="card m-1">
                <li>Leccion 3</li>
              </div>
              <div className="card m-1">
                <li>Leccion 4</li>
              </div>
            </ul>
          </div>
          <div className="col-12 col-sm-4">
            <h5 className="courseRequerimientsTitle">
              {t('course.Requirements')}
            </h5>
            <p>
              .col-4 Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <p>
              .col-4 Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <div className="row mb-3">
              <div className="col-4">
                <div className="detail-image">
                  <img
                    style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={image}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <h5 className="courseIstructorTitle">
                  {t('course.instructor')}
                </h5>
              </div>
            </div>
            <p>{user.username}</p>
            <p>{title}</p>
            <p>
              {user.username} is a Senior Curriculum Engineer at MongoDB. Prior
              to MongoDB Yulia worked at Stuyvesant High School where she
              tautght Computer Science to hundreds of unsuspecting studetns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
