import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getFilters } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
// import styles from './FiltersForm.module.css';

const FilterForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);

  const categories = useSelector(getCategories);

  const rangeSelector = (ev, newValue) => {
    const newFilter = { ...filters, price: newValue };
    dispatch(setFilters(newFilter));
  };

  const style = { color: '#f24b88', width: '85%' };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [dispatch]);

  const defaultFilters = {
    title: '',
    category: '',
    username: '',
    categories: [],
    price: [0, 600],
    limit: 10,
    skip: 0,
    sort: -1,
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
  }

  function handleChange(ev) {
    filters.skip = 0;
    const newFilter = { ...filters, [ev.target.name]: ev.target.value };
    dispatch(setFilters(newFilter));
  }

  async function handleReset() {
    dispatch(setFilters(defaultFilters));
  }

  const { t } = useTranslation(['global']);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{t('Title')}</label>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          placeholder={t('Title')}
        ></input>
        <br />

        <label>{t('username')}</label>
        <input
          type="text"
          name="username"
          value={filters.username}
          onChange={handleChange}
          placeholder={t('username')}
        ></input>
        <br />
        {categories && (
          <Input
            as="select"
            label={t('Category')}
            name="category"
            value={filters.category}
            onChange={handleChange}
            searcher={true}
            options={[
              { name: t('filter.Select category'), _id: '000' },
              ...categories,
            ]}
          />
        )}
        <br />

        <div>
          <Slider
            value={filters.price}
            onChange={rangeSelector}
            max={600}
            valueLabelDisplay="auto"
            style={style}
          />
          <br />
          {t('filter.filtering price between')} {filters.price[0]} € {t('and')}{' '}
          {filters.price[1]} €
        </div>
        <br />
        <button type="reset" onClick={handleReset}>
          {t('filter.reset filters')}
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
