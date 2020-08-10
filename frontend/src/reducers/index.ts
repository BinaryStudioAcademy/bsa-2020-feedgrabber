import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authAndProfileReducer from './auth/reducer';
import teamsReducer from '../containers/TeamsPage/reducer';

export default combineReducers({
  toastr,
  user: authAndProfileReducer,
  teams: teamsReducer
});
