import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const middleware = [thunk];

const configureStore = ({ preloadedState }) => {
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  return store;
};

export default configureStore;
