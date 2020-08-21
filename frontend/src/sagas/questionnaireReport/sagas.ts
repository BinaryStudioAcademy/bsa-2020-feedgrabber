import { all, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  loadQuestionnaireReportRoutine,
  loadRespondentReportsRoutine
} from "./routines";
import { IQuestionnaireReport, IRespondentReport } from "../../models/report/IReport";
import {
  IQuestion,
  IScaleQuestion,
  ICheckboxQuestion,
  IDateQuestion,
  QuestionType,
  IRadioQuestion,
  ITextQuestion
} from "../../models/forms/Questions/IQuesion";

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

function* loadRespondentReports(action: any) {
  try {
    // id of the questionnaire
    const id: string = action.payload;
    // here will be API call
    const reportsMock = Array<IRespondentReport>(
      {
        respondent: 'pasha',
        answers: Array<IQuestion>(
          {
            id: '1',
            type: QuestionType.scale,
            name: 'Rate your job:',
            answer: 3,
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion,
          {
            id: '2',
            type: QuestionType.date,
            name: 'Birthday?',
            answer: '2001-07-10',
            categoryTitle: 'qkation',
            isReused: false
          } as IDateQuestion,
          {
            id: '9',
            type: QuestionType.freeText,
            name: 'Enter your specialization:',
            answer: 'Java',
            categoryTitle: 'qkation',
            isReused: false
          } as ITextQuestion,
          {
            id: '3',
            type: QuestionType.radio,
            name: 'some question?',
            answer: 'laptop',
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: false, answerOptions: ['laptop', 'headphones', 'mouse'] }
          } as IRadioQuestion,
          {
            id: '4',
            type: QuestionType.scale,
            name: 'Some name2',
            answer: 6,
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion)
      } as IRespondentReport,
      {
        respondent: 'king of pacha land',
        answers: Array<IQuestion>(
          {
            id: '4',
            type: QuestionType.scale,
            name: 'Some name1',
            answer: 5,
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion,
          {
            id: '5',
            type: QuestionType.checkbox,
            name: 'Select what you want to eat:',
            answer: ['apple', 'bread'],
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: false, answerOptions: ['apple', 'bread', 'tomatoes', 'potatoes'] }
          } as ICheckboxQuestion,
          {
            id: '6',
            type: QuestionType.scale,
            name: 'Some name3',
            answer: 2,
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'madara', max: 8, maxDescription: 'hashirama' }
          } as IScaleQuestion)
      } as IRespondentReport
    );
    yield put(loadRespondentReportsRoutine.success(reportsMock));
  } catch (error) {
    // yield put(loadRespondentReportsRoutine.failure());
    toastr.error("Unable to load respondent reports");
  }
}

export default function* questionnaireReportSagas() {
  yield all([
    yield takeEvery(loadQuestionnaireReportRoutine.TRIGGER, loadReport),
    yield takeEvery(loadRespondentReportsRoutine.TRIGGER, loadRespondentReports)
  ]);
}
