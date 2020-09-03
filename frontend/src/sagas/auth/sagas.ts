import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loginRoutine, logoutRoutine, registerRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {history} from "../../helpers/history.helper";
import {deleteTokens, saveTokens} from '../../security/authProvider';
import {IAuthResponse} from "../../models/auth/types";
import {IGeneric} from "../../models/IGeneric";
import {redirectToMain} from "../../helpers/subdomain.helper";

function* auth(action) {
    const isLogin = action.type === loginRoutine.TRIGGER;
    let endpoint = isLogin ? 'login' : 'register';
    const routine = isLogin ? loginRoutine : registerRoutine;
    const {userDto, byEmail} = action.payload;
    endpoint += byEmail ? '/byEmail' : '';

    try {
        const res: IGeneric<IAuthResponse> = yield call(apiClient.post, `/api/auth/${endpoint}`, userDto);
        const {user, refreshToken, accessToken} = res.data.data;

        yield put(routine.success(user));
        yield call(saveTokens, {accessToken, refreshToken});
        yield call(history.push, "/");
    } catch (error) {
        yield put(routine.failure(error.response?.data?.error || "No response"));
    }
}

function* logout() {
    yield call(deleteTokens);
    yield call(redirectToMain);
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
