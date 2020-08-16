import {
  clearCurrentTeamRoutine,
  createTeamRoutine,
  hideModalTeamsRoutine, loadCompanyUsersRoutine, loadCurrentTeamRoutine,
  loadTeamsRoutine,
  showModalTeamsRoutine
} from '../../sagas/teams/routines';
import {Routine} from 'redux-saga-routines';
import {ITeam, ITeamShort} from 'models/teams/ITeam';
import {IUserShort} from "../../models/user/types";

export interface ITeamCurrent {
  failed?: boolean;
  isLoadingTeam?: boolean;
  currentTeam?: ITeam;
}

export interface ITeamsState {
  teams?: ITeamShort[];
  isLoading: boolean;
  modalShown: boolean;
  isModalLoading: boolean;
  companyUsers?: IUserShort[];
  failedUsers?: boolean;
  isLoadingUsers?: boolean;
  current: ITeamCurrent;
  error?: string;
}

const initState: ITeamsState = {
  isLoading: false,
  modalShown: false,
  isModalLoading: false,
  current: {}
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

    case clearCurrentTeamRoutine.TRIGGER:
      return {
        ...state,
        companyUsers: state.companyUsers ? state.companyUsers.map(u => ({...u, selected: undefined})) : undefined,
        current: {}
      };

    case loadCurrentTeamRoutine.TRIGGER:
      return {
        ...state,
        current: {
          ...state.current,
          isLoadingTeam: true
        }
      };
    case loadCurrentTeamRoutine.SUCCESS:
      const team: ITeam = action.payload;
      return {
        ...state,
        companyUsers: state.companyUsers.map(u => (team.membersId.includes(u.id) ? {...u, selected: true} : u)),
        current: {
          ...state.current,
          isLoadingTeam: false,
          currentTeam: team
        }
      };
    case loadCurrentTeamRoutine.FAILURE:
      return {
        ...state,
        current: {
          ...state.current,
          isLoadingTeam: false,
          failed: true
        }
      };

    case loadCompanyUsersRoutine.TRIGGER:
      return {
        ...state,
        isLoadingUsers: true
      };
    case loadCompanyUsersRoutine.SUCCESS:
      return {
        ...state,
        companyUsers: action.payload,
        isLoadingUsers: false
      };
    case loadCompanyUsersRoutine.FAILURE:
      return {
        ...state,
        isLoadingUsers: false,
        failedUsers: true
      };
    default:
      return state;
  }
};

export default teamsReducer;

