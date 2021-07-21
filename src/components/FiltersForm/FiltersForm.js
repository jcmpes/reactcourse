import React from 'react';
import { filterCourses } from '../../api/courses';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputText, setinputText] = React.useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    //const data = await filterCourses(inputText);
    //console.log(data);
    dispatch(setFilters({ title: inputText }));
  }

  function handleChange(ev) {
    setinputText(ev.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputText} onChange={handleChange}></input>
      <button type="submit">Search</button>
    </form>
  );
};

export default FilterForm;
