import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadQuestionsRoutine, saveQuestionRoutine } from '../../containers/QuestionsList/routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import { IQuestion } from 'models/forms/Questions/types';

function* getAll() {
  const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `api/questions`);

  if (res.data.error) {
    yield put(loadQuestionsRoutine.failure(res.data.error));
    return;
  }
  yield put(loadQuestionsRoutine.success(res.data.data));
}

function* save() {
  const res: IGeneric<IQuestion> = yield call(apiClient.post, `api/questions`);

  if (res.data.error) {
    yield put(loadQuestionsRoutine.failure(res.data.error));
    return;
  }

  yield put(loadQuestionsRoutine.success(res.data.data));
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save)
  ]);
}
