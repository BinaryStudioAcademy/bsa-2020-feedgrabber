import { call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { loadQuestionsRoutine } from './routines';

import apiClient from '../../helpers/apiClient';

function* loadQuestionsList(action: any) {
  try {
    const result = yield call(apiClient.get, 'http://localhost:5000/api/questions');
    const questions = result.data.data;
    yield put(loadQuestionsRoutine.success(questions));
  } catch (err) {
    // handle error
    console.error('ERROR');
    yield put(loadQuestionsRoutine.failure('Unable to load questions :('));
    toastr.error('Unable to load questions :(');
  }
}

export default function* () {
  yield takeEvery(loadQuestionsRoutine.TRIGGER, loadQuestionsList);
}