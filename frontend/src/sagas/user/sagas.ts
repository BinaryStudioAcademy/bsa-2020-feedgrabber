import {call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {IUserInfo} from "../../models/user/types";
import {IGeneric} from "../../models/IGeneric";
import {getUserRoutine} from "../auth/routines";

function* getUser() {
    try {
        const res: IGeneric<IUserInfo> = yield call(apiClient.get, `api/user`);
        yield put(getUserRoutine.success(res.data.data));
    } catch (error) {
        yield put(getUserRoutine.failure(error));
    }
}

export default function* userSagas() {
    yield takeEvery(getUserRoutine.TRIGGER, getUser);
}
