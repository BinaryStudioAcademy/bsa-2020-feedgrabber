import { all, call, put, takeEvery } from 'redux-saga/effects';
import {loadQuestionByIdRoutine, loadQuestionsRoutine, saveQuestionRoutine} from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

function* getAll() {
  const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `api/questions`);
  try {
    if (res.data.error) {
      yield put(loadQuestionsRoutine.failure());
      toastr.error(res.data.error);
      return;
    }
    yield put(loadQuestionsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadQuestionsRoutine.failure());
    toastr.error('Sorry, something went wrong');
  }
}

function* getById(action) {
  try {
    const id = action.payload;
    if (id === 'empty') {
      loadQuestionByIdRoutine.success(defaultQuestion);
      return;
    }

    const response = yield call(apiClient.get, `/api/questions/${action.payload}`);
    if (response.data.error) {
      yield put(loadQuestionByIdRoutine.failure());
      toastr.error(response.data.error);
      return;
    }

    const question: IGeneric<IQuestion> = {
      ...response.data.data,
      type: response.data.data.type.toLowerCase(),
      details: JSON.parse(response.data.data.details)
    };
    yield put(loadQuestionByIdRoutine.success(question));
  } catch (error) {
    yield put(loadQuestionByIdRoutine.failure());
    toastr.error('Sorry, something went wrong');
  }
}

function* save(action) {
  const question = action.payload;

  const res: IGeneric<IQuestion> = question.id
    ? yield call(apiClient.put, `api/questions`, question)
    : yield call(apiClient.post, `api/questions`, question);

  if (res.data.error) {
    yield put(saveQuestionRoutine.failure());
    toastr.error(res.data.error);
    return;
  }

  yield put(saveQuestionRoutine.success(res.data.data));
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save),
    yield takeEvery(loadQuestionByIdRoutine.TRIGGER, getById)
  ]);
}
