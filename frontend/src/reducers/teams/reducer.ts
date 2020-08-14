import {
  createTeamRoutine,
  hideModalTeamsRoutine, loadCompanyUsersRoutine,
  loadTeamsRoutine,
  showModalTeamsRoutine
} from '../../sagas/teams/routines';
import { Routine } from 'redux-saga-routines';
import { ITeam } from 'models/teams/ITeam';
import {IUserInfo} from "../../models/user/types";

export interface ITeamsState {
  teams: ITeam[];
  isLoading: boolean;
  modalShown: boolean;
  isModalLoading: boolean;
  companyUsers: IUserInfo[];
  error?: string;
}

const initState: ITeamsState = {
  teams: [],
  companyUsers: [],
  isLoading: false,
  modalShown: false,
  isModalLoading: false
};

const teamsReducer = (state = initState, action: Routine<any>): ITeamsState => {
  switch (action.type) {
    case loadTeamsRoutine.SUCCESS:
      return {
        ...state,
        teams: action.payload,
        isLoading: false
      };
    case loadTeamsRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadTeamsRoutine.FAILURE:
    case loadCompanyUsersRoutine.FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case showModalTeamsRoutine.TRIGGER:
      return {
        ...state,
        modalShown: true
      };
    case hideModalTeamsRoutine.TRIGGER:
      return {
        ...state,
        modalShown: false
      };
    case createTeamRoutine.SUCCESS:
      return {
        ...state,
        modalShown: false,
        isModalLoading: false
      };
    case createTeamRoutine.FAILURE:
      return {
        ...state,
        isModalLoading: false
      };
    case loadCompanyUsersRoutine.SUCCESS:
      return {
        ...state,
        companyUsers: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default teamsReducer;

