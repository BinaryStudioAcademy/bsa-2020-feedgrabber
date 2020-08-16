import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
  createTeamRoutine,
  loadCompanyUsersRoutine,
  loadCurrentTeamRoutine,
  loadTeamsRoutine, toggleUserCurrentTeamRoutine,
  updateTeamRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {IGeneric} from "../../models/IGeneric";
import {ITeamCreationDto} from "../../containers/TeamsPage/teamsModal";
import {IUserInfo} from "../../models/user/types";
import {ITeam, ITeamShort, ITeamUpdate, ITeamUserToggle} from "../../models/teams/ITeam";

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

function* updateTeam(action: any) {
  try {
    const team: ITeamUpdate = action.payload;

    yield call(apiClient.put, `http://localhost:5000/api/teams`, team);
    yield put(updateTeamRoutine.success());
    yield put(loadTeamsRoutine.trigger());
    toastr.success("Team metadata updated");
  } catch (errorResponse) {
    yield put(updateTeamRoutine.failure(errorResponse.data.error || "No response"));
    toastr.error("Unable to update Team metadata");
  }
}

function* toggleUserTeam(action: any) {
  const request: ITeamUserToggle = action.payload;
  try {
    const response = yield call(apiClient.put, `http://localhost:5000/api/teams/toggle_user`, request);
    const data = response.data.data;
    yield put(toggleUserCurrentTeamRoutine.success(data));
    toastr.success(`User ${request.username} ${data.added ? "added to" : "deleted from"} the team`);
  } catch (errorResponse) {
    yield put(toggleUserCurrentTeamRoutine.failure(request.userId));
    toastr.error("Error while user toggle");
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

function* watchUpdateTeam() {
  yield takeEvery(updateTeamRoutine.TRIGGER, updateTeam);
}

function* watchToggleUserTeam() {
  yield takeEvery(toggleUserCurrentTeamRoutine.TRIGGER, toggleUserTeam);
}

function* watchLoadCompanyUsers() {
  yield takeEvery(loadCompanyUsersRoutine.TRIGGER, loadCompanyUsers);
}

export default function* teamsSaga() {
  yield all([
    watchLoadTeams(),
    watchLoadCurrentTeam(),
    watchCreateTeam(),
    watchUpdateTeam(),
    watchToggleUserTeam(),
    watchLoadCompanyUsers()
  ]);
}
