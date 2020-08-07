import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadTeamsRoutine } from './routines';
import apiClient from '../../helpers/apiClient';

function* loadTeams() {
  try {
    const res = yield call(apiClient.get, '/api/teams');
    const { data, error } = res.data;
    if (error) {
      loadTeamsRoutine.failure(error);
    } else {
      yield put(loadTeamsRoutine.success(data));
    }
  } catch (error) {
    console.log('auth err ', error.message);
    yield put(loadTeamsRoutine.failure(error));
  }
}

function* watchLoadTeams() {
  yield takeEvery(loadTeamsRoutine.TRIGGER, loadTeams);
}

export default function* teamsSaga() {
  yield all([
    watchLoadTeams()
  ]);
}
