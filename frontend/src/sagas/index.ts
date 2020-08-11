import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import teamsSagas from '../containers/TeamsPage/sagas';
import authSaga from "./auth/sagas";
import questionSagas from './questions/sagas';
import questionnairesSagas from "./qustionnaires/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionSagas(),
    teamsSagas(),
    questionnairesSagas()
  ]);
}
