import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from 'screens/Home/routines';
import * as homeService from '../../services/home.service';

function* getData() {
  try {
    const response = yield call(homeService.getData);
    yield put(fetchDataRoutine.success(response));
    toastr.success('Data loaded!');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

export default function* dataSagas() {
  yield all([
    takeEvery(fetchDataRoutine.TRIGGER, getData)
  ]);
}
