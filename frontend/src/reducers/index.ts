import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import registration from "components/RegistrationForm/reducer"
import signInReducer from '../containers/SignInBox/reducer';

export default combineReducers({
  toastr,
  data,
  registration,
  profile: signInReducer,
});
