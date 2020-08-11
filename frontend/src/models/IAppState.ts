import {IUserState} from "./user/types";
import {IQuestionsState} from "./forms/Questions/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";

export interface IAppState {
    toastr: any;
    user: IUserState;
    questionnaires: IQuestionnairesState;
    questions: IQuestionsState;
}
