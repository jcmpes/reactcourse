import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCourses } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
import SelectRange from '../shared/SelectRange';

const FilterForm = () => {
  const dispatch = useDispatch();
  const [inputTextTitle, setinputText] = React.useState('');
  const [inputTextUsername, setinputCategoryUsername] = React.useState('');
  const categories = useSelector(getCategories);
  // const prices = useSelector(getCourses);

  // console.log('PRECIOS', prices);
  // loadCoursesAction

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    // dispatch(courseDetailAction())
  }, [dispatch]);

  const [inputTextCategory, setinputCategory] = React.useState('');

  const defaultFilters = {
    title: null,
    category: null,
    price: [],
    categories: [],
  };

  console.log(
    'categorias',
    categories[0] ? categories[1].name : 'aún no están',
  );

  console.log('Select value: ', inputTextCategory);

  console.log('Select id: ', inputTextCategory);

  const maxPrice = 500;

  async function handleSubmit(ev) {
    ev.preventDefault();
    handleReset();
    dispatch(
      setFilters({ title: inputTextTitle, category: inputTextUsername }),
    );
  }

  function handleChangeTitle(ev) {
    setinputText(ev.target.value);
  }
  function handleChangeCategory(ev) {
    setinputCategory(ev.target.value);
  }
  function handleChangeUsername(ev) {
    setinputCategoryUsername(ev.target.value);
  }

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

      <label>Username</label>
      <input
        type="text"
        value={inputTextUsername}
        onChange={handleChangeUsername}
      ></input>
      <br />

      <Input
        as="select"
        label={'Category'}
        name="category"
        value={inputTextCategory}
        onChange={handleChangeCategory}
        options={[{ name: 'Select category', _id: '000' }, ...categories]}
      />
      <br />

      <SelectRange maxPrice={maxPrice} />
      <br />

      <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
