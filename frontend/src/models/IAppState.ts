import {IUserState} from "./user/types";
import {IUsersState} from "./users/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";
import {IQuestionsState} from "../reducers/questions/reducer";
import {IInvitationState} from "../reducers/invitation/reducer";
import {IInvitationSignUpState} from "../reducers/invitationSignUp/reducer";
import {ICompanyState} from '../reducers/companies/reducer';
import {IQuestionnaireReportState} from "../reducers/questionnaireReport/reducer";
import {INotificationsState} from "../reducers/notifications";

export interface IAppState {
    toastr: any;
    user: IUserState;
    invitation: IInvitationState;
    invitationSignUp: IInvitationSignUpState;
    users: IUsersState;
    questionnaires: IQuestionnairesState;
    questionnaireReport: IQuestionnaireReportState;
    questions: IQuestionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    company: ICompanyState;
    isLoading: boolean;
    notifications: INotificationsState;
}
