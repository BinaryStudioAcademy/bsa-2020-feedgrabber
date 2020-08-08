import { all } from 'redux-saga/effects';
import registrationSaga from "components/RegistrationForm/sagas";
import loginSagas from '../containers/SignInBox/sagas';
import questionnairesSagas from '../containers/QuestionnaireList/sagas';

export default function* rootSaga() {
  yield all([
    registrationSaga(),
    loginSagas(),
    questionnairesSagas()
  ]);
}
