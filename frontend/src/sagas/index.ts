import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import teamsSagas from './teams/sagas';
import authSaga from "./auth/sagas";
import questionSagas from './questions/sagas';
import questionnairesSagas from "./qustionnaires/sagas";
import expandedQuestionnaireSagas from "./expandedQuestionnaire/sagas";
import invitationSagas from "./invitation/sagas";
import invitationSignUpSagas from "./invitationSignUp/sagas";
import categorieSagas from './categories/sagas';
import companiesSaga from "./companies/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    questionSagas(),
    teamsSagas(),
    questionnairesSagas(),
    expandedQuestionnaireSagas(),
    invitationSagas(),
    invitationSignUpSagas(),
    categorieSagas(),
    companiesSaga()
  ]);
}
