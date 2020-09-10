import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadDashboardDataRoutine } from './rourines';
import apiClient from 'helpers/apiClient';
import {IDashboardData} from "../../models/dashboard/types";

function* loadData(action) {
  try {
    const res = yield call(apiClient.get, `/api/dashboard`);
    const data: IDashboardData = res.data.data;
    yield put(loadDashboardDataRoutine.success(data));
  } catch (error) {
    console.log('fail');
  }
}

export default function* dashboardSagas() {
  yield all([
    yield takeEvery(loadDashboardDataRoutine.TRIGGER, loadData)
  ]);
}