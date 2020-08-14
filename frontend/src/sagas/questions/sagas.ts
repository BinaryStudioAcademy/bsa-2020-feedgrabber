import { all, call, put, takeEvery } from 'redux-saga/effects';
import {loadQuestionByIdRoutine, loadQuestionsRoutine, saveQuestionRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

function* getAll() {
  try {
    const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `api/questions`);
    yield put(loadQuestionsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadQuestionsRoutine.failure());
    toastr.error(error);
  }
}

function* getById(action) {
  try {
    const id = action.payload;

    if (id === 'empty') {
      yield put(loadQuestionByIdRoutine.success(defaultQuestion));
      return;
    }
    const response = yield call(apiClient.get, `/api/questions/${action.payload}`);
    const question: IGeneric<IQuestion> = {
      ...response.data.data,
      type: response.data.data.type.toLowerCase(),
      details: JSON.parse(response.data.data.details)
    };
    yield put(loadQuestionByIdRoutine.success(question));
  } catch (error) {
    yield put(loadQuestionByIdRoutine.failure());
    toastr.error('cant to get question by Id');
  }
}

function* save(action) {
  const question = action.payload;
  try {
    const res: IGeneric<IQuestion> = question.id
      ? yield call(apiClient.put, `api/questions`, question)
      : yield call(apiClient.post, `api/questions`, question);

    yield put(saveQuestionRoutine.success(res.data.data));
    yield put(loadQuestionsRoutine.trigger());
  } catch (error) {
    yield put(saveQuestionRoutine.failure());
    toastr.error(error);
  }
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save),
    yield takeEvery(loadQuestionByIdRoutine.TRIGGER, getById)
  ]);
}
