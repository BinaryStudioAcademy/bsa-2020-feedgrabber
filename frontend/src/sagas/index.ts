import { all } from 'redux-saga/effects';
import loginSagas from '../containers/SignInBox/sagas';
import teamsSagas from '../containers/TeamsPage/sagas';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    teamsSagas()
  ]);
}
