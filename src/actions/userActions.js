import { ADD_FAVOURITE, REMOVE_FAVOURITE, BANK_DETAILS } from '../constants/types';

export const addFavourite = (ifsc) => async (dispatch, getState) => {
  try {
    const { favourites } = getState();
    if (!favourites.includes(ifsc)) {
      favourites.push(ifsc);
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    dispatch({ type: ADD_FAVOURITE, payload: favourites });
  } catch (error) {
    console.log(error);
  }
};

export const removeFavourite = (ifsc) => async (dispatch, getState) => {
  try {
    const { favourites } = getState();
    const idx = favourites.indexOf(ifsc);
    if (idx > -1) {
      favourites.splice(idx, 1);
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    dispatch({ type: REMOVE_FAVOURITE, payload: favourites });
  } catch (error) {
    console.log(error);
  }
};

export const showBankDetails = (bankDetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANK_DETAILS, payload: bankDetails });
  } catch (error) {
    console.log(error);
  }
};
