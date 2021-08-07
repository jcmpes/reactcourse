import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch } from 'react-redux';
import styles from '../../components/layout/Header/Header.module.css';
import { useTranslation } from 'react-i18next';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputText, setinputText] = React.useState('');

  // const defaultFilters = { title: '' };

  async function handleSubmit(ev) {
    ev.preventDefault();
    // handleReset();
    dispatch(
      setFilters({
        title: inputText,
        skip: 0,
        limit: 10,
      }),
    );
  }

  function handleChange(ev) {
    setinputText(ev.target.value);
  }

  // async function handleReset() {
  //   dispatch(setFilters(defaultFilters));
  // }

  const { t } = useTranslation(['global']);

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.searchBarForm}
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder={t('header.search') + '...'}
      ></input>
      {/* <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button> */}
    </form>
  );
};

export default FilterForm;
