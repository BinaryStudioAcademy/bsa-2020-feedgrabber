import { all } from 'redux-saga/effects';
import dataSagas from '../containers/Data/sagas';

export default function* homeSagas() {
  yield all([
    dataSagas()
  ]);
}
