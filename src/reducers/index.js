import { combineReducers } from 'redux';
import { bankListReducer } from './bankReducers';
import { bankDetailsReducer, favouritesReducer } from './userReducers';

export default combineReducers({
  bankList: bankListReducer,
  favourites: favouritesReducer,
  bankDetails: bankDetailsReducer,
});
