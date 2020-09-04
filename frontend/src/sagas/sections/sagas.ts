import apiClient from "../../helpers/apiClient";
import {call, takeEvery, all, put} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    createSectionRoutine,
    loadSectionsByQuestionnaireRoutine,
    addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine,
    updateSectionRoutine,
    updateQuestionsOrderRoutine,
    loadSavedSectionsByQuestionnaireRoutine
} from "./routines";

import {parseQuestion} from "sagas/questions/sagas";
import {IGeneric} from "../../models/IGeneric";
import {IAnswer, IAnswerBody} from "../../models/forms/Response/types";
import { setCurrentIdRoutine } from "sagas/qustionnaires/routines";
import {ISection} from "../../reducers/section/reducer";

function parseSectionWithQuestion(section) {
    const questions = section.questions.map(q => parseQuestion(q));
    return {
        ...section,
        questions
    };
}

export function updatedSections(sections, newSection) {
    return sections.map(section => section.id === newSection ? parseSectionWithQuestion(newSection) : section);
}

function* createSection(action) {
    try {
        const result = yield call(apiClient.post, `/api/section`, action.payload);
        yield put(createSectionRoutine.success(result.data.data));
        yield put(loadSectionsByQuestionnaireRoutine.trigger(action.payload.questionnaireId));
    } catch (error) {
        yield put(createSectionRoutine.failure());
    }
}

function* loadAllSectionsAndQuestionsByQuestionnaire(action) {
    try {
        const result = yield call(apiClient.get, `/api/section/questionnaire/${action.payload}`);
        const sections = result.data.data.map(section => parseSectionWithQuestion(section));
        yield put(loadSectionsByQuestionnaireRoutine.success(sections));
      yield put(setCurrentIdRoutine(action.payload));
    } catch (error) {
        yield put(loadSectionsByQuestionnaireRoutine.failure());
        toastr.error("Couldn`t load sections");
    }
}

function* addQuestionToSection(action) {
    try {
        const {sectionId, questionId, questionnaireId} = action.payload;
        const result = yield call(apiClient.put, `/api/section/question/${questionId}?sectionId=${sectionId}`);
        yield put(addQuestionToSectionRoutine.success(result.data.data));
        if (questionnaireId) {
            yield put(loadSectionsByQuestionnaireRoutine.trigger(questionnaireId));
        }
    } catch (error) {
        yield put(addQuestionToSectionRoutine.failure());
    }
}

function* deleteQuestionFromSection(action) {
    try {
        const  {sectionId, questionId } = action.payload;
        const result = yield call(
          apiClient.delete,
          `/api/section/question/${questionId}?sectionId=${sectionId}`);
        yield put(deleteQuestionFromSectionRoutine.success(result.data.data));
    } catch (error) {
        yield put(deleteQuestionFromSectionRoutine.failure());
    }
}

function* updateSection(action) {
    try {
        const result = yield call(apiClient.put, `/api/section/${action.payload.id}`, action.payload);
        yield put(updateSectionRoutine.success(result.data.data));
    } catch (error) {
        yield put(updateSectionRoutine.failure());
    }
}

function* updateOrder(action) {
    try {
        const result = yield call(apiClient.put, `/api/section/${action.payload.id}/order`, action.payload);
        yield put(updateQuestionsOrderRoutine.success(result.data.data));
    } catch (error) {
        yield put(updateQuestionsOrderRoutine.failure());
    }
}

function* loadSaved(action) {
    try {
        const {responseId, questionnaireId} = action.payload;
        const resSec: IGeneric<ISection[]> = yield call(apiClient.get, `/api/section/questionnaire/${questionnaireId}`);
        const sections = resSec.data.data.map(section => parseSectionWithQuestion(section));
        const res: IGeneric<any> = yield call(apiClient.get, `/api/response?responseId=${responseId}`);
        const answers: IAnswer<IAnswerBody>[] = JSON.parse(res.data.data.payload);

        sections.forEach(s => s.questions.filter(q => {
            if (answers.find(a => a.questionId === q.id)) {
                q['answer'] = answers.find(a => a.questionId === q.id).body;
                return q;
            } else {
                return false;
            }
        }));

        yield put(loadSavedSectionsByQuestionnaireRoutine.success(sections));

    } catch (e) {
        yield put(loadSavedSectionsByQuestionnaireRoutine.failure(e.data.error));
        toastr.error("Unable to load questionnaire");
    }
}

export default function* sectionSagas() {
    yield all([
        yield takeEvery(createSectionRoutine.TRIGGER, createSection),
        yield takeEvery(loadSectionsByQuestionnaireRoutine.TRIGGER, loadAllSectionsAndQuestionsByQuestionnaire),
        yield takeEvery(addQuestionToSectionRoutine.TRIGGER, addQuestionToSection),
        yield takeEvery(deleteQuestionFromSectionRoutine.TRIGGER, deleteQuestionFromSection),
        yield takeEvery(updateSectionRoutine.TRIGGER, updateSection),
        yield takeEvery(updateQuestionsOrderRoutine.TRIGGER, updateOrder),
        yield takeEvery(loadSavedSectionsByQuestionnaireRoutine.TRIGGER, loadSaved)
    ]);
}
