import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import registration from "components/RegistrationForm/reducer";
import signInReducer from '../containers/SignInBox/reducer';
import teamsReducer from '../containers/TeamsPage/reducer';

export default combineReducers({
  toastr,
  profile: signInReducer,
  teams: teamsReducer,
  registration
});
