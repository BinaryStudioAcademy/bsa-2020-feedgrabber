import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authReducers from '../components/AuthForm/reducer';
import userReducer from '../components/ProfileInfo/reducer';

export default combineReducers({
  toastr,
  profile: authReducers,
  user: userReducer
});
