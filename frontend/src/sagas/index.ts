import { all } from 'redux-saga/effects';
import registrationSaga from "components/RegistrationForm/sagas";
import loginSagas from '../containers/SignInBox/sagas';

export default function* rootSaga() {
  yield all([
    registrationSaga(),
    loginSagas()
  ]);
}
