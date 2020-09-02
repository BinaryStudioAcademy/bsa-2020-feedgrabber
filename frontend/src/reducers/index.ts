import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionsReducer from "./questions/reducer";
import questionnairesReducer from "./questionnaires/reducer";
import questionnaireReportReducer from "./questionnaireReport/reducer";
import appReducer from "./app/reducer";
import teamsReducer from "./teams/reducer";
import usersReducer from "./users/reducer";
import roleReducer from "./role/reducer";
import expandedQuestionnaireReducer from './expandedQuestionnaire/reducer';
import invitationReducer from './invitation/reducer';
import invitationSignUpReducer from './invitationSignUp/reducer';
import companyReducer from "./companies/reducer";
import companyFeedReducer from "./companyFeed/reducer";
import notificationReducer from "./notifications";
import responseReducer from "./questionnaireResponse/reducer";
import sectionsReducer from './section/reducer';
import newsReducer from './news/reducer';

export default combineReducers({
  toastr,
  users: usersReducer,
  user: authAndProfileReducer,
  invitation: invitationReducer,
  invitationSignUp: invitationSignUpReducer,
  questionnaires: questionnairesReducer,
  questionnaireReports: questionnaireReportReducer,
  questions: questionsReducer,
  sections: sectionsReducer,
  questionnaireResponse: responseReducer,
  teams: teamsReducer,
  expandedQuestionnaire: expandedQuestionnaireReducer,
  app:appReducer,
  company: companyReducer,
  companyFeed: companyFeedReducer,
  notifications: notificationReducer,
  role: roleReducer,
  news: newsReducer
});
