import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from 'helpers/apiClient';
import {toastr} from 'react-redux-toastr';
import {loadRequestedQuestionnairesRoutine} from 'sagas/request/routines';
import {IAnswer, IAnswerBody} from "../../models/forms/Response/types";
import {parseSectionWithQuestion} from "../sections/sagas";
import {loadResponseFormRoutine, saveResponseRoutine} from "./routines";

function* saveResponse(action) {
    try {
        console.log(action);
        yield call(apiClient.put, `/api/response`, action.payload);
        yield put(saveResponseRoutine.success());
        yield put(loadRequestedQuestionnairesRoutine.trigger());
        toastr.success("Response saved");
    } catch (error) {
        yield put(saveResponseRoutine.failure());
        toastr.error("Response wasn't saved");
    }
}

function* loadResponse(action) {
    try {
        const responseId = action.payload;
        const res = yield call(apiClient.get, `/api/response/${responseId}`);
        const resSections = yield call(apiClient.get, `/api/section/questionnaire/${res.data.data.questionnaire.id}`);

        const sections = resSections.data.data.map(section => parseSectionWithQuestion(section));
        const answers: IAnswer<IAnswerBody>[] = JSON.parse(res.data.data.payload);

        answers && sections.forEach(s => s.questions.filter(q => {
            const answer = answers.find(a => a.questionId === q.id);
            if (answer) {
                q.answer = answer.body;
                return q;
            } else {
                return false;
            }
        }));

        yield put(loadResponseFormRoutine.success({info: res.data.data, sections}));

    } catch (e) {
        yield put(loadResponseFormRoutine.failure(e.data?.error));
        toastr.error("Unable to load questionnaire");
    }
}

export default function* responseSagas() {
    yield all([
        yield takeEvery(loadResponseFormRoutine.TRIGGER, loadResponse),
        yield takeEvery(saveResponseRoutine.TRIGGER, saveResponse)
    ]);
}
