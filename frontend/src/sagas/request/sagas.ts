import apiClient from "../../helpers/apiClient";
import {call, takeEvery, all, put} from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
    sendQuestionnaireRequestRoutine,
    loadRequestedQuestionnairesRoutine,
    closeRequestRoutine
} from "./routines";
import {loadQuestionnaireRequestsRoutine} from "../report/routines";

function* saveRequest(action) {
  try {
    yield call(apiClient.post,'/api/request/new', action.payload);
    toastr.success('Request Created');
  } catch(error) {
    toastr.error('Creating Request Failed');
  }
}

function* closeRequest(action) {
    try {
        yield call(apiClient.post,`/api/request/close?requestId=${action.payload.requestId}`);
        toastr.info('Request Closed');
        yield put(loadQuestionnaireRequestsRoutine.trigger(action.payload.questionnaireId));
    } catch(e) {
        toastr.error('Closing failed');
    }
}

function* loadRequestedQuestionnaires() {
  try {
    const result = yield call(apiClient.get, `/api/request/pending`);
    result.data.data.forEach(req => req['expirationDate'] = req.expirationDate
      ? new Date(req.expirationDate) : null);
    yield put(loadRequestedQuestionnairesRoutine.success(result.data.data));
  } catch (error) {
    yield put(loadRequestedQuestionnairesRoutine.failure());
    toastr.error("Couldn't load pending questionnaires");
  }
}

export default function* requestSaga() {
  yield all([
    yield takeEvery(sendQuestionnaireRequestRoutine.TRIGGER, saveRequest),
    yield takeEvery(loadRequestedQuestionnairesRoutine.TRIGGER, loadRequestedQuestionnaires),
    yield takeEvery(closeRequestRoutine.TRIGGER, closeRequest)
  ]);
}
