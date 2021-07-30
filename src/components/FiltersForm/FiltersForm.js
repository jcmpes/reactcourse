import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch } from 'react-redux';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputTextTitle, setinputText] = React.useState('');
  const [inputTextCategory, setinputCategory] = React.useState('');
  const [inputTextUsername, setinputCategoryUsername] = React.useState('');

  const defaultFilters = { title: null, category: null };

  async function handleSubmit(ev) {
    ev.preventDefault();
    handleReset();
    dispatch(
      setFilters({ title: inputTextTitle, category: inputTextCategory }),
    );
  }

  function handleChangeTitle(ev) {
    setinputText(ev.target.value);
  }
  function handleChangeCategory(ev) {
    setinputCategory(ev.target.value);
  }
  // function handleChangeUsername(ev) {
  //   setinputCategoryUsername(ev.target.value);
  // }

  async function handleReset() {
    dispatch(setFilters(defaultFilters));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={inputTextTitle}
        onChange={handleChangeTitle}
      ></input>
      <br />
      <label>Category</label>
      <input
        type="text"
        value={inputTextCategory}
        onChange={handleChangeCategory}
      ></input>
      <br />
      {/* <label>Username</label>
      <input
        type="text"
        value={inputTextUsername}
        onChange={handleChangeUsername}
      ></input>
      <br /> */}
      <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
