import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {IUserInfo} from "../../models/user/types";
import {IGeneric} from "../../models/IGeneric";
import {toastr} from 'react-redux-toastr';
import {getUserRoutine, resetPasswordRoutine} from "../auth/routines";

function* getUser() {
    try {
        const res: IGeneric<IUserInfo> = yield call(apiClient.get, `api/user`);
        yield put(getUserRoutine.success(res.data.data));
    } catch (error) {
        yield put(getUserRoutine.failure(error));
    }
}

function* resetPassword(action) {
    try {
        // payload: {companyId, userEmail}
        yield call(apiClient.post, 'api/user/reset', action.payload);
        yield call(toastr.info, ("Check your email"));
    } catch (e) {
        console.log(e);
    }
}

export default function* userSagas() {
    yield all([
        yield takeEvery(getUserRoutine.TRIGGER, getUser),
        yield takeEvery(resetPasswordRoutine.TRIGGER, resetPassword)
    ]);
}
