import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../constants/types';

export const favouritesReducer = (state = { favourites: [] }, action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      return [...action.payload];
    case REMOVE_FAVOURITE:
      return [...action.payload];
    default:
      return state;
  }
};
