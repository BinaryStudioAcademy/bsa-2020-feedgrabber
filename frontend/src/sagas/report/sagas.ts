import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine,
    loadRespondentReportRoutine,
    loadRespondentReportsRoutine
} from "./routines";
import {IQuestionnaireReport, IRequestShort, QuestionDto} from "../../models/report/IReport";
import {IGeneric} from "../../models/IGeneric";
import apiClient from "../../helpers/apiClient";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "../../models/IAppState";
import {IAnswer, IAnswerBody} from "../../models/forms/Response/types";

function* loadReport(action) {
    try {
        const res: IGeneric<string> = yield call(apiClient.get, `/api/report/${action.payload}`);
        const report: IQuestionnaireReport = JSON.parse(res.data.data);

        report.questionnaire.questions.forEach(q => {
            q.details && (q.details = JSON.parse(q.details));
        });

        yield put(loadReportRoutine.success(report));
    } catch (e) {
        yield put(loadReportRoutine.failure());
        toastr.error("Unable to load report");
    }
}

function* loadReportsBaseInfo(action) {
    try {
        const res: IGeneric<IRequestShort> = yield call(apiClient.get,
            `/api/request?questionnaireId=${action.payload}`);
        yield put(loadQuestionnaireRequestsRoutine.success(res.data.data));
    } catch (e) {
        yield put(loadQuestionnaireRequestsRoutine.failure());
        toastr.error("Unable to load reports");
    }
}

const questionSelector = (state: IAppState) => state.questionnaireReports.currentFullReport.questionnaire.questions;

function* loadRespondentReports(action) {
    try {
        const res: IGeneric<any> = yield call(apiClient.get, `/api/response?responseId=${action.payload}`);
        const questions: QuestionDto[] = yield select(questionSelector);
        const answers: IAnswer<IAnswerBody>[] = JSON.parse(res.data.data.payload);

        const map = new Map<string, QuestionDto>(questions.map(q => [q.id, q]));

        const result: IQuestion[] = answers.map(a => (
            {answer: a.body, ...map.get(a.questionId), isReused: false, isRequired: false}));

        yield put(loadRespondentReportRoutine.success(result));
    } catch (error) {
        yield put(loadRespondentReportsRoutine.failure());
        toastr.error("Unable to load respondent reports");
    }
}

function* loadUsersReports(action) {
    try {
        const res = yield call(apiClient.get, `/api/response/users?requestId=${action.payload}`);
        yield put(loadRespondentReportsRoutine.success(res.data.data));
    } catch (err) {
        yield put(loadRespondentReportsRoutine.failure());
        toastr.error("Unable to load respondents reports");
    }
}

export default function* questionnaireReportSagas() {
    yield all([
        yield takeEvery(loadQuestionnaireRequestsRoutine.TRIGGER, loadReportsBaseInfo),
        yield takeEvery(loadReportRoutine.TRIGGER, loadReport),
        yield takeEvery(loadRespondentReportRoutine.TRIGGER, loadRespondentReports),
        yield takeEvery(loadRespondentReportsRoutine.TRIGGER, loadUsersReports)
    ]);
}
