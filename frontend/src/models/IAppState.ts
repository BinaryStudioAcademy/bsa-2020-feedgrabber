import {IUserState} from "./user/types";
import {IUsersState} from "./users/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";
import {IQuestionsState} from "../reducers/questions/reducer";
import {IInvitationState} from "../reducers/invitation/reducer";
import {IInvitationSignUpState} from "../reducers/invitationSignUp/reducer";
import {ICompanyState} from '../reducers/companies/reducer';
import {IQuestionnaireReportsState} from "../reducers/questionnaireReport/reducer";
import {INotificationsState} from "../reducers/notifications";
import {IQuestionnaireResponseState} from "./forms/Response/types";
import {IRoleState} from "../reducers/role/reducer";
import {ISectionsState} from "../reducers/section/reducer";
import {ISearchResultState} from "./search/Search";

export interface IAppState {
    toastr: any;
    user: IUserState;
    invitation: IInvitationState;
    invitationSignUp: IInvitationSignUpState;
    users: IUsersState;
    role: IRoleState;
    questionnaires: IQuestionnairesState;
    questionnaireReports: IQuestionnaireReportsState;
    questionnaireResponse: IQuestionnaireResponseState;
    questions: IQuestionsState;
    sections: ISectionsState;
    app: IAdditionalState;
    teams: ITeamsState;
    company: ICompanyState;
    isLoading: boolean;
    notifications: INotificationsState;
    searchResult: ISearchResultState;
}
