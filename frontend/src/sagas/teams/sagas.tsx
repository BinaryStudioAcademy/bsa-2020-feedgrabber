import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadTeamsRoutine } from '../../containers/TeamsPage/routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {IGeneric} from "../../models/IGeneric";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";

function* loadTeams() {
    const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get, '/api/teams');
    if (res.data.error) {
      yield put(loadTeamsRoutine.failure());
      toastr.error(res.data.error);
      return;
    }
    toastr.success("Loaded teams");
    yield put(loadTeamsRoutine.success(res.data.data));
}

function* watchLoadTeams() {
  yield takeEvery(loadTeamsRoutine.TRIGGER, loadTeams);
}

export default function* teamsSaga() {
  yield all([
    watchLoadTeams()
  ]);
}
