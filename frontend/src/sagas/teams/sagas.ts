import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadTeamsRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {IGeneric} from "../../models/IGeneric";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";

function* loadTeams() {
    try {
      const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get, '/api/teams');
      yield put(loadTeamsRoutine.success(res.data.data));
    } catch (error) {
      yield put(loadTeamsRoutine.failure());
      toastr.error(error);
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
