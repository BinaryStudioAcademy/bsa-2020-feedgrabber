import {
  SET_USER,
  SET_VALIDATION_ERRORS_SUCCESS,
  SET_IS_LOADING
} from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_VALIDATION_ERRORS_SUCCESS:
      return {
        ...state,
        validationErrors: action.errors
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};