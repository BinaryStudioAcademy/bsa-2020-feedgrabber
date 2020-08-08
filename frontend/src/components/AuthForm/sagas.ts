import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loginRoutine, registerRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {saveTokens} from '../../security/authProvider';
import {IAuthResponse} from "../../models/auth/types";

function* auth(action) {
        const isLogin = action.type === loginRoutine.TRIGGER;
        const endpoint = isLogin ? 'login' : 'register';
        const routine = isLogin ? loginRoutine : registerRoutine;

        const res: IAuthResponse = yield call(apiClient.post, `api/auth/${endpoint}`, action.payload);

        if (res.data.error) {
            yield put(routine.failure(res.data.error));
            return;
        }

        const {user, refreshToken, accessToken} = res.data.data;

        yield put(routine.success(user));
        yield call(saveTokens, {refreshToken, accessToken});
}

export default function* loginSaga() {
    yield all([
        yield takeEvery(loginRoutine.TRIGGER, auth),
        yield takeEvery(registerRoutine.TRIGGER, auth)
    ]);
}
