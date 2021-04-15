import { combineReducers } from 'redux';
import { bankListReducer } from './bankReducers';
import { favouritesReducer } from './userReducers';

export default combineReducers({
  bankList: bankListReducer,
  favourites: favouritesReducer,
});
