import apiClient from "../../helpers/apiClient";
import {call, takeEvery, all, put} from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { addNewSectionRoutine,
     createSectionRoutine,
      getSectionsByQuestionnaireRoutine,
       addQuestionToSectionRoutine, 
       deleteQuestionFromSectionRoutine} from "./routines";
import { loadQuestionsBySectionRoutine } from "sagas/questions/routines";
import {parseQuestion} from "sagas/questions/sagas";

function parseSectionWithQuestion(section) {
    const questions = section.questions.map(q => parseQuestion(q));
    return {
        ...section,
        questions
    };
}

function* createSection(action) {
    try {
        const result = yield call(apiClient.post, `/api/section`, action.payload);
        yield put(createSectionRoutine.success(result.data.data));
        yield put(getSectionsByQuestionnaireRoutine.trigger(action.payload.questionnaireId));
    } catch (error) {
        yield put(createSectionRoutine.failure());
    }
}

function* getAllSectionsAndQuestionsByQuestionnaire(action) {
    try {
        const result = yield call(apiClient.get, `/api/section/questionnaire/${action.payload}`);
        const sections = result.data.data.map(section => parseSectionWithQuestion(section));
        yield put(getSectionsByQuestionnaireRoutine.success(sections));
    } catch (error) {
        yield put(getSectionsByQuestionnaireRoutine.failure());
        toastr.error("Couldn`t load sections");
    }
}

function* addQuestionToSection(action) {
    try {
        console.log("saga");
        console.log(action.payload);
        const {sectionId, questionId} = action.payload;
        yield call(apiClient.put, `/api/section/question/${questionId}?sectionId=${sectionId}`);
    } catch (error) {
        yield put(addQuestionToSectionRoutine.failure());
    }
}

function* deleteQuestionFromSection(action) {
    try {
        console.log("saga");
        console.log(action.payload);
        const {sectionId, questionId} = action.payload;
        yield call(apiClient.put, `/api/section/question/${questionId}?sectionId=${sectionId}`);
    } catch (error) {
        yield put(deleteQuestionFromSectionRoutine.failure());
    }
}

export default function* sectionSagas() {
    yield all([
        yield takeEvery(createSectionRoutine.TRIGGER, createSection),
        yield takeEvery(getSectionsByQuestionnaireRoutine.TRIGGER, getAllSectionsAndQuestionsByQuestionnaire),
        yield takeEvery(addQuestionToSectionRoutine.TRIGGER, addQuestionToSection),
        yield takeEvery(deleteQuestionFromSectionRoutine.TRIGGER, deleteQuestionFromSection)
    ]);
}