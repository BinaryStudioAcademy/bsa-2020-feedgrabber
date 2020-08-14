import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    loadQuestionByIdRoutine, loadQuestionsRoutine,
    saveQuestionRoutine, loadQuestionnaireQuestionsRoutine, addSelectedQuestionsRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

function parseQuestion(rawQuestion) {
    return {
        ...rawQuestion,
        type: rawQuestion.type.toLowerCase(),
        details: JSON.parse(rawQuestion.details as string)
    };
}

function* getAll() {
  try {
    const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `/api/questions`);

    const questions = res.data.data.map(q => parseQuestion(q));

    yield put(loadQuestionsRoutine.success(questions));

  } catch (e) {
    yield put(loadQuestionsRoutine.failure());
    toastr.error("Unable to load questions");
  }
}

function* getById(action) {
  try {
    const id = action.payload;

    if (id === 'empty') {
      put(loadQuestionByIdRoutine.success(defaultQuestion));
      return;
    }

    const res: IGeneric<IQuestion> = yield call(apiClient.get, `/api/questions/${action.payload}`);

    const question = parseQuestion(res.data.data);

    yield put(loadQuestionByIdRoutine.success(question));

  } catch (e) {
    yield put(loadQuestionByIdRoutine.failure(e.data.error));
    toastr.error("Unable to load question");
  }
}

function* addFromExisting(action) {
    // payload: {questionnaireId; questions}}
    try {
        const res: IGeneric<IQuestion[]> = yield call(apiClient.patch, `/api/questions`, action.payload);

        const questions = res.data.data.map(q => parseQuestion(q));

        yield put(addSelectedQuestionsRoutine.success(questions));

    } catch (e) {
        yield put(addSelectedQuestionsRoutine.failure(e.data.error));
        toastr.error("Something went wrong, try again");
    }

}

function* save(action) {
  const question = action.payload;
  try {
    const res: IGeneric<IQuestion> = question.id
      ? yield call(apiClient.put, `/api/questions`, question)
      : yield call(apiClient.post, `/api/questions`, question);

    yield put(saveQuestionRoutine.success(res.data.data));

  } catch (e) {
    yield put(saveQuestionRoutine.failure(e.data.erorr));
    toastr.error("Question wasn't saved");
  }
}

function* getByQuestionnaireId(action) {
  try {
    const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `/api/questions/questionnaires/${action.payload}`);

    const questions = res.data.data.map(q => parseQuestion(q));

    yield put(loadQuestionnaireQuestionsRoutine.success(questions));

  } catch (e) {
    yield put(loadQuestionnaireQuestionsRoutine.failure(e.data.error));
    toastr.error("Unable to load questionnaire");
  }
}

export default function* questionSagas() {
  yield all([
    yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
    yield takeEvery(saveQuestionRoutine.TRIGGER, save),
    yield takeEvery(loadQuestionByIdRoutine.TRIGGER, getById),
    yield takeEvery(loadQuestionnaireQuestionsRoutine.TRIGGER, getByQuestionnaireId),
    yield takeEvery(addSelectedQuestionsRoutine.TRIGGER, addFromExisting)
  ]);
}
