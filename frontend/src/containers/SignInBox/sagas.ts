import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loginRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import {saveTokens} from '../../security/authProvider';

function* login(action: any) {
    try {
        const res = yield call(apiClient.post, 'api/auth/login', action.authData);
        const { user, refreshToken, accessToken } = res.data;

        yield put(loginRoutine.success(user));
        yield call(saveTokens, { refreshToken, accessToken });

    } catch (error) {
        console.log('auth err ', error.message);
        yield put(loginRoutine.failure(error));
    }
}

function* watchLogin() {
    yield takeEvery(loginRoutine.TRIGGER, login);
}

export default function* loginSaga() {
    yield all([
        watchLogin()
    ]);
}
