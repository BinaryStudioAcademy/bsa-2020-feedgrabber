import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {
    deleteQuestionRoutine,
    loadQuestionnaireQuestionsRoutine,
    loadQuestionsBySectionRoutine,
    loadQuestionsExceptRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine,
    setCurrentQuestionRoutine,
    updateQuestionRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {addExistingQToFormRoutine} from "../sections/routines";

export const parseQuestion = ({index, ...rawQuestion}) => ({
    ...rawQuestion,
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

function* getAllExcept(action) {
    try {
        const {questionnaireId, query} = action.payload;
        const store = yield select();
        const {page, size} = store.questions.pagination;

        const res = (yield call(apiClient.get,
            `/api/questions/except/${questionnaireId}?page=${page}&size=${size}&query=${query||''}`
                )).data.data;

        res.items = res.items.map(q => parseQuestion(q));

        yield put(loadQuestionsExceptRoutine.success(res));
    } catch (e) {
        yield put(loadQuestionsExceptRoutine.failure());
        toastr.error("Unable to load questions");
    }
}

function* addFromExisting(action) {
    try {
        const {questions, sectionId} = action.payload;

        yield call(apiClient.patch, `/api/questions`, {sectionId, questions: questions.map(q => q.id)});

        yield put(addExistingQToFormRoutine.success(action.payload));
    } catch (e) {
        yield put(addExistingQToFormRoutine.failure(e.data?.error));
        toastr.error("Questions wasn't added");
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
        const res = yield call(apiClient.get, `/api/questions/sections/${action.payload}`);

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
        yield takeEvery(loadQuestionsExceptRoutine.TRIGGER, getAllExcept),
        yield takeEvery(addExistingQToFormRoutine.TRIGGER, addFromExisting),
        yield takeEvery(updateQuestionRoutine.TRIGGER, updateQuestion),
        yield takeEvery(saveQuestionRoutine.TRIGGER, saveQuestion),
        yield takeEvery(loadQuestionsBySectionRoutine.TRIGGER, getBySectionId),
        yield takeEvery(deleteQuestionRoutine.TRIGGER, deleteQuestionById)
    ]);
}
