import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadQuestionsRoutine, saveQuestionRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";

function* getAll() {
  try {
    const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `api/questions`);

    yield put(loadQuestionsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadQuestionsRoutine.failure());
    toastr.error(error);
  }
}

function* save(action) {
  try {
    const res: IGeneric<IQuestion> = yield call(apiClient.post, `api/questions`, action.payload);

    yield put(saveQuestionRoutine.success(res.data.data));
  } catch (error) {
    yield put(saveQuestionRoutine.failure());
    toastr.error(error);
  }
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save)
  ]);
}
