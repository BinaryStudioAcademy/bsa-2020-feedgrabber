import {IUserState} from "./user/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";
import {IQuestionsState} from "../reducers/questions/reducer";
import {IInvitationState} from "../reducers/invitation/reducer";

export interface IAppState {
    toastr: any;
    user: IUserState;
    invitation: IInvitationState;
    questionnaires: IQuestionnairesState;
    questions: IQuestionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    isLoading: boolean;
}
