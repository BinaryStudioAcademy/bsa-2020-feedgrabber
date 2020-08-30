import {all} from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import usersSagas from 'sagas/users/sagas';
import teamsSagas from './teams/sagas';
import authSaga from "./auth/sagas";
import questionSagas from './questions/sagas';
import questionnairesSagas from "./qustionnaires/sagas";
import invitationSagas from "./invitation/sagas";
import invitationSignUpSagas from "./invitationSignUp/sagas";
import categorieSagas from './categories/sagas';
import companiesSaga from "./companies/sagas";
import requestSaga from "./request/sagas";
import questionnaireReportSagas from "./report/sagas";
import notificationsSagas from "./notifications/sagas";
import sectionSagas from './sections/sagas';
import responseSagas from './response/sagas';
import roleSagas from './role/sagas';
import searchSagas from "./search/sagas";

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSagas(),
        questionSagas(),
        teamsSagas(),
        questionnairesSagas(),
        questionnaireReportSagas(),
        usersSagas(),
        invitationSagas(),
        invitationSignUpSagas(),
        categorieSagas(),
        companiesSaga(),
        requestSaga(),
        notificationsSagas(),
        responseSagas(),
        roleSagas(),
        sectionSagas(),
        searchSagas()
    ]);
}
