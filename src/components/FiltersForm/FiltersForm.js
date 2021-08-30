import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getFilters, getLevels } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import './FiltersForm.css';
import { levelsLoadAction } from '../../store/actions/levels-load';
import { defaultFilters } from '../../data/constants';

const FilterForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);

  const categories = useSelector(getCategories);

  const lvls = useSelector(getLevels);

  const rangeSelector = (ev, newValue) => {
    const newFilter = { ...filters, price: newValue };
    dispatch(setFilters(newFilter));
  };

  const style = { color: '#f24b88', width: '85%' };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(levelsLoadAction());
  }, [dispatch]);

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
    <>
      <h4 className="filtersFormTitle">Busqueda avanzada</h4>
      <div className="filtersWrapper">
        <form onSubmit={handleSubmit}>
          <h6 className="searchByTitle">{t('Title')}</h6>
          <div className="searchTitleBarContainer">
            <input
              className="searchTitleBarForm"
              type="text"
              name="title"
              value={filters.title}
              onChange={handleChange}
              placeholder={t('Title')}
            ></input>
          </div>
          <h6 className="searchByUser">{t('username')}</h6>
          <div className="searchUserBarContainer">
            <input
              className="searchUserBarForm"
              type="text"
              name="username"
              value={filters.username}
              onChange={handleChange}
              placeholder={t('username')}
            ></input>
          </div>
          <h6 className="searchByCategory">{t('Category')}</h6>
          <div className="searchCategoryBarContainer">
            {categories && (
              <Input
                className="searchCategoryBarForm"
                as="select"
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
          </div>

          <h6 className="searchByLevel">{t('Level')}</h6>
          <div className="searchLevelyBarContainer">
            {lvls && (
              <Input
                className="searchLevelBarForm"
                as="select"
                name="levels"
                value={filters.levels}
                onChange={handleChange}
                searcher={true}
                options={[
                  { name: t('filter.Select Levels'), _id: '000' },
                  ...lvls,
                ]}
              />
            )}
          </div>

          <div>
            <h6 className="searchByPrice">{t('Price')}</h6>
            <div className="searchPriceBarContainer">
              <br />
              <Slider
                value={filters.price}
                onChange={rangeSelector}
                max={100}
                valueLabelDisplay="auto"
                style={style}
              />
            </div>
            <br />
            <div className="filtersFooter">
              <div>
                {t('filter.filtering price between')} {filters.price[0]} €{' '}
                {t('and')} {filters.price[1]} €
              </div>
              <br />
            </div>

            <div className="button-conainer">
              <button
                className="buttonSecondary resetFilter"
                type="reset"
                onClick={handleReset}
              >
                {t('filter.reset filters')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
