import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import signInReducer from '../containers/SignInBox/reducer';

export default combineReducers({
  toastr,
  data,
  profile: signInReducer
});
