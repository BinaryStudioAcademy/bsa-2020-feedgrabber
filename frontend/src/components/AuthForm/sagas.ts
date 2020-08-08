import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loginRoutine, logoutRoutine, registerRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { history } from "../../helpers/history.helper";
import { saveTokens, deleteTokens } from '../../security/authProvider';
import { IAuthResponse } from "../../models/auth/types";

function* auth(action) {
    const isLogin = action.type === loginRoutine.TRIGGER;
    const endpoint = isLogin ? 'login' : 'register';

    const res: IAuthResponse = yield call(apiClient.post, `api/auth/${endpoint}`, action.payload);

    if (res.data.error) {
        isLogin
            ? yield put(loginRoutine.failure(res.data.error))
            : yield put(registerRoutine.failure({ payload: res.data.error }));
        return;
    }

    const { user, refreshToken, accessToken } = res.data.data;

    if (!isLogin) {
        yield put(registerRoutine.success({ payload: 'registred!' }));
    }
    yield put(loginRoutine.success(user));
    yield call(saveTokens, { refreshToken, accessToken });
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
