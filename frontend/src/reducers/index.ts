import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import signInReducer from '../containers/SignInBox/reducer';
import teamsReducer from '../containers/TeamsPage/reducer';

export default combineReducers({
  toastr,
  profile: signInReducer,
  teams: teamsReducer
});
