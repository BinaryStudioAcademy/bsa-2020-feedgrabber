import userSagas from 'sagas/user/sagas';
import { all } from 'redux-saga/effects';
import authSaga from "./auth/sagas";
import formsSaga from "./forms/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    formsSaga()
  ]);
}
