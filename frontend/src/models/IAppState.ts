import {IUserState} from "./user/types";
import {IUsersState} from "./users/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";
import {IQuestionsState} from "../reducers/questions/reducer";
import {ICompanyState} from '../reducers/companies/reducer';

export interface IAppState {
    toastr: any;
    user: IUserState;
    users: IUsersState;
    questionnaires: IQuestionnairesState;
    questions: IQuestionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    company: ICompanyState;
    isLoading: boolean;
}
