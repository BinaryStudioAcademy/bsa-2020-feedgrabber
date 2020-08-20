import { call, put, takeEvery, all } from 'redux-saga/effects';
import apiClient from 'helpers/apiClient';
import { getResponseRoutine, saveResponseRoutine } from './routines';
import { toastr } from 'react-redux-toastr';
import { IGeneric } from 'models/IGeneric';
import { IQuestionnaireResponse } from 'models/forms/Response/types';

function* getResponse(action) {
    try {
        const result: IGeneric<IQuestionnaireResponse> = 
        yield call(apiClient.get, `http://localhost:5000/api/response/request`, action.payload);
        const response = result.data.data;
        yield put(getResponseRoutine.success(response));
    } catch(error) {
        yield put(getResponseRoutine.failure());
        toastr.error("Couldn't get a response");
    }
}

function* saveResponse(action) {
    try {
        const result = yield call(apiClient.post, `http://localhost:5000/api/response/`, action.payload);
        yield put(saveResponseRoutine.success(result));
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