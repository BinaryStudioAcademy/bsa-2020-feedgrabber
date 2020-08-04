import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import registrationSaga from "components/RegistrationForm/sagas"

export default function* rootSaga() {
  yield all([
    homeSagas(),
    registrationSaga()
  ]);
}
