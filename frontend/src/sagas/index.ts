import { all } from 'redux-saga/effects';
import loginSagas from '../containers/SignInBox/sagas';

export default function* rootSaga() {
  yield all([
    loginSagas()
  ]);
}
