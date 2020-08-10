import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import authSaga from "./auth/sagas";
import questionsSaga from '../components/QuestionsList/sagas';
import questionnairesSagas from '../containers/QuestionnaireList/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionsSaga(),
    questionnairesSagas()
  ]);
}
