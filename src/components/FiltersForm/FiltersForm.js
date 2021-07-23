import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch } from 'react-redux';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputText, setinputText] = React.useState('');

  const defaultFilters = { title: '' };

  async function handleSubmit(ev) {
    ev.preventDefault();
    handleReset();
    dispatch(setFilters({ title: inputText }));
  }

  function handleChange(ev) {
    setinputText(ev.target.value);
  }

  async function handleReset() {
    dispatch(setFilters(defaultFilters));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputText} onChange={handleChange}></input>
      <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
