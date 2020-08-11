import { all } from 'redux-saga/effects';
import userSagas from 'sagas/user/sagas';
import teamsSagas from '../containers/TeamsPage/sagas';
import authSaga from "./auth/sagas";
import questionsSaga from '../components/QuestionsList/sagas';
import questionnairesSagas from '../containers/QuestionnaireList/sagas';
import expandedQuestionnaireSagas from "../containers/ExpandedQuestionnaire/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSagas(),
    teamsSagas(),
    questionsSaga(),
    questionnairesSagas(),
    expandedQuestionnaireSagas()
  ]);
}
