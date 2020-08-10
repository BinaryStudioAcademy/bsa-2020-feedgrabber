import { loadTeamsRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import { ITeam } from 'models/ITeam';

interface ITeamsState {
  teams: ITeam[];
  isLoading: boolean;
  error?: string;
}

const initState: ITeamsState = {
  teams: [],
  isLoading: false
};

export default (state = initState, action: Routine<any>): ITeamsState => {
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
    default:
      return state;
  }
};
