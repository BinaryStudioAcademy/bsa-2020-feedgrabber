import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loginRoutine, logoutRoutine, registerRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {history} from "../../helpers/history.helper";
import {deleteTokens, saveTokens} from '../../security/authProvider';
import {IAuthResponse} from "../../models/auth/types";
import {IGeneric} from "../../models/IGeneric";

function* auth(action) {
    const isLogin = action.type === loginRoutine.TRIGGER;
    const endpoint = isLogin ? 'login' : 'register';
    const routine = isLogin ? loginRoutine : registerRoutine;

    const res: IGeneric<IAuthResponse> = yield call(apiClient.post, `api/auth/${endpoint}`, action.payload);

    if (res.data.error) {
        yield put(routine.failure(res.data.error));
        return;
    }

    const {user, refreshToken, accessToken} = res.data.data;

    yield put(routine.success(user));
    yield call(saveTokens, {accessToken, refreshToken});
    yield call(history.push, "/");
}

function* logout() {
    yield call(deleteTokens);
    yield put(logoutRoutine.success());
    yield call(history.push, "/landing");
}

export default function* authSaga() {
    yield all([
        yield takeEvery(loginRoutine.TRIGGER, auth),
        yield takeEvery(registerRoutine.TRIGGER, auth),
        yield takeEvery(logoutRoutine.TRIGGER, logout)
    ]);
}
