import apiClient from "../../helpers/apiClient";
import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addExistingQuestionToSectionRoutine,
    addQuestionToSectionRoutine,
    createSectionRoutine,
    deleteQuestionFromSectionRoutine,
    loadSavedSectionsByQuestionnaireRoutine,
    loadSectionsByQuestionnaireRoutine, moveQuestionInSectionRoutine,
    updateQuestionInSectionRoutine,
    updateQuestionsOrderRoutine,
    updateSectionRoutine
} from "./routines";

import {parseQuestion} from "sagas/questions/sagas";
import {IGeneric} from "../../models/IGeneric";
import {IAnswer, IAnswerBody} from "../../models/forms/Response/types";
import {ISection} from "../../reducers/formEditor/reducer";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

function parseSectionWithQuestion(section) {
    const questions = section.questions.map(q => parseQuestion(q));
    return {
        ...section,
        questions
    };
}

function parseQuestions(questions: IQuestion[]) {
    return questions.map(q => parseQuestion(q));
}

function* createSection(action) {
    try {
        const result = yield call(apiClient.post, `/api/section`, action.payload);
        yield put(createSectionRoutine.success(result.data.data));
    } catch (error) {
        toastr.error("Can't create section");
        yield put(createSectionRoutine.failure());
    }
}

function* loadSections(action) {
    try {
        const result = yield call(apiClient.get, `/api/section/questionnaire/${action.payload}`);
        const sections = result.data.data.map(section => parseSectionWithQuestion(section));
        yield put(loadSectionsByQuestionnaireRoutine.success(sections));
    } catch (error) {
        yield put(loadSectionsByQuestionnaireRoutine.failure());
        toastr.error("Couldn`t load sections");
    }
}

function* addQuestionToSection(action) {
    try {
        const question: IQuestion = action.payload;
        console.log(action);
        const result = yield call(apiClient.put, `/api/section/question`, question);
        console.log(result);
        const {second: questionId, first: questions} = result.data.data;

        yield put(addQuestionToSectionRoutine.success({
            sectionId: question.sectionId,
            questionId,
            questions: parseQuestions(questions)
        }));
    } catch (error) {
        yield put(addQuestionToSectionRoutine.failure());
    }
}

function* addExistingQuestionToSection(action) {
    try {
        const {sectionId, questionId: qId, index} = action.payload;
        const result = yield call(apiClient.put, `/api/section/add`,
            {questionIndexed: {questionId: qId, index}, sectionId}
        );

        const {second: questionId, first: questions} = result.data.data;

        yield put(addExistingQuestionToSectionRoutine.success({
            sectionId,
            questionId,
            questions: parseQuestions(questions)
        }));
    } catch (error) {
        yield put(addExistingQuestionToSectionRoutine.failure());
    }
}

function* updateQuestion(action) {
    try {
        const question: IQuestion = action.payload;
        const res = yield call(apiClient.post, `/api/section/${question.sectionId}/question`, question);

        yield put(updateQuestionInSectionRoutine.success({
            sectionId: question.sectionId,
            questions: parseQuestions(res.data.data),
            questionId: question.id
        }));
    } catch (e) {
        yield put(updateQuestionInSectionRoutine.failure());
    }
}

function* deleteQuestionFromSection(action) {
    try {
        const {sectionId, questionId} = action.payload;
        const result = yield call(apiClient.delete, `/api/section/question/${questionId}?sectionId=${sectionId}`);
        yield put(deleteQuestionFromSectionRoutine.success({sectionId, questions: parseQuestions(result.data.data)}));
    } catch (error) {
        yield put(deleteQuestionFromSectionRoutine.failure());
    }
}

function* moveQuestionInsideQuestionnaire(action) {
    try {
        const {prevSectionId, sectionId, questionId: qId, index} = action.payload;
        const result = yield call(apiClient.put, `/api/section/move`,
            {questionIndexed: {questionId: qId, index}, sectionId, prevSectionId});
        const {second: questionId, first: questions} = result.data.data;
        yield put(moveQuestionInSectionRoutine.success({
            sectionId,
            questionId,
            questions: parseQuestions(questions)
        }));
    } catch (error) {
        yield put(moveQuestionInSectionRoutine.failure());
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
        yield call(apiClient.patch, `/api/section/question/reorder`, action.payload);
    } catch (error) {
        toastr.error("Question order wasn't saved, try again");
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
            const answer = answers.find(a => a.questionId === q.id);
            if (answer) {
                q.answer = answer.body;
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
        yield takeEvery(loadSectionsByQuestionnaireRoutine.TRIGGER, loadSections),
        yield takeEvery(addQuestionToSectionRoutine.TRIGGER, addQuestionToSection),
        yield takeEvery(deleteQuestionFromSectionRoutine.TRIGGER, deleteQuestionFromSection),
        yield takeEvery(updateQuestionInSectionRoutine.TRIGGER, updateQuestion),
        yield takeEvery(updateSectionRoutine.TRIGGER, updateSection),
        yield takeEvery(updateQuestionsOrderRoutine.TRIGGER, updateOrder),
        yield takeEvery(loadSavedSectionsByQuestionnaireRoutine.TRIGGER, loadSaved),
        yield takeEvery(addExistingQuestionToSectionRoutine.TRIGGER, addExistingQuestionToSection),
        yield takeEvery(moveQuestionInSectionRoutine.TRIGGER, moveQuestionInsideQuestionnaire)
    ]);
}
