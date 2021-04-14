import { combineReducers } from 'redux';
import { bankListReducer } from './bankReducers';

export default combineReducers({
  bankList: bankListReducer,
});
