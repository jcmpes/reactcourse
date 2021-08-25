import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/logout';
import { getAuth, getUI, getFilters } from '../../store/selectors';
import Layout from '../layout/Layout';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../../api/courses';
import { Button } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadRequest } from '../../store/actions/categories-load';
import CoursesList from '../courses/CoursesList';
import FiltersForm from '../FiltersForm/FiltersForm';
import Scroll from '../shared/Scroll';
// import styles from './SearchPage.module.css';
import './SearchPage.css';
import {
  setFilters,
  loadCoursesAction,
} from '../../store/actions/load-courses';
import Loading from '../shared/Loading/Loading';
import ErrorMessage from '../shared/ErrorMessage';
import loader from '../../assets/img/loading-mini.gif';
import { debounce } from '../../utils/debounce';
import { CourseSkeleton } from '../courses/CourseSkeleton';

function SearchPage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [allResultsListed, setAllResultsListed] = React.useState(false);
  const [sort, setSort] = React.useState(-1);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const onClick = () => setShowFilters(!showFilters);
  const size = useWindowSize();

  const handleChange = (ev) => {
    setSort(sort === 1 ? -1 : 1);
    filters.skip = 0;
    dispatch(setFilters(filters));
  };

  const gimmeMore = async () => {
    filters.skip = filters.skip + 10;
    dispatch(setFilters(filters));
    const coursesAux = courses;
    setMoreLoading(true);
    try {
      const newCourses = await getCourses(filters);
      if (newCourses.length < filters.limit) setAllResultsListed(true);
      setCourses(coursesAux.concat(newCourses));
    } catch (err) {
      console.log(err);
    } finally {
      setMoreLoading(false);
    }
  };

  const [courses, setCourses] = React.useState([]);

  const getCoursesDebounce = (filter) => {
    dispatch(
      loadCoursesAction(
        getCourses,
        setCourses,
        filter,
        setAllResultsListed,
        filter.limit,
      ),
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCoursesCall = React.useCallback(
    debounce(getCoursesDebounce, 300),
    [],
  );

  React.useEffect(() => {
    if (size.width > 767) {
      setShowFilters(true);
    }
  }, [size]);

  function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
      width: 0,
      height: 0,
    });
    React.useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
  }

  React.useEffect(() => {
    setAllResultsListed(false);
  }, [filters]);

  React.useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      filters.skip = 0;
      dispatch(categoriesLoadRequest());
    }
    if (sort === 1) {
      filters.sort = 1;
    } else {
      filters.sort = -1;
    }
    dispatch(setFilters(filters));
    getCoursesCall(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters, sort]);
  if (error) return <ErrorMessage error={error} resetError={null} />;
  return (
    <Layout {...props}>
      <Scroll showBellow={250} />
      <label htmlFor="order-checkbox">{t('Ascending')}</label>
      <input
        type="checkbox"
        id="order-checkbox"
        checked={sort === 1}
        onChange={handleChange}
      />

      <p>
        Current language: <strong>{i18n.language}</strong>
      </p>
      <div>
        {size.width}px / {size.height}px
      </div>
      <div className="showFilters">
        <Button type="submit" value="Advanced Search" onClick={onClick}>
          Advanced Search
        </Button>
      </div>
      <div className="row">
        {/*className={styles.searchBarForm}*/}
        {showFilters ? (
          <div className="col-12 col-md-3 filtersContainer">
            <div>{showFilters ? <FiltersForm /> : null}</div>
          </div>
        ) : null}
        <div className="col-12 col-md-9">
          {loading ? (
            <>
              <CourseSkeleton />
              <CourseSkeleton />
              <Loading isLoading={true} />
            </>
          ) : (
            <>
              <CoursesList courses={courses} />
              <br />
              {!allResultsListed ? (
                <>
                  <div>
                    {courses ? courses.length : '0'} {t('results')}
                  </div>

                  {!moreLoading ? (
                    <button onClick={gimmeMore}>{t('Show more')}</button>
                  ) : (
                    <img width="20px" src={loader} alt="loading" />
                  )}
                </>
              ) : (
                <>
                  <div>
                    {courses ? courses.length : '0'} {t('results')}
                  </div>
                  <div>{t("There's no more results")}</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
