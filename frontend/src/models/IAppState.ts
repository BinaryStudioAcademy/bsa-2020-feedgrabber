import {IUserState} from "./user/types";
import {IQuestionsState} from "./forms/Questions/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {ITeamsState} from "../containers/TeamsPage/reducer";

export interface IAppState {
    toastr: any;
    user: IUserState;
    questionnaires: IQuestionnairesState;
    questions: IQuestionsState;
    app: {
        showMenu: boolean;
    };
    teams: ITeamsState;
    isLoading: boolean;
}
