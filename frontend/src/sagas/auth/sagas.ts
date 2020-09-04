import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loginRoutine, logoutRoutine, registerRoutine, registerByEmailRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {history} from "../../helpers/history.helper";
import {deleteTokens, saveTokens} from '../../security/authProvider';
import {IAuthResponse, IRegisterResponse} from "../../models/auth/types";
import {IGeneric} from "../../models/IGeneric";
import {redirectToMain} from "../../helpers/subdomain.helper";

function* login(action) {
    try {
        const res: IGeneric<IAuthResponse> = yield call(apiClient.post, '/api/auth/login', action.payload);
        const {user, refreshToken, accessToken} = res.data.data;

        yield put(loginRoutine.success(user));
        yield call(saveTokens, {accessToken, refreshToken});
        yield call(history.push, "/");
    } catch (error) {
        yield put(loginRoutine.failure(error.response?.data?.error || "No response"));
    }
}

function* signup(action) {
    try {
        const res: IGeneric<IRegisterResponse> = yield call(apiClient.post, '/api/auth/register', action.payload);
        yield put(registerRoutine.success(res.data.data.success));
    } catch (error) {
      yield put(registerRoutine.failure(error.response?.data?.error || "No response"));
    }
}

function* signUpByEmail(action) {
    try {
        const res: IGeneric<IRegisterResponse> = 
        yield call(apiClient.post, `/api/auth/registerByEmail`, action.payload);
        yield put(registerByEmailRoutine.success(res.data.data.success));
    } catch (error) {
        yield put(registerByEmailRoutine.failure(error.response?.data?.error || "No response"));
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
        yield takeEvery(loginRoutine.TRIGGER, login),
        yield takeEvery(registerRoutine.TRIGGER, signup),
        yield takeEvery(logoutRoutine.TRIGGER, logout),
        yield takeEvery(registerByEmailRoutine.TRIGGER, signUpByEmail)
    ]);
}
