import { authLogout } from '../store/actions/logout';
import { loadCoursesAction } from '../store/actions/load-courses';
import { getAuth, getUI } from '../store/selectors';
import { getCourses } from '../api/courses';
import Course from '../components/courses/Course';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadRequest } from '../store/actions/categories-load';
import { Button } from '../components/shared';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';


function TemporaryWelcomePage() {
  const auth = useSelector(getAuth);
  const { locale } = useRouter();
  const { username, favs } = auth;
  const { loading, error } = useSelector(getUI);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation("SEO")

  useEffect(() => {
    dispatch(loadCoursesAction(getCourses, setCourses));
    dispatch(categoriesLoadRequest());
  }, [dispatch]);

  const coursesElement =
    courses && favs
      ? courses.map((course) => {
          const faved = favs.includes(course._id);
          return (
            <div key={course._id}>
              <Course
                course={course}
                me={username}
                key={course._id}
                faved={faved}
              />
            </div>
          );
        })
      : [];

  return (
    <>
      <Head>
        <title>{`Teach It Up: Your course platform`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t('description')}/>
        <meta property="og:image" content={'https://www.net-learning.com.ar/wp-content/uploads/2014/05/E-learning-laptop-estudiantes-1024x682.jpg'} />
        <meta property="og:title" content={`Teach It Up: ${t('title')}`} />
      </Head>
      <div>
        {error || loading 
        ? ('Loading...')
        : (
          <>
            <div
              style={{
                textAlign: 'center',
                fontSize: 40,
              }}
            >
              {('welcome to')}
              {('title')}
              {username ? `, ${username}` : ''}
            </div>

            <div>{('headline')}</div>

            <p>
              Current language: <strong>{locale}</strong>
            </p>
            <Link href="/" locale="en" passHref>
              <Button>{'English'}</Button>
            </Link>
            <Link href="/" locale="es" passHref>
              <Button>{'Español'}</Button>
            </Link>

            {coursesElement.length === 0 && !loading
              ? "There's no courses yet"
              : coursesElement}
          </>
        )};
      </div>
    </>
  )
}

export default TemporaryWelcomePage;
