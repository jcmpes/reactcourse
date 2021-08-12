import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getFilters } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import styles from './FiltersForm.module.css';

const FilterForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);

  const categories = useSelector(getCategories);

  const rangeSelector = (ev, newValue) => {
    const newFilter = { ...filters, price: newValue };
    dispatch(setFilters(newFilter));
  };

  const style = { color: '#f24b88' };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [dispatch]);

  const defaultFilters = {
    title: '',
    category: '',
    username: '',
    categories: [],
    price: [0, 600],
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    // dispatch(
    //   setFilters({
    //     title: filters.title,
    //     username: filters.username,
    //     category: filters.category,
    //     price: filters.price,
    //     limit: filters.limit,
    //     sort: filters.sort,
    //     skip: filters.skip,
    //   }),
    // );
  }

  function handleChange(ev) {
    const newFilter = { ...filters, [ev.target.name]: ev.target.value };
    dispatch(setFilters(newFilter));
  }

  async function handleReset() {
    dispatch(setFilters(defaultFilters));
  }

  const { t } = useTranslation(['global']);

  return (
    <form onSubmit={handleSubmit} className={styles.filterContainer}>
      <label>{t('Title')}</label>
      <input
        type="text"
        name="title"
        value={filters.title}
        onChange={handleChange}
      ></input>
      <br />

      <label>{t('username')}</label>
      <input
        type="text"
        name="username"
        value={filters.username}
        onChange={handleChange}
      ></input>
      <br />

      <Input
        as="select"
        label={t('Category')}
        name="category"
        value={filters.category}
        onChange={handleChange}
        searcher={true}
        options={[{ name: 'Select category', _id: '000' }, ...categories]}
      />
      <br />

      <div
        style={{
          margin: 'auto',
          display: 'block',
          width: 'fit-content',
        }}
      >
        <Slider
          value={filters.price}
          onChange={rangeSelector}
          max={600}
          valueLabelDisplay="auto"
          style={style}
        />
        {t('filter.filtering price between')} {filters.price[0]} € {t('and')}{' '}
        {filters.price[1]} €
      </div>

      <button type="submit">{t('header.search')}</button>
      <button type="reset" onClick={handleReset}>
        {t('filter.reset filters')}
      </button>
    </form>
  );
};

export default FilterForm;
