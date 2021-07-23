import { useState } from 'react';
import { filterCourses } from '../../api/courses';

const FilterForm = () => {
  const [inputText, setinputText] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = await filterCourses(inputText);
    console.log(data);
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
