import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    createQuestionnaireRoutine,
    editQuestionnaireRoutine,
    getQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    getAllQuestionnaireRoutine,
    getAllQuestionnaireByCompanyRoutine
} from '../../components/Questionnaire/routines';
import apiClient from 'helpers/apiClient';
import { IQuestionnaire } from "models/IQuestionnaire";
import { IGeneric } from 'models/IGeneric';

function* create(action) {

    const res: IGeneric<IQuestionnaire> = yield call(apiClient.post, `api/questionnaires`, action.payload);

    if (res.data.error) {
        yield put(createQuestionnaireRoutine.failure(res.data.error));
        return;
    }

    yield put(createQuestionnaireRoutine.success(res.data.data));
}

function* get(action) {

    const res: IGeneric<IQuestionnaire> = yield call(apiClient.get, `api/questionnaires/${action.payload.id}`);

    if (res.data.error) {
        yield put(getQuestionnaireRoutine.failure(res.data.error));
        return;
    }

    yield put(getQuestionnaireRoutine.success(res.data.data));
}

function* getAllByCompany(action) {

    const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get,
        `api/questionnaires/companies/${action.payload.companyId}`);

    if (res.data.error) {
        yield put(getAllQuestionnaireByCompanyRoutine.failure(res.data.error));
        return;
    }

    yield put(getAllQuestionnaireByCompanyRoutine.success(res.data.data));
}

function* getAll(action) {

    const res: IGeneric<IQuestionnaire[]> = yield call(apiClient.get, `api/questionnaires`);

    if (res.data.error) {
        yield put(getAllQuestionnaireRoutine.failure(res.data.error));
        return;
    }

    yield put(getAllQuestionnaireRoutine.success(res.data.data));
}

function* edit(action) {

    const res: IGeneric<IQuestionnaire> = yield call(apiClient.put, `api/questionnaires`, action.payload);

    if (res.data.error) {
        yield put(editQuestionnaireRoutine.failure(res.data.error));
        return;
    }

    yield put(editQuestionnaireRoutine.success(res.data.data));
}

function* remove(action) {

    const res: IGeneric<null> = yield call(apiClient.delete, `api/questionnaires${action.payload.id}`);

    if (res.data.error) {
        yield put(deleteQuestionnaireRoutine.failure(res.data.error));
        return;
    }

    yield put(deleteQuestionnaireRoutine.success());
}

export default function* questionnaireSagas() {
    yield all([
        yield takeEvery(createQuestionnaireRoutine.TRIGGER, create),
        yield takeEvery(getAllQuestionnaireRoutine.TRIGGER, getAll),
        yield takeEvery(getQuestionnaireRoutine.TRIGGER, get),
        yield takeEvery(getAllQuestionnaireByCompanyRoutine.TRIGGER, getAllByCompany),
        yield takeEvery(editQuestionnaireRoutine.TRIGGER, edit),
        yield takeEvery(deleteQuestionnaireRoutine.TRIGGER, remove)
    ]);
}
