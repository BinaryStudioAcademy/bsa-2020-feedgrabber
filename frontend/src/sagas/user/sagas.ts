import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {IUserInfo, IUserShort} from "../../models/user/types";
import {IGeneric} from "../../models/IGeneric";
import {toastr} from 'react-redux-toastr';
import {
    getUserRoutine,
    getUserShortRoutine,
    resetPasswordRoutine,
    sendEmailToResetPasswordRoutine
} from "../auth/routines";
import {history} from "../../helpers/history.helper";

function* getUser() {
    try {
        const res: IGeneric<IUserInfo> = yield call(apiClient.get, `/api/user`);
        yield put(getUserRoutine.success(res.data.data));
    } catch (error) {
        yield put(getUserRoutine.failure(error));
    }
}

function* getUserShort(action) {
    try {
        const res: IGeneric<IUserShort> =
            yield call(apiClient.get,
                `/api/user/short?email=${action.payload.email}&companyId=${action.payload.companyId}`);
        yield put(getUserShortRoutine.success(res.data.data));
    }catch(error) {
        yield put(getUserShortRoutine.failure(error));
    }

}

function* sendEmailPassReset(action) {
    try {
        // payload: {companyId, userEmail}
        yield call(apiClient.post, '/api/user/email/reset', action.payload);
        yield call(toastr.info, ("Check your email"));
    } catch (e) {
        yield call(toastr.error, ("Something went wrong, try again"));
        console.log(e);
    }
}

function* passwordReset(action) {
    try {
        // payload: {token, password}
        yield call(apiClient.post, '/api/user/reset', action.payload);
        yield call(toastr.success, ("Your password was updated!"));
    } catch (e) {
        yield call(toastr.error, ("Something went wrong, try again"));
        console.log(e);
    }
    yield call(history.push, '/auth');
}

export default function* userSagas() {
    yield all([
        yield takeEvery(getUserRoutine.TRIGGER, getUser),
        yield takeEvery(sendEmailToResetPasswordRoutine.TRIGGER, sendEmailPassReset),
        yield takeEvery(resetPasswordRoutine.TRIGGER, passwordReset),
        yield takeEvery(getUserShortRoutine.TRIGGER, getUserShort)
    ]);
}
