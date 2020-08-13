import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionsReducer from "./questions/reducer";
import questionnairesReducer from "./questionnaires/reducer";
import appReducer from "./app/reducer";
import teamsReducer from "./teams/reducer";
import usersReducer from "./users/reducer";
import expandedQuestionnaireReducer from './expandedQuestionnaire/reducer';
import companyReducer from "./companies/reducer";

export default combineReducers({
  toastr,
  users: usersReducer,
  user: authAndProfileReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  teams: teamsReducer,
  expandedQuestionnaire: expandedQuestionnaireReducer,
  app:appReducer,
  company: companyReducer
});
