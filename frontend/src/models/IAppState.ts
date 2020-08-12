import {IUserState} from "./user/types";
import {IQuestionsState} from "./forms/Questions/types";
import {IQuestionnairesListState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";

export interface IAppState {
    toastr: any;
    user: IUserState;
    questionnaires: IQuestionnairesListState;
    questions: IQuestionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    isLoading: boolean;
}
