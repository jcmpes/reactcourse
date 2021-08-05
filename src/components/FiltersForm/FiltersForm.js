import React from 'react';
import { setFilters } from '../../store/actions/load-courses';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { Input } from '../shared';
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
    handleReset();
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
        Filtering Price between {price[0]}€ and {price[1]}€
      </div>

      <button type="submit">Search</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
