import { all } from 'redux-saga/effects';
import loginSagas from '../components/AuthForm/sagas';

export default function* rootSaga() {
  yield all([
    loginSagas()
  ]);
}
