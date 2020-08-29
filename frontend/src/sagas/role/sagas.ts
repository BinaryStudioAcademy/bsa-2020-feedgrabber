import {all, call, put, takeEvery} from "redux-saga/effects";
import apiClient from "../../helpers/apiClient";
import {toastr} from 'react-redux-toastr';
import {
    loadShortRolesRoutine,
    setIsLoadingRoutine
} from "./routines";

function* loadRoles() {
    try {
        yield put(setIsLoadingRoutine.trigger({isLoading: true}));
        const roles = yield call(apiClient.get, `/api/role`);
        yield put(loadShortRolesRoutine.success(roles.data.data));
    } catch {
        toastr.error("Couldn't load company roles");
        yield put(loadShortRolesRoutine.failure());
    }
}

export default function* roleSagas() {
    yield all([
        yield takeEvery(loadShortRolesRoutine.TRIGGER, loadRoles)
    ]);
}
