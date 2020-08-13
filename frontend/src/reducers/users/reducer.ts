import {
  loadCompanyUsersRoutine,
  removeUserFromCompanyRoutine,
  setUsersPaginationRoutine
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
    case removeUserFromCompanyRoutine.TRIGGER:
    case loadCompanyUsersRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadCompanyUsersRoutine.SUCCESS:
      return {
        ...state,
        pagination: action.payload,
        isLoading: false
      };
    case loadCompanyUsersRoutine.FAILURE:
    case removeUserFromCompanyRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default teamsReducer;

