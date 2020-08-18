import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    addSelectedQuestionsRoutine, deleteFromQuestionnaireRoutine,
    loadQuestionByIdRoutine,
    loadQuestionnaireQuestionsRoutine,
    loadQuestionsRoutine,
    addNewQuestionToQuestionnaireRoutine,
    copyQuestionInQuestionnaireRoutine,
    saveQuestionToQuestionnaireRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import { toastr } from 'react-redux-toastr';
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";

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
        const { id, top, right } = action.payload;

        if (id === 'empty') {
            yield put(loadQuestionByIdRoutine.success(defaultQuestion));
            return;
        }

        const res: IGeneric<IQuestion> = yield call(apiClient.get, `/api/questions/${id}`);

        const question: IQuestion = parseQuestion(res.data.data);
        if (top && right) {
            question['top'] = top;
            question['right'] = right;
        }
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

function* saveOrUpdateQuestion(action) {
    try {
        const res: IGeneric<IQuestion> = action.payload?.id
            ? yield call(apiClient.put, `/api/questions`, action.payload)
            : yield call(apiClient.post, `/api/questions`, action.payload || {});
         yield put(saveQuestionToQuestionnaireRoutine.success(res.data.data));
     } catch (e) {
        yield put(saveQuestionToQuestionnaireRoutine.failure());
        toastr.error("Question wasn't saved");
    }
}

function* copyQuestionInQuestionnaire(action){
    try {
        const {qId, question} = action.payload;
        const res: IGeneric<IQuestion[]> = yield call(apiClient.post,
            `/api/questions/questionnaires/${qId}`, question);

        yield put(copyQuestionInQuestionnaireRoutine.success(res.data.data));

    } catch (e) {
        yield put(copyQuestionInQuestionnaireRoutine.failure());
        toastr.error("Question wasn't copied");
    }
}

function* addNewQuestionInQuestionnaire(action){
    try {
        const {qId} = action.payload;
        const res: IGeneric<IQuestion[]> = yield call(apiClient.post, `/api/questions/questionnaires/${qId}`);

        yield put(addNewQuestionToQuestionnaireRoutine.success(res.data.data));

    } catch (e) {
        yield put(addNewQuestionToQuestionnaireRoutine.failure());
        toastr.error("Question wasn't added");
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

function* deleteOneByQuestionnaireId(action) {
    try {
        const { id, qId } = action.payload;
        const res: IGeneric<IQuestion[]> = yield call(apiClient.delete, `/api/questions/questionnaires/${qId}`, id);

        yield put(deleteFromQuestionnaireRoutine.success(res.data.data));
    } catch (e) {
        yield put(deleteFromQuestionnaireRoutine.failure(e.data.error));
        toastr.error("Unable to delete question");
    }
}

export default function* questionSagas() {
    yield all([
        yield takeEvery(loadQuestionsRoutine.TRIGGER, getAll),
        yield takeEvery(saveQuestionToQuestionnaireRoutine.TRIGGER, saveOrUpdateQuestion),
        yield takeEvery(copyQuestionInQuestionnaireRoutine.TRIGGER, copyQuestionInQuestionnaire),
        yield takeEvery(addNewQuestionToQuestionnaireRoutine.TRIGGER, addNewQuestionInQuestionnaire),
        yield takeEvery(loadQuestionByIdRoutine.TRIGGER, getById),
        yield takeEvery(loadQuestionnaireQuestionsRoutine.TRIGGER, getByQuestionnaireId),
        yield takeEvery(addSelectedQuestionsRoutine.TRIGGER, addFromExisting),
        yield takeEvery(deleteFromQuestionnaireRoutine.TRIGGER, deleteOneByQuestionnaireId)
    ]);
}
