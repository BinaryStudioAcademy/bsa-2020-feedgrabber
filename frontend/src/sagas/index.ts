import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import usersSagas from 'sagas/users/sagas';
import teamsSagas from './teams/sagas';
import authSaga from "./auth/sagas";
import questionSagas from './questions/sagas';
import questionnairesSagas from "./qustionnaires/sagas";
import expandedQuestionnaireSagas from "./expandedQuestionnaire/sagas";
import categorieSagas from './categories/sagas';
import companiesSaga from "./companies/sagas";
import responseAnswersSaga from './responseAnswers/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionSagas(),
    teamsSagas(),
    questionnairesSagas(),
    usersSagas(),
    expandedQuestionnaireSagas(),
    companiesSaga(),
    responseAnswersSaga(),
    categorieSagas(),
    companiesSaga()
  ]);
}
