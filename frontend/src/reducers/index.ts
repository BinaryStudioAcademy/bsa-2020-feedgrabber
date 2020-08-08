import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import registration from "components/RegistrationForm/reducer";
import signInReducer from '../containers/SignInBox/reducer';
import questionnaireListReducer from '../containers/QuestionnaireList/reducer';

export default combineReducers({
  toastr,
  registration,
  profile: signInReducer,
  questionnaires: questionnaireListReducer
});
