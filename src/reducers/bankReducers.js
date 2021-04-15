import { BANK_LIST_REQUEST, BANK_LIST_SUCCESS, BANK_LIST_FAIL } from '../constants/types';

export const bankListReducer = (state = { loading: false, banks: [] }, action) => {
  switch (action.type) {
    case BANK_LIST_REQUEST:
      return { loading: true };
    case BANK_LIST_SUCCESS:
      return { loading: false, banks: action.payload };
    case BANK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
