import axios from 'axios';
import { BANK_LIST_REQUEST, BANK_LIST_SUCCESS, BANK_LIST_FAIL } from '../constants/types';

export const listBanks = (city) => async (dispatch) => {
  try {
    dispatch({ type: BANK_LIST_REQUEST });

    const banksFromStorage = localStorage.getItem('banks')
      ? JSON.parse(localStorage.getItem('banks'))
      : {};

    let flag = true;
    if (banksFromStorage[city]) {
      dispatch({ type: BANK_LIST_SUCCESS, payload: banksFromStorage[city] });
      flag = false;
    }

    const { data } = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`);
    banksFromStorage[city] = data;
    localStorage.setItem('banks', JSON.stringify(banksFromStorage));

    if (flag) dispatch({ type: BANK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANK_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
