import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch } from 'react-redux';
import styles from '../../components/layout/Header/Header.module.css';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputText, setinputText] = React.useState('');

  const defaultFilters = { title: '' };

  async function handleSubmit(ev) {
    ev.preventDefault();
    // handleReset();
    dispatch(setFilters({ title: inputText }));
  }

  function handleChange(ev) {
    setinputText(ev.target.value);
  }

  // async function handleReset() {
  //   dispatch(setFilters(defaultFilters));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.searchBarForm}
        type="text"
        value={inputText}
        onChange={handleChange}
        // TODO tranlate placeholder
        placeholder="Seach..."
      ></input>
      {/* <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button> */}
    </form>
  );
};

export default FilterForm;
