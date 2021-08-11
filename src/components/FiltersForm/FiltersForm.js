import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputTextTitle, setinputText] = React.useState('');
  const [inputTextUsername, setinputCategoryUsername] = React.useState('');
  const [price, setPrice] = React.useState([0, 600]);
  const categories = useSelector(getCategories);

  const rangeSelector = (ev, newValue) => {
    setPrice(newValue);
  };

  const style = { color: '#f24b88' };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [dispatch]);

  const [inputTextCategory, setinputCategory] = React.useState('');

  const defaultFilters = {
    title: null,
    category: null,
    categories: [],
    price: [0, 600],
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    dispatch(
      setFilters({
        title: inputTextTitle,
        user: inputTextUsername,
        category: inputTextCategory,
        price: price,
      }),
    );
  }

  function handleChangeTitle(ev) {
    setinputText(ev.target.value);
  }
  function handleChangeUsername(ev) {
    setinputCategoryUsername(ev.target.value);
  }
  function handleChangeCategory(ev) {
    setinputCategory(ev.target.value);
  }

  function emptyFiltersform() {
    setinputText('');
    setinputCategoryUsername('');
    setinputCategory('');
    setPrice([0, 600]);
  }

  async function handleReset() {
    dispatch(setFilters(defaultFilters));
    emptyFiltersform();
  }

  const { t } = useTranslation(['global']);

  return (
    <form onSubmit={handleSubmit}>
      <label>{t('Title')}</label>
      <input
        type="text"
        value={inputTextTitle}
        onChange={handleChangeTitle}
      ></input>
      <br />

      <label>{t('username')}</label>
      <input
        type="text"
        value={inputTextUsername}
        onChange={handleChangeUsername}
      ></input>
      <br />

      <Input
        as="select"
        label={t('Category')}
        name="category"
        value={inputTextCategory}
        onChange={handleChangeCategory}
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
          value={price}
          onChange={rangeSelector}
          max={600}
          valueLabelDisplay="auto"
          style={style}
        />
        {t('filter.filtering price between')} {price[0]} € {t('and')} {price[1]}{' '}
        €
      </div>

      <button type="submit">{t('header.search')}</button>
      <button type="reset" onClick={handleReset}>
        {t('filter.reset filters')}
      </button>
    </form>
  );
};

export default FilterForm;
