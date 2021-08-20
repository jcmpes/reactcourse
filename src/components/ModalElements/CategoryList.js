import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import { getCategories } from '../../store/selectors';
import ModalWindow from '../shared/ModalWindow';

const CategoryList = ({ closeModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(categoriesLoadAction());
  }, []);

  return (
    <div>
      <ModalWindow
        title="Category List.T"
        closeModal={closeModal}
        children={
          <div className="categoryListContainer">
            <div>
              {categories.map((cat) => (
                <div>{cat.name}</div>
              ))}
            </div>
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default CategoryList;
