import {all, call, put, takeEvery, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadOneQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    saveAndGetQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IGeneric} from "../../models/IGeneric";
import {loadQuestionnaireQuestionsRoutine, saveQuestionRoutine} from "../questions/routines";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {loadSavedSectionsByQuestionnaireRoutine, loadSectionsByQuestionnaireRoutine} from "../sections/routines";

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

function* saveAndPutNewQuestionnaire(action) {
    try {
        const res: IGeneric<IQuestionnaire> = yield call(apiClient.post, `/api/questionnaires`, action.payload);
        const payload = res.data.data;
        yield put(saveAndGetQuestionnaireRoutine.success(payload));
        yield put(saveQuestionRoutine.trigger({...defaultQuestion, questionnaireId: payload.id}));
    } catch (e) {
        console.log(e);
        yield put(saveAndGetQuestionnaireRoutine.failure());
        toastr.error("Failed saving form");
    }
}

function* addQuestionnaire(action) {
    try {
        const questionnaire: IQuestionnaire = action.payload;
        yield call(apiClient.post, `/api/questionnaires`, questionnaire);

        yield put(hideModalQuestionnaireRoutine.trigger());
        yield put(loadQuestionnairesRoutine.trigger());
        toastr.success("Added questionnaire");
    } catch (errorResponse) {
        yield put(addQuestionnaireRoutine.failure(errorResponse?.data?.error || 'No response'));
    }
}

function* updateQuestionnaire(action) {
    try {
        const questionnaire: IQuestionnaire = action.payload;
        yield call(apiClient.put, `/api/questionnaires`, questionnaire);

        yield put(hideModalQuestionnaireRoutine.trigger());
        yield put(loadQuestionnairesRoutine.trigger());
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
        yield put(loadSavedSectionsByQuestionnaireRoutine.trigger(action.payload));
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
        yield takeEvery(saveAndGetQuestionnaireRoutine.TRIGGER, saveAndPutNewQuestionnaire)
    ]);
}
