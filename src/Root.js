import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const middlewares = [thunk];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
