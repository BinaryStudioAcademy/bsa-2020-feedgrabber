import {
  loginRoutine,
  setLoadingRoutine
} from './routines';

export default (state = {}, action) => {
  switch (action.type) {
    case loginRoutine.SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case setLoadingRoutine.TRIGGER:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};