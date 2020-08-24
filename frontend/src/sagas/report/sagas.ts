import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  loadQuestionnaireRequestsRoutine,
  loadReportRoutine,
  loadRespondentReportRoutine,
  loadRespondentReportsRoutine
} from "./routines";
import { IRequestShort, IRespondentReport, IRespondentReportPreview } from "../../models/report/IReport";
import {IGeneric} from "../../models/IGeneric";
import apiClient from "../../helpers/apiClient";
/* eslint-disable */
import {
  ICheckboxQuestion,
  IDateQuestion,
  IQuestion,
  IRadioQuestion,
  IScaleQuestion,
  ITextQuestion,
  QuestionType
} from "../../models/forms/Questions/IQuesion";

// const mockReport: IQuestionnaireReport = {
//     questionnaireTitle: "Awesome Questionnaire",
//     questions: [
//         // {
//         //   id: "00000",
//         //   title: "Multichoice question",
//         //   type: QuestionType.multichoice,
//         //   answers: 18,
//         //   data: {
//         //     options: [
//         //       {title: "First Option", amount: 8},
//         //       {title: "Second Option", amount: 16},
//         //       {title: "Third Option", amount: 3}
//         //     ]
//         //   }
//         // },
//         {
//             id: "11111",
//             title: "Radio question",
//             type: QuestionType.radio,
//             answers: 24,
//             data: {
//                 options: [{title: "First Option", amount: 8}, {title: "Other Option", amount: 16}]
//             }
//         },
//         {
//             id: "33333",
//             title: "Scale question",
//             type: QuestionType.scale,
//             answers: 26,
//             data: {
//                 options: [
//                     {title: "1", amount: 3},
//                     {title: "2", amount: 2},
//                     {title: "3", amount: 6},
//                     {title: "4", amount: 5},
//                     {title: "5", amount: 10}
//                 ]
//             }
//         },
//         {
//             id: "22222",
//             title: "Free Text question",
//             type: QuestionType.freeText,
//             answers: 3,
//             data: {
//                 values: [
//                     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
//                     "labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque.\n" +
//                     "Fames ac turpis egestas sed tempus urna. Arcu cursus euismod quis viverra nibh cras pulvinar " +
//                     "mattis. Magna etiam tempor orci eu lobortis. Amet cursus sit amet dictum sit amet justo donec.\n\n" +
//                     " Vitae sapien pellentesque habitant morbi tristique. In vitae turpis massa sed elementum tempus.\n " +
//                     "Ultricies lacus sed turpis tincidunt id. Volutpat consequat mauris nunc congue. Bibendum arcu" +
//                     " vitae elementum curabitur. Porttitor massa id neque aliquam vestibulum. Convallis convallis " +
//                     "tellus id interdum velit laoreet. Eu non diam phasellus vestibulum lorem sed risus.",
//
//                     "Orci eu lobortis elementum nibh tellus molestie nunc non. Vitae suscipit tellus mauris " +
//                     "a diam maecenas sed enim ut. Vestibulum lorem sed risus ultricies tristique nulla aliquet " +
//                     "enim tortor. Ipsum dolor sit amet consectetur adipiscing elit duis. Posuere urna nec " +
//                     "tincidunt praesent semper feugiat nibh. Egestas maecenas pharetra convallis " +
//                     "posuere morbi leo urna. Risus nec feugiat in fermentum. Elementum sagittis vitae et" +
//                     " leo duis ut diam quam. Laoreet suspendisse interdum consectetur libero. Ullamcorper " +
//                     "morbi tincidunt ornare massa. Eu feugiat pretium nibh ipsum consequat nisl.\n\n" +
//                     "Sed vulputate odio ut enim blandit volutpat maecenas. Rutrum tellus pellentesque eu" +
//                     " tincidunt tortor aliquam nulla. Interdum varius sit amet mattis vulputate enim.\n\n" +
//                     "Nam libero justo laoreet sit amet cursus sit amet.",
//
//                     "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
//                     "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
//                     "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
//                     "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
//                     "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
//                     "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
//                     "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam.\n" +
//                     "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
//                     "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
//                     "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
//                     "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
//                     "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
//                     "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
//                     "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam."
//                 ]
//             }
//         },
//         {
//             id: "55555",
//             title: "Checkbox question",
//             type: QuestionType.checkbox,
//             answers: 15,
//             data: {
//                 options: [{title: "English", amount: 8}, {title: "Ukrainian", amount: 13}]
//             }
//         },
//         {
//             id: "66666",
//             title: "Data selection question",
//             type: QuestionType.date,
//             answers: 59,
//             data: {
//                 options: [
//                     {title: '2001-07-10', amount: 40},
//                     {title: '2002-11-21', amount: 15},
//                     {title: '2005-06-06', amount: 1},
//                     {title: '1971-10-27', amount: 2},
//                     {title: '1980-04-2', amount: 1}
//                 ]
//             }
//         }
//     ]
// };

function* loadReport(action) {
    try {
        // here also check if JSON response.questions[].statistics is valid - serialize it
        const res: IGeneric<string> = yield call(apiClient.get, `/api/report/${action.payload}`);
        yield put(loadReportRoutine.success(JSON.parse(res.data.data)));
    } catch (e) {
        yield put(loadReportRoutine.failure());
        toastr.error("Unable to load report");
    }
}

function* loadReportsBaseInfo(action) {
    try {
        const res: IGeneric<IRequestShort> = yield call(apiClient.get, `/api/request?questionnaireId=${action.payload}`);
        yield put(loadQuestionnaireRequestsRoutine.success(res.data.data));
    } catch (e) {
        yield put(loadQuestionnaireRequestsRoutine.failure());
        toastr.error("Unable to load reports");
    }
}

function* loadRespondentReports(action: any) {
  try {
    const id: string = action.payload.respondent;
	  // action.payload has next structure: { request, respondent }
    // here will be API call
    // yield put(loadRespondentReportRoutine.success( some report ));
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
            answer: {
              selected: 'laptop',
              other: ''
            },
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
            answer: {
              selected: ['apple', 'bread'],
              other: ''
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: false, answerOptions: ['apple', 'bread', 'tomatoes', 'potatoes'] }
          } as ICheckboxQuestion,
          {
            id: '7',
            type: QuestionType.checkbox,
            name: 'Select what you want to eat:',
            answer: {
              selected: ['apple', 'bread'],
              other: 'pizza'
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: true, answerOptions: ['apple', 'bread', 'tomatoes', 'potatoes'] }
          } as ICheckboxQuestion,
          {
            id: '0',
            type: QuestionType.radio,
            name: 'some question?',
            answer: {
              selected: '',
              other: 'keyboard'
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: true, answerOptions: ['laptop', 'headphones', 'mouse'] }
          } as IRadioQuestion,
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
    yield put(loadRespondentReportRoutine.success(reportsMock[id]));
  } catch (error) {
    // yield put(loadRespondentReportsRoutine.failure());
    toastr.error("Unable to load respondent reports");
  }
}

function* loadUsersReports(action) {
  try {
    // const reports = yield call(apiClient.get, "", action.payload);
    // maybe I should to parse the data
    const reportsPreviewMock = Array<IRespondentReportPreview>({
      id: '1',
      firstName: 'pavlo',
      lastName: 'myroniuk',
      answeredAt: new Date().toLocaleString()
    } as IRespondentReportPreview,
    {
      id: '0',
      firstName: 'asan',
      lastName: 'leibyk',
      answeredAt: new Date().toLocaleString()
    }  as IRespondentReportPreview);
    yield put(loadRespondentReportsRoutine.success(reportsPreviewMock));
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
