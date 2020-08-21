import { call, put, takeEvery, all } from 'redux-saga/effects';
import apiClient from 'helpers/apiClient';
import { getResponseRoutine, saveResponseRoutine } from './routines';
import { toastr } from 'react-redux-toastr';
import { loadRequestedQuestionnairesRoutine } from 'sagas/request/routines';

function* getResponse(action) {
    try {
        const result = yield call(apiClient.get, `http://localhost:5000/api/response/request/${action.payload}`);
        const response = result.data.data;
        yield put(getResponseRoutine.success(response));
    } catch(error) {
        yield put(getResponseRoutine.failure());
        toastr.error("Couldn't get a response");
    }
}

function* saveResponse(action) {
    try {
        yield call(apiClient.put, `http://localhost:5000/api/response`, action.payload);
        yield put(saveResponseRoutine.success());
        yield put(loadRequestedQuestionnairesRoutine.trigger());
        toastr.success("Response was saved");
    } catch (error) {
        yield put(saveResponseRoutine.failure());
        toastr.error("Couldn't save response");
    }
}

export default function* responseSagas() {
    yield all([
        yield takeEvery(getResponseRoutine.trigger, getResponse),
        yield takeEvery(saveResponseRoutine.trigger, saveResponse)
    ]);
}