import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import registrationSaga from "components/RegistrationForm/sagas"
import loginSagas from '../containers/SignInBox/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    registrationSaga(),
    loginSagas()
  ]);
}
