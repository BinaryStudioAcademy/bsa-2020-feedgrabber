import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadQuestionsRoutine, saveQuestionRoutine, loadQuestionnaireQuestionsRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";

function* getAll() {
  const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `api/questions`);

  if (res.data.error) {
    yield put(loadQuestionsRoutine.failure());
    toastr.error(res.data.error);
    return;
  }
  yield put(loadQuestionsRoutine.success(res.data.data));
}

function* save(action) {
  const res: IGeneric<IQuestion> = yield call(apiClient.post, `api/questions`, action.payload);

  if (res.data.error) {
    yield put(saveQuestionRoutine.failure());
    toastr.error(res.data.error);
    return;
  }

  yield put(saveQuestionRoutine.success(res.data.data));
}

function* getByQuestionnaireId(action) {
  try {
    const res: IGeneric<IQuestion[]> = yield call(apiClient.get,
       `http://localhost:5000/api/questions/questionnaires/${action.payload}`);
    const items = res.data.data;

    yield put(loadQuestionnaireQuestionsRoutine.success(items));
  } catch (error) {
    yield put(loadQuestionnaireQuestionsRoutine.failure(error));
    toastr.error("Unable to load questionnaire's questions");
  }
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save),
    yield takeEvery(loadQuestionnaireQuestionsRoutine.TRIGGER, getByQuestionnaireId)
  ]);
}
