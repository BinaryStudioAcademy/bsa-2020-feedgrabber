import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import loginSagas from '../containers/SignInBox/sagas';
import registrationSaga from "components/RegistrationForm/sagas"

export default function* rootSaga() {
  yield all([
    homeSagas(),
    loginSagas(),
    registrationSaga()
  ]);
}
