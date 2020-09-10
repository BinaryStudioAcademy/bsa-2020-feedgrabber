import {combineReducers} from 'redux';
import {reducer as toastr} from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionsReducer from "./questions/reducer";
import questionnairesReducer from "./questionnaires/reducer";
import questionnaireReportReducer from "./questionnaireReport/reducer";
import appReducer from "./app/reducer";
import teamsReducer from "./teams/reducer";
import usersReducer from "./users/reducer";
import roleReducer from "./role/reducer";
import invitationReducer from './invitation/reducer';
import invitationSignUpReducer from './invitationSignUp/reducer';
import companyReducer from "./companies/reducer";
import companyFeedReducer from "./companyFeed/reducer";
import notificationReducer from "./notifications";
import responseReducer from "./questionnaireResponse/reducer";
import searchReducer from "./search/reducer";
import dashboardReducer from "./dashboard/reducer";
import categoriesReducer from "./categories/reducer";
import formEditorReducer from "./formEditor/reducer";

export default combineReducers({
  toastr,
  users: usersReducer,
  user: authAndProfileReducer,
  invitation: invitationReducer,
  categories: categoriesReducer,
  invitationSignUp: invitationSignUpReducer,
  questionnaires: questionnairesReducer,
  questionnaireReports: questionnaireReportReducer,
  questions: questionsReducer,
  questionnaireResponse: responseReducer,
  formEditor: formEditorReducer,
  teams: teamsReducer,
  app: appReducer,
  company: companyReducer,
  companyFeed: companyFeedReducer,
  notifications: notificationReducer,
  role: roleReducer,
  search: searchReducer,
  dashboard: dashboardReducer
});

