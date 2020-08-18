import {all, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {loadQuestionnaireReportRoutine} from "./routines";
import {IQuestionnaireReport} from "../../models/report/IReport";

function* loadReport(action: any) {
  try {
    const id: string = action.payload;
    // here will be API call
    const report: IQuestionnaireReport = {
      questionnaireTitle: id,
      questions: []
    };
    yield put(loadQuestionnaireReportRoutine.success(report));
  } catch (e) {
    yield put(loadQuestionnaireReportRoutine.failure());
    toastr.error("Unable to load questionnaire report");
  }
}

export default function* questionnaireReportSagas() {
  yield all([
    yield takeEvery(loadQuestionnaireReportRoutine.TRIGGER, loadReport)
  ]);
}
