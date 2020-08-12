import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionsReducer from "./questions/reducer";
import questionnairesReducer from "./questionnaires/reducer";
import appReducer from "./app/reducer";
import teamsReducer from "./teams/reducer";
import expandedQuestionnaireReducer from '../containers/ExpandedQuestionnaire/reducer';

export default combineReducers({
  toastr,
  user: authAndProfileReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  teams: teamsReducer,
  expandedQuestionnaire: expandedQuestionnaireReducer,
  app:appReducer
});
