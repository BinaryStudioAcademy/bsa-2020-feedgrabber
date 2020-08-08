import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authReducers from '../components/AuthForm/reducer';

export default combineReducers({
  toastr,
  profile: authReducers
});
