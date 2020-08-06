import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import loginSagas from '../containers/SignInBox/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    loginSagas()
  ]);
}
