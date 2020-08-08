import { all } from 'redux-saga/effects';
import registrationSaga from "components/RegistrationForm/sagas";
import loginSagas from '../containers/SignInBox/sagas';
import teamsSagas from '../containers/TeamsPage/sagas';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    teamsSagas(),
    registrationSaga()
  ]);
}
