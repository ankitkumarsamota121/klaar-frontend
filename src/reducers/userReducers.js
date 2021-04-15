import { ADD_FAVOURITE, BANK_DETAILS, REMOVE_FAVOURITE } from '../constants/types';

export const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      return [...action.payload];
    case REMOVE_FAVOURITE:
      return [...action.payload];
    default:
      return state;
  }
};

export const bankDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_DETAILS:
      return { ...action.payload };
    default:
      return state;
  }
};
