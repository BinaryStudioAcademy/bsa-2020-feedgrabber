import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionsReducer from "./questions/reducer";
import questionnairesReducer from "./questionnaires/reducer";
import questionnaireReportReducer from "./questionnaireReport/reducer";
import appReducer from "./app/reducer";
import teamsReducer from "./teams/reducer";
import usersReducer from "./users/reducer";
import expandedQuestionnaireReducer from './expandedQuestionnaire/reducer';
import invitationReducer from './invitation/reducer';
import invitationSignUpReducer from './invitationSignUp/reducer';
import companyReducer from "./companies/reducer";
import answersReduser from './responseAnswers/reducer';
import notificationReducer from "./notifications";

export default combineReducers({
  toastr,
  users: usersReducer,
  user: authAndProfileReducer,
  invitation: invitationReducer,
  invitationSignUp: invitationSignUpReducer,
  questionnaires: questionnairesReducer,
  questionnaireReport: questionnaireReportReducer,
  questions: questionsReducer,
  teams: teamsReducer,
  expandedQuestionnaire: expandedQuestionnaireReducer,
  app:appReducer,
  company: companyReducer,
  answers: answersReduser,
  notifications: notificationReducer
});
