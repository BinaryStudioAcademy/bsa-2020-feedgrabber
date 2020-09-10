
import {IAppState} from "../../models/IAppState";

import {IUserShortInfo} from "../../models/user/types";
import {IQuestionnaireInfo} from "../../models/forms/Questionnaires/types";
import {ITeamShort} from "../../models/teams/ITeam";
import {loadDashboardDataRoutine} from "../../sagas/dashboard/rourines";

export interface IDashboardState {
  companyName: string;
  users: IUserShortInfo[];
  questionnaires: IQuestionnaireInfo[];
  teams: ITeamShort[];
  isLoading: boolean;
  error?: string;
}

const initialState: IDashboardState = {
  companyName: "",
  users: [],
  questionnaires: [],
  teams: [],
  isLoading: false,
  error: null
};

const dashboardReducer = (state: IAppState['dashboard'] = initialState, {type, payload}) => {
  switch (type) {
    case(loadDashboardDataRoutine.TRIGGER):
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case(loadDashboardDataRoutine.SUCCESS):
      return {
        ...state,
        isLoading: false,
        teams: payload.teams,
        users: payload.users,
        questionnaires: payload.questionnaires,
        companyName: payload.companyName,
        error: null
      };
    case(loadDashboardDataRoutine.FAILURE):
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;