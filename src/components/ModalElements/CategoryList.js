import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { getCategories } from '../../store/selectors';
import ModalWindow from '../shared/ModalWindow';
import styles from './CategoryList.module.css';

const CategoryList = ({ closeModal }) => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(categoriesLoadAction());
  }, []);

  return (
    <div>
      <ModalWindow
        title={t('category list.categories')}
        closeModal={closeModal}
        children={
          <div className={styles.categoryListContainer}>
            {categories.map((cat) => (
              <div className={styles.link}>{cat.name}</div>
            ))}
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default CategoryList;
