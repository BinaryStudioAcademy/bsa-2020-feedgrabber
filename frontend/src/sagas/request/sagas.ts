import apiClient from "../../helpers/apiClient";
import {call, takeEvery} from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {sendQuestionnaireRequestRoutine} from "./routines";

function* saveRequest(action) {
  try {
    yield call(apiClient.post,'/api/request/new' ,action.payload);
    toastr.success('Request Created');
  } catch(error) {
    toastr.error('CReating Request Failed');
  }
}

export default function* requestSaga() {
  yield takeEvery(sendQuestionnaireRequestRoutine.TRIGGER, saveRequest);
}