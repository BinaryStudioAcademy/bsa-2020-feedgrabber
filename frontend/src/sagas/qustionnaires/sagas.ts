import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    loadArchivedQuestionnairesRoutine,
    hideModalQuestionnaireRoutine,
    loadOneQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    saveAndGetQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IGeneric} from "../../models/IGeneric";
import {loadFormRoutine} from "../sections/routines";
import {loadNotificationsRoutine} from "../notifications/routines";

function* loadQuestionnairesList() {
    try {
        const store = yield select();
        const {page, size} = store.questionnaires.list.pagination;
        const res = yield call(apiClient.get, `/api/questionnaires?page=${page}&size=${size}`);
        const items = res.data.data;

        yield put(loadQuestionnairesRoutine.success(items));
    } catch (error) {
        yield put(loadQuestionnairesRoutine.failure(error));
        toastr.error("Unable to fetch data");
    }
}

function* loadArchivedQuestionnaires() {
    try {
        const store = yield select();
        const {page, size} = store.questionnaires.archived.pagination;
        const res = yield call(apiClient.get, `/api/questionnaires?page=${page}&size=${size}&archived=true`);
        const items = res.data.data;

        yield put(loadArchivedQuestionnairesRoutine.success(items));
    } catch (error) {
        yield put(loadArchivedQuestionnairesRoutine.failure(error));
        toastr.error("Unable to fetch data");
    }
}

function* saveAndPutNewQuestionnaire(action) {
    try {
        const res: IGeneric<IQuestionnaire> = yield call(apiClient.post, `/api/questionnaires`, action.payload);
        const payload = res.data.data;
        yield put(saveAndGetQuestionnaireRoutine.success(payload));
    } catch (error) {
        yield put(saveAndGetQuestionnaireRoutine.failure());
        toastr.error(error.response?.data?.error || 'No response');
    }
}

function* addQuestionnaire(action) {
    try {
        const questionnaire: IQuestionnaire = action.payload;
        yield call(apiClient.post, `/api/questionnaires`, questionnaire);

        yield put(hideModalQuestionnaireRoutine.trigger());
        yield put(loadQuestionnairesRoutine.trigger());
        toastr.success("Added questionnaire");
    } catch (error) {
        yield put(addQuestionnaireRoutine.failure(error.response?.data?.error || 'No response'));
    }
}

function* updateQuestionnaire(action) {
    try {
        const questionnaire: IQuestionnaire = action.payload;
        yield call(apiClient.put, `/api/questionnaires`, questionnaire);

        yield put(hideModalQuestionnaireRoutine.trigger());
        yield put(loadQuestionnairesRoutine.trigger());
        yield put(loadArchivedQuestionnairesRoutine.trigger());
        toastr.success("Updated questionnaire");
    } catch (errorResponse) {
        yield put(updateQuestionnaireRoutine.failure(errorResponse?.data?.error || 'No response'));
    }
}

function* deleteQuestionnaire(action) {
    try {
        const id: string = action.payload;
        yield call(apiClient.delete, `/api/questionnaires/${id}`);

        yield put(deleteQuestionnaireRoutine.success());
        toastr.success("Deleted questionnaire");
        yield put(loadQuestionnairesRoutine.trigger());
        yield put(loadNotificationsRoutine.trigger());
    } catch (errorResponse) {
        yield put(deleteQuestionnaireRoutine.failure());
        toastr.error(errorResponse?.data?.error || 'No response');
        yield put(loadQuestionnairesRoutine.trigger());
    }
}

function* loadOneQuestionnaire(action) {
    try {
        const res = yield call(apiClient.get, `/api/questionnaires/${action.payload}`);
        yield put(loadOneQuestionnaireRoutine.success(res.data.data));
        yield put(loadFormRoutine.trigger(action.payload));
    } catch (error) {
        yield put(loadOneQuestionnaireRoutine.failure(error));
        toastr.error("Unable to fetch data");
    }
}

// function* loadRequestedQuestionnaires() {
//   try {
//     const result: IGeneric<IRequest[]> = yield call(apiClient.get, `/api/request/pending`);
//     result.data.data.forEach(req => req['expirationDate'] = req.expirationDate
//       ? new Date(req.expirationDate) : null);
//     yield put(loadRequestedQuestionnairesRoutine.success(result.data.data));
//   } catch (error) {
//     yield put(loadRequestedQuestionnairesRoutine.failure());
//     toastr.error("Couldn't load pending questionnaires");
//   }
// }

export default function* questionnairesSagas() {
    yield all([
        yield takeEvery(loadQuestionnairesRoutine.TRIGGER, loadQuestionnairesList),
        yield takeEvery(addQuestionnaireRoutine.TRIGGER, addQuestionnaire),
        yield takeEvery(deleteQuestionnaireRoutine.TRIGGER, deleteQuestionnaire),
        yield takeEvery(updateQuestionnaireRoutine.TRIGGER, updateQuestionnaire),
        yield takeEvery(loadOneQuestionnaireRoutine.TRIGGER, loadOneQuestionnaire),
        yield takeEvery(loadArchivedQuestionnairesRoutine.TRIGGER, loadArchivedQuestionnaires),
        yield takeEvery(saveAndGetQuestionnaireRoutine.TRIGGER, saveAndPutNewQuestionnaire)
    ]);
}
