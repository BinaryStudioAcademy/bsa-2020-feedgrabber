import { call, put, takeEvery } from 'redux-saga/effects'
import {USER_REGISTRATION, SET_USER} from "./actionTypes";
import { registration } from "./authService";

function* register(action: any) {
    try {
        // yield put(setIsLoading(true))
        const user = yield call(registration, action.payload.registrationRequest);
        yield put({type: SET_USER, payload: { user } });
    } catch (error) {
        console.log("registration error ", error.message);
    } finally {
        // yield put(setIsLoading(false));
    }
}

export default function* watchRegister() {
    yield takeEvery(USER_REGISTRATION, register);
}
