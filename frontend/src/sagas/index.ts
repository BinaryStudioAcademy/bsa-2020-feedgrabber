import userSagas from 'sagas/user/sagas';
import { all } from 'redux-saga/effects';
import authSaga from "./auth/sagas";
import questionnaireSagas from './qustionnaires/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionnaireSagas()
  ]);
}
