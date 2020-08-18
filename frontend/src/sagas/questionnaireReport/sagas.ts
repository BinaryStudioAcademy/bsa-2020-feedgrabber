import {all, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {loadQuestionnaireReportRoutine} from "./routines";
import {IQuestionnaireReport} from "../../models/report/IReport";
import {QuestionType} from "../../models/forms/Questions/IQuesion";

function* loadReport(action: any) {
  try {
    const id: string = action.payload;
    // here will be API call
    // here also check if JSON response.questions[].statistics is valid - serialize it
    const report: IQuestionnaireReport = {
      questionnaireTitle: "Awesome Questionnaire",
      questions: [
        {
          id: "11111",
          title: "Radio question",
          type: QuestionType.radio,
          answers: 24,
          data: {
            options: [{title: "First Option", amount: 8}, {title: "Other Option", amount: 16}]
          }
        }
      ]
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
