import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import appReducer from "./app/reducer";
import questionReducer from '../components/QuestionsList/reducer';
import questionnaireListReducer from '../containers/QuestionnaireList/reducer';

export default combineReducers({
  toastr,
  app:appReducer,
  user: authAndProfileReducer,
  questions: questionReducer,
  questionnaires: questionnaireListReducer
});
