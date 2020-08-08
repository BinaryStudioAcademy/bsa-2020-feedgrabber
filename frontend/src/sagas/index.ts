import { all } from 'redux-saga/effects';
import authSaga from "../components/AuthForm/sagas";

export default function* rootSaga() {
  yield all([
    authSaga()
  ]);
}
