import {all, call, put, takeEvery} from 'redux-saga/effects';
import {createTeamRoutine, loadCompanyUsersRoutine, loadTeamsRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {IGeneric} from "../../models/IGeneric";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {ITeamCreationDto} from "../../components/TeamsList/teamsModal";
import {IUserInfo} from "../../models/user/types";

function* loadTeams() {
    const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get, '/api/teams');
    if (res.data.error) {
        yield put(loadTeamsRoutine.failure());
        toastr.error(res.data.error);
        return;
    }
    yield put(loadTeamsRoutine.success(res.data.data));
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
    const res: IGeneric<IUserInfo> = yield call(apiClient.get, `api/user/all`);

    if (res.data.error) {
        yield put(loadCompanyUsersRoutine.failure(res.data.error));
        return;
    }

    yield put(loadCompanyUsersRoutine.success(res.data.data));
}

function* watchLoadTeams() {
    yield takeEvery(loadTeamsRoutine.TRIGGER, loadTeams);
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
        watchCreateTeam(),
        watchLoadCompanyUsers()
    ]);
}
