import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {
    addSelectedQuestionsRoutine,
    deleteQuestionRoutine,
    loadQuestionnaireQuestionsRoutine,
    loadQuestionsBySectionRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine, setCurrentQuestionRoutine,
    updateQuestionRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {IGeneric} from 'models/IGeneric';
import {toastr} from 'react-redux-toastr';
import {IQuestion} from "../../models/forms/Questions/IQuesion";

export const parseQuestion = rawQuestion => ({
    ...rawQuestion,
    type: rawQuestion.type,
    details: JSON.parse(rawQuestion.details) ?? {}
});

function* getAll() {
    try {
        const store = yield select();
        const {page, size} = store.questions.pagination;
        const res = (yield call(apiClient.get, `/api/questions?page=${page}&size=${size}`)).data.data;

        res.items = res.items.map(q => parseQuestion(q));

        yield put(loadQuestionsRoutine.success(res));
    } catch (e) {
        yield put(loadQuestionsRoutine.failure());
        toastr.error("Unable to load questions");
    }
}

function* addFromExisting(action) {
    // payload: {questionnaireId; questions, sectionId}}
    try {
        yield call(apiClient.patch, `/api/questions`, action.payload);

        yield put(addSelectedQuestionsRoutine.success());
        yield put(loadQuestionsBySectionRoutine.trigger(action.payload.sectionId));
    } catch (e) {
        yield put(addSelectedQuestionsRoutine.failure(e.data.error));
        toastr.error("Something went wrong, try again");
    }
}

function* updateQuestion(action) {
    try {
        const res = yield call(apiClient.put, `/api/questions`, action.payload);
        yield put(updateQuestionRoutine.success(parseQuestion(res.data.data)));
    } catch (e) {
        yield put(updateQuestionRoutine.failure());
        toastr.error("Question wasn't updated");
    }
}

function* deleteQuestionById(action) {
    try {
        yield call(apiClient.delete, `/api/questions/${action.payload}`);

        yield put(deleteQuestionRoutine.success(action.payload));
    } catch (e) {
        yield put(deleteQuestionRoutine.failure());
        toastr.error("Question wasn't updated");
    }
}

function* saveQuestion(action) {
    try {
        const res = yield call(apiClient.post, `/api/questions`, action.payload);

        const question = parseQuestion(res.data.data);
        yield put(saveQuestionRoutine.success(question));
        yield put(setCurrentQuestionRoutine.trigger(question));
    } catch (e) {
        yield put(saveQuestionRoutine.failure());
        toastr.error("Question wasn't saved");
    }
}

function* getBySectionId(action) {
    try {
        const res: IGeneric<IQuestion[]> = yield call(apiClient.get, `/api/questions/sections/${action.payload}`);

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
        yield takeEvery(addSelectedQuestionsRoutine.TRIGGER, addFromExisting),
        yield takeEvery(updateQuestionRoutine.TRIGGER, updateQuestion),
        yield takeEvery(saveQuestionRoutine.TRIGGER, saveQuestion),
        yield takeEvery(loadQuestionsBySectionRoutine.TRIGGER, getBySectionId),
        yield takeEvery(deleteQuestionRoutine.TRIGGER, deleteQuestionById)
    ]);
}
