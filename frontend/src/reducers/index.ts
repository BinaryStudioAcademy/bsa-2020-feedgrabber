import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';

export default combineReducers({
  toastr,
  data
});
