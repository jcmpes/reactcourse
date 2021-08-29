import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { getCategories } from '../../store/selectors';
import ModalWindow from '../shared/ModalWindow';
import styles from './CategoryList.module.css';
import { setFilters } from '../../store/actions/load-courses';
import { Link } from 'react-router-dom';
import { defaultFilters } from '../../data/constants';

const CategoryList = ({ closeModal }) => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [dispatch]);

  return (
    <div>
      <ModalWindow
        title={t('category list.categories')}
        closeModal={closeModal}
        children={
          <div className={styles.categoryListContainer}>
            {categories.map((cat) => (
              <Link to="/search">
                <div
                  key={cat._id}
                  className={styles.link}
                  onClick={() => {
                    dispatch(
                      setFilters({ ...defaultFilters, category: cat.name }),
                    );
                    closeModal();
                  }}
                >
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default CategoryList;
