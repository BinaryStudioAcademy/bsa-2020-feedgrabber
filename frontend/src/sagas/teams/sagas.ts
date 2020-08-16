import {all, call, put, takeEvery} from 'redux-saga/effects';
import {createTeamRoutine, loadCompanyUsersRoutine, loadCurrentTeamRoutine, loadTeamsRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {IGeneric} from "../../models/IGeneric";
import {ITeamCreationDto} from "../../containers/TeamsPage/teamsModal";
import {IUserInfo} from "../../models/user/types";
import {ITeam, ITeamShort} from "../../models/teams/ITeam";

function* loadTeams() {
  try {
    const res: IGeneric<ITeamShort[]> = yield call(apiClient.get, '/api/teams');
    yield put(loadTeamsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadTeamsRoutine.failure());
    toastr.error(error);
  }
}

function* loadCurrentTeam(action: any) {
  try {
    const res: IGeneric<ITeam> = yield call(apiClient.get, `/api/teams/${action.payload}`);
    yield put(loadCurrentTeamRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadCurrentTeamRoutine.failure());
    toastr.error(error.data.error);
  }
}

function* createTeamTeam(action: any) {
  try {
    const team: ITeamCreationDto = action.payload;

    yield call(apiClient.post, `api/teams`, team);
    yield put(createTeamRoutine.success());
    yield put(loadTeamsRoutine.trigger());

    toastr.success("Team added");

  } catch (errorResponse) {
    yield put(createTeamRoutine.failure());
  }
}

function* loadCompanyUsers() {
  try{
    const res: IGeneric<IUserInfo> = yield call(apiClient.get, `http://localhost:5000/api/user/all/list`);
    yield put(loadCompanyUsersRoutine.success(res.data.data));
  } catch (e) {
    yield put(loadCompanyUsersRoutine.failure());
    toastr.error("Failed to load users");
  }
}

function* watchLoadTeams() {
  yield takeEvery(loadTeamsRoutine.TRIGGER, loadTeams);
}

function* watchLoadCurrentTeam() {
  yield takeEvery(loadCurrentTeamRoutine.TRIGGER, loadCurrentTeam);
}

function* watchCreateTeam() {
  yield takeEvery(createTeamRoutine.TRIGGER, createTeamTeam);
}

function* watchLoadCompanyUsers() {
  yield takeEvery(loadCompanyUsersRoutine.TRIGGER, loadCompanyUsers);
}

export default function* teamsSaga() {
  yield all([
    watchLoadTeams(),
    watchLoadCurrentTeam(),
    watchCreateTeam(),
    watchLoadCompanyUsers()
  ]);
}
