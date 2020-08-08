import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getUserRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { IUserInfo } from "../../models/user/types";

function* getUser() {

    const res: { data: { data: IUserInfo; error: string } } = yield call(apiClient.get, `api/user`);

    if (res.data.error) {
        yield put(getUserRoutine.failure({ payload: res.data.error }));
        return;
    }

    yield put(getUserRoutine.success(res.data.data));
}

export default function* userSagas() {
    yield takeEvery(getUserRoutine.TRIGGER, getUser);
}
