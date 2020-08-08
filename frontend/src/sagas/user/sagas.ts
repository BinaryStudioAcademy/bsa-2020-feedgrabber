import {call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {IUserInfo} from "../../models/user/types";
import {IGeneric} from "../../models/IGeneric";
import {getUserRoutine} from "../../components/AuthForm/routines";
import {createTokenProvider} from "../../security/tokenProvider";

function* getUser() {
    const token = createTokenProvider();
    const res: IGeneric<IUserInfo> = yield call(apiClient.post, `api/user`, token.getToken());

    if (res.data.error) {
        yield put(getUserRoutine.failure({payload: res.data.error}));
        return;
    }

    yield put(getUserRoutine.success(res.data.data));
}

export default function* userSagas() {
    yield takeEvery(getUserRoutine.TRIGGER, getUser);
}
