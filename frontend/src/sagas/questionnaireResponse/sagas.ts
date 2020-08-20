import { call, put, takeEvery } from 'redux-saga/effects';
import apiClient from 'helpers/apiClient';
import { createResponseRoutine } from './routines';
import { toastr } from 'react-redux-toastr';

function* createResponse(action) {
    try {
        const result = yield call(apiClient.post, `http://localhost:5000/api/responses`, action.payload);
        const responseId = result.data.data;
        yield put(createResponseRoutine.success(responseId));
    } catch(error) {
        yield put(createResponseRoutine.failure());
        toastr.error("Couldn't create response");
    }
}

export default function* responseSagas() {
    yield takeEvery(createResponseRoutine.trigger, createResponse);
}