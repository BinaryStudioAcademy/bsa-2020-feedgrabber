import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import {loadOneQuestionnaireRoutine} from "./routines";

function* loadOneQuestionnaire(action: any) {
  try {
    const res = yield call(apiClient.get, `http://localhost:5000/api/questionnaires/${action.payload}`);
    const items = res.data.data;

    yield put(loadOneQuestionnaireRoutine.success(items));
  } catch (error) {
    yield put(loadOneQuestionnaireRoutine.failure(error));
    toastr.error("Unable to load questionnaire");
  }
}

export default function* expandedQuestionnaireSagas() {
  yield all([
    yield takeEvery(loadOneQuestionnaireRoutine.TRIGGER, loadOneQuestionnaire)
  ]);
}
