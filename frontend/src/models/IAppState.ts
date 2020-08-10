import {IUserErrors, IUserInfo} from "./user/types";
import {IQuestion} from "./IQuesion";
import {IQuestionnaire} from "./IQuestionnaire";

export interface IAppState {
    toastr: any;
    user: {
        isLoading: boolean;
        info: IUserInfo;
        error: IUserErrors;
    };
    forms: {
        questions: IQuestion[];
        questionnaires: IQuestionnaire[];
        currentQuestionnaire: {
            questionnaire: IQuestionnaire;
            questions: IQuestion[];
        };
        currentQuestion: IQuestion;
    };
}
