import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import authSaga from "./auth/sagas";
import questionSagas from './questions/sagas';
import questionnairesSagas from "../containers/QuestionnaireList/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionnairesSagas(),
    questionSagas()
  ]);
}
