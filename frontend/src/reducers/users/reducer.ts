import {
  loadCompanyUsersRoutine,
  removeUserFromCompanyRoutine,
  setUsersPaginationRoutine,
  loadFiredUsersRoutine,
  unfireUserRoutine,
  setFiredUsersPaginationRoutine
} from '../../sagas/users/routines';
import { Routine } from 'redux-saga-routines';
import {IAppState} from "../../models/IAppState";

const teamsReducer = (state: IAppState['users'] = {}, action: Routine<any>) => {
  switch (action.type) {
    case setUsersPaginationRoutine.TRIGGER:
      return {
        ...state,
        pagination: action.payload
      };
    case setFiredUsersPaginationRoutine.TRIGGER:
      return {
        ...state,
        paginationFired: action.payload
      };
    case removeUserFromCompanyRoutine.TRIGGER:
    case loadCompanyUsersRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadFiredUsersRoutine.TRIGGER:
    case unfireUserRoutine.TRIGGER:
      return {
        ...state,
        isFiredLoading: true
      };
    case loadCompanyUsersRoutine.SUCCESS:
      return {
        ...state,
        pagination: action.payload,
        isLoading: false
      };
    case loadFiredUsersRoutine.SUCCESS:
      return {
        ...state,
        paginationFired: action.payload,
        isFiredLoading: false
      };
    case loadCompanyUsersRoutine.FAILURE:
    case removeUserFromCompanyRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case loadFiredUsersRoutine.FAILURE:
    case unfireUserRoutine.FAILURE:
      return {
        ...state,
        isFiredLoading: false
      };
    default:
      return state;
  }
};

export default teamsReducer;

