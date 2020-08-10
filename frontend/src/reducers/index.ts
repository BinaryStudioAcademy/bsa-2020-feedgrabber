import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import appReducer from "./app/reducer";
import questionReducer from '../components/QuestionsList/reducer';
import questionnaireListReducer from '../containers/QuestionnaireList/reducer';
import teamsReducer from '../containers/TeamsPage/reducer';

export default combineReducers({
  toastr,
  user: authAndProfileReducer,
  teams: teamsReducer,
  app:appReducer,
  questions: questionReducer,
  questionnaires: questionnaireListReducer
});
