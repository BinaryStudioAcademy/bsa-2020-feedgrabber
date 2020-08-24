import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  loadQuestionnaireRequestsRoutine,
  loadReportRoutine,
  loadRespondentReportRoutine,
  loadRespondentReportsRoutine
} from "./routines";
import { IRequestShort, IRespondentReport, IRespondentReportPreview } from "../../models/report/IReport";
import { IGeneric } from "../../models/IGeneric";
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
	const res = yield call(apiClient.get, `/api/response?responseId=${action.payload}`);
	const resData = JSON.parse(res.data.data.payload);
	let newData = [];
	for (const data of resData) {
		const questionData = yield call(apiClient.get, `/api/questions/${data.questionId}`);
		const parsed = { ...questionData.data.data, details: JSON.parse(questionData.data.data.details) };	
		newData.push({
			answer: data.body,
			...parsed
		} as IQuestion);
	}
	const finish = { answers: newData };
    yield put(loadRespondentReportRoutine.success(finish));
  } catch (error) {
    yield put(loadRespondentReportsRoutine.failure());
	console.log(error);
    toastr.error("Unable to load respondent reports");
  }
}

function* loadUsersReports(action) {
  try {
	const res = yield call(apiClient.get, `/api/response/users?requestId=${action.payload}`);
    yield put(loadRespondentReportsRoutine.success(res.data.data));
  } catch (err) {
    yield put(loadRespondentReportsRoutine.failure());
	console.log(err);
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
