import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    updateQuestionnaireRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IGeneric} from "../../models/IGeneric";

function* loadQuestionnairesList() {
    const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get, `api/questionnaires`);

    if (res.data.error) {
        yield put(loadQuestionnairesRoutine.failure());
        toastr.error(res.data.error);
        return;
    }
    yield put(loadQuestionnairesRoutine.success(res.data.data));
}

function* addQuestionnaire(action) {
    console.log(action);
    const res: IGeneric<IQuestionnaire> = yield call(apiClient.post, `api/questionnaires`, action.payload);
    if (res.data.error) {
        yield put(addQuestionnaireRoutine.failure());
        toastr.error(res.data.error);
        return;
    }
    yield put(hideModalQuestionnaireRoutine.trigger());
    yield put(loadQuestionnairesRoutine.trigger());
    toastr.success("Added questionnaire");
    yield put(addQuestionnaireRoutine.success(res.data.data));
}

function* updateQuestionnaire(action) {
    const res: IGeneric<IQuestionnaire> = yield call(apiClient.put, `api/questionnaires`, action.payload);
    if (res.data.error) {
        yield put(updateQuestionnaireRoutine.failure());
        toastr.error(res.data.error);
        return;
    }
    yield put(hideModalQuestionnaireRoutine.trigger());
    yield put(loadQuestionnairesRoutine.trigger());
    toastr.success("Updated questionnaire");
}

function* deleteQuestionnaire(action) {
    const res: IGeneric<null> = yield call(apiClient.delete, `api/questionnaires/${action.payload}`);
    if (res.data.error) {
        yield put(deleteQuestionnaireRoutine.failure());
        toastr.error(res.data.error);
        return;
    }
    yield put(deleteQuestionnaireRoutine.success());
    toastr.success("Deleted questionnaire");
    yield put(loadQuestionnairesRoutine.trigger());
}

export default function* questionnairesSagas() {
    yield all([
        yield takeEvery(loadQuestionnairesRoutine.TRIGGER, loadQuestionnairesList),
        yield takeEvery(addQuestionnaireRoutine.TRIGGER, addQuestionnaire),
        yield takeEvery(deleteQuestionnaireRoutine.TRIGGER, deleteQuestionnaire),
        yield takeEvery(updateQuestionnaireRoutine.TRIGGER, updateQuestionnaire)
    ]);
}
