import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import questionnaireListReducer from '../containers/QuestionnaireList/reducer';

export default combineReducers({
  toastr,
  user: authAndProfileReducer,
  questionnaires: questionnaireListReducer
});
