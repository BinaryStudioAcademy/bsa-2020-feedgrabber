import {IUserState} from "./user/types";
import {IQuestionsState} from "./forms/Questions/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";

export interface IAppState {
    toastr: any;
    user: IUserState;
    questionnaires: IQuestionnairesState;
    questions: IQuestionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    isLoading: boolean;
}
