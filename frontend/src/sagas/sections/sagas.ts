import apiClient from "../../helpers/apiClient";
import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addExistingQToFormRoutine,
    addQToFormRoutine,
    addSectionRoutine,
    deleteQInFormRoutine,
    loadFormRoutine,
    updateOrderInFormRoutine,
    updateQInFormRoutine,
    updateSectionRoutine
} from "./routines";

import {parseQuestion} from "sagas/questions/sagas";
import {fromPairs} from "lodash";

const parseQuestions = questions => questions.map(q => parseQuestion(q));

export const parseSectionWithQuestion = section => ({
    ...section,
    questions: parseQuestions(section.questions)
});

function* createSection(action) {
    try {
        const result = yield call(apiClient.post, `/api/section`, action.payload);
        yield put(addSectionRoutine.success(result.data.data));
    } catch (error) {
        toastr.error("Can't create section");
        yield put(addSectionRoutine.failure());
    }
}

function* loadForm(action) {
    try {
        const result = yield call(apiClient.get, `/api/questionnaires/${action.payload}/sections`);
        // eslint-disable-next-line prefer-const
        let {sections, ...rest} = result.data.data;
        sections = sections.map(s => parseSectionWithQuestion(s));

        let sectionsState = sections.map(s => (
            [s.id, {
                id: s.id,
                questions: s.questions.map(q => q.id),
                section: {title: s.title, description: s.description}
            }]
        ));

        sectionsState = {
            entities: fromPairs(sectionsState),
            ids: sectionsState.map(s => s[0]),
            currentId: sectionsState[0][0]
        };

        let questionsState = sections.flatMap(s => (
            s.questions.map(q => (
                [q.id, {
                    id: q.id,
                    section: s.id,
                    question: q
                }]))
        ));

        questionsState = {
            entities: fromPairs(questionsState),
            ids: questionsState.map(q => q[0]),
            currentId: ''
        };

        yield put(loadFormRoutine.success({
            questionnaire: rest,
            sections: sectionsState,
            questions: questionsState
        }));
    } catch (error) {
        yield put(loadFormRoutine.failure());
        toastr.error("Form wasn't loaded");
    }
}

function* addQuestionToSection(action) {
    try {
        const question = action.payload;
        const result = yield call(apiClient.put, `/api/section/question`, question);

        yield put(addQToFormRoutine.success({
            sectionId: question.sectionId,
            id: result.data.data.id,
            question: parseQuestion(result.data.data)
        }));
    } catch (error) {
        toastr.error("Failed adding question");
        yield put(addQToFormRoutine.failure());
    }
}

function* addExistingQuestionToSection(action) {
    try {
        const {sectionId, questionId: qId, index} = action.payload;
        const result = yield call(apiClient.put, `/api/section/add`,
            {questionIndexed: {questionId: qId, index}, sectionId}
        );

        const {second: questionId, first: questions} = result.data.data;

        yield put(addExistingQToFormRoutine.success({
            sectionId,
            questionId,
            questions: parseQuestions(questions)
        }));
    } catch (error) {
        yield put(addExistingQToFormRoutine.failure());
    }
}

function* updateQuestion(action) {
    try {
        const question = action.payload;
        const res = yield call(apiClient.put, `/api/questions`, question);

        yield put(updateQInFormRoutine.success({
            question: parseQuestion(res.data.data),
            id: question.id
        }));
    } catch (e) {
        toastr.error("Failed updating question");
        yield put(updateQInFormRoutine.failure());
    }
}

function* deleteQuestionFromSection(action) {
    try {
        const {sectionId, questionId} = action.payload;
        yield call(apiClient.delete, `/api/section/${sectionId}/${questionId}`);
    } catch (error) {
        toastr.error("Failed deleting question");
        yield put(deleteQInFormRoutine.failure());
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
        toastr.error("Question order wasn't saved");
    }
}

export default function* sectionSagas() {
    yield all([
        yield takeEvery(addSectionRoutine.TRIGGER, createSection),
        yield takeEvery(loadFormRoutine.TRIGGER, loadForm),
        yield takeEvery(addQToFormRoutine.TRIGGER, addQuestionToSection),
        yield takeEvery(deleteQInFormRoutine.TRIGGER, deleteQuestionFromSection),
        yield takeEvery(updateQInFormRoutine.TRIGGER, updateQuestion),
        yield takeEvery(updateSectionRoutine.TRIGGER, updateSection),
        yield takeEvery(updateOrderInFormRoutine.TRIGGER, updateOrder),
        yield takeEvery(addExistingQToFormRoutine.TRIGGER, addExistingQuestionToSection)
    ]);
}
