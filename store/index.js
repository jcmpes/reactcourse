import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = [thunk];

const configureStore = ({ preloadedState }) => {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  return store;
};

export default configureStore;