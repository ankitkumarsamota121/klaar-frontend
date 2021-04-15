import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const banksFromStorage = localStorage.getItem('banks')
  ? JSON.parse(localStorage.getItem('banks'))
  : {};

const favouritesFromStorate = localStorage.getItem('favourites')
  ? JSON.parse(localStorage.getItem('favourites'))
  : [];

const initialState = {
  banks: banksFromStorage,
  favourites: favouritesFromStorate,
};
const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
