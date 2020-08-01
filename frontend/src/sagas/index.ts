import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas()
  ]);
}
